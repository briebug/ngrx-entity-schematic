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

    const path = options.path ? options.path : './src/app/state';
    
    context.logger.debug(`adding NgRX files to ${path} dir`);

    const parsedPath = parseName(path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url('./__files__'), [
      tree.exists(`${parsedPath.path}/app.interfaces.ts`) ? filter(path => !path.endsWith('app.interfaces.ts')) : noop(),
      tree.exists(`${parsedPath.path}/app.reducer.ts`) ? filter(path => !path.endsWith('app.reducer.ts')) : noop(),
      tree.exists(`${parsedPath.path}/state-utils.ts`) ? filter(path => !path.endsWith('state-utils.ts')) : noop(),
      tree.exists(`${parsedPath.path}/state.module.ts`) ? filter(path => !path.endsWith('state.module.ts')) : noop(),
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
