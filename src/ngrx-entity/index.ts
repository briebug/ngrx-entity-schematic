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
    const path = './src/app/state'; // read path from where uses runs schematic?
    const entityName = 'TEST';
    context.logger.debug(`adding NgRX files to ${path} dir`);

    const parsedPath = parseName(path, entityName);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url('./__files__'), [
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
