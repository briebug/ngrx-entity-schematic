import { strings } from '@angular-devkit/core';
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
} from '@angular-devkit/schematics';
import { NgRxOptions } from './utility/util';
import { parseName } from './utility/parseName';

export default function(options: NgRxOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([addNgRxFiles(options)])(tree, context);
  };
}

function addNgRxFiles(options: NgRxOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException('Entity name is required');
    }

    if (!options.path) {
      const path = `./src/app/state`;
      console.log(`No Entity path specified, adding files to ${path}`);
      options.path = path;
    }

    context.logger.debug(`adding NgRX files to ${options.path} dir`);

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url('./__files__'), [
      options.init && !tree.exists(`${parsedPath.path}/app.interfaces.ts`) ? noop() : filter(path => !path.endsWith('app.interfaces.ts')) ,
      options.init && !tree.exists(`${parsedPath.path}/app.reducer.ts`) ? noop() : filter(path => !path.endsWith('app.reducer.ts')) ,
      options.init && !tree.exists(`${parsedPath.path}/state-utils.ts`) ? noop() : filter(path => !path.endsWith('state-utils.ts')) ,
      options.init && !tree.exists(`${parsedPath.path}/state.module.ts`) ? noop() : filter(path => !path.endsWith('state.module.ts')) ,
      template({
        ...strings,
        'if-flat': (s: string) => (options.flat ? '' : s),
        ...options,
      }),
      move(options.path),
    ]);

    return templateSource(context);
  };
}
