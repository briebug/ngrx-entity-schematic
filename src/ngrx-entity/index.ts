import { strings } from "@angular-devkit/core";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  url,
  apply,
  move,
  template,
  filter,
  noop,
  SchematicsException,
  mergeWith
} from "@angular-devkit/schematics";
import {
  NgRxOptions,
  removePackageJsonDependency,
  getLatestNodeVersion,
  NodePackage
} from "./utility/util";
import { parseName } from "./utility/parseName";
import { of, Observable, concat } from "rxjs";
import { map, concatMap } from "rxjs/operators";
import {
  NodeDependencyType,
  addPackageJsonDependency
} from "./utility/dependencies";

export default function(options: NgRxOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([addNgRxFiles(options), updateDependencies()])(tree, context);
  };
}

function updateDependencies(): Rule {
  return (tree: Tree, context: SchematicContext): Observable<Tree> => {
    context.logger.debug("Updating dependencies...");
    context.addTask(new NodePackageInstallTask());

    const addDependencies = of(
      "@ngrx/store",
      "@ngrx/entity",
      "@ngrx/effects",
      "@ngrx/router-store"
    ).pipe(
      concatMap((packageName: string) => getLatestNodeVersion(packageName)),
      map((packageFromRegistry: NodePackage) => {
        const { name, version } = packageFromRegistry;
        context.logger.debug(
          `Adding ${name}:${version} to ${NodeDependencyType.Default}`
        );

        addPackageJsonDependency(tree, {
          type: NodeDependencyType.Default,
          name,
          version
        });

        return tree;
      })
    );

    const addDevDependencies = of(
      "@ngrx/store-devtools",
      "ngrx-store-freeze",
      "jasmine-marbles"
    ).pipe(
      concatMap((packageName: string) => getLatestNodeVersion(packageName)),
      map((packageFromRegistry: NodePackage) => {
        const { name, version } = packageFromRegistry;
        context.logger.debug(
          `Adding ${name}:${version} to ${NodeDependencyType.Dev}`
        );

        addPackageJsonDependency(tree, {
          type: NodeDependencyType.Dev,
          name,
          version
        });

        return tree;
      })
    );

    return concat(addDependencies, addDevDependencies);
  };
}

function addNgRxFiles(options: NgRxOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException("Entity name is required");
    }

    if (!options.path) {
      // todo: determine default based on current working dir
      options.path = `./src/app/state`;
      console.log(`No Entity path specified, adding files to ${options.path}`);
    }

    context.logger.debug(`adding NgRX files to ${options.path} dir`);

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url("./__files__"), [
      options.init && !tree.exists(`${parsedPath.path}/app.interfaces.ts`)
        ? noop()
        : filter(path => !path.endsWith("app.interfaces.ts")),
      options.init && !tree.exists(`${parsedPath.path}/app.reducer.ts`)
        ? noop()
        : filter(path => !path.endsWith("app.reducer.ts")),
      options.init && !tree.exists(`${parsedPath.path}/state-utils.ts`)
        ? noop()
        : filter(path => !path.endsWith("state-utils.ts")),
      options.init && !tree.exists(`${parsedPath.path}/state.module.ts`)
        ? noop()
        : filter(path => !path.endsWith("state.module.ts")),
      template({
        ...strings,
        "if-flat": (s: string) => (options.flat ? "" : s),
        ...options
      }),
      move(options.path)
    ]);

    return chain([mergeWith(templateSource)])(
      tree,
      context
    );
  };
}
