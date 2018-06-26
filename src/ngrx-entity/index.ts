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

export default function(options: NgRxOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([addNgRxFiles()])(tree, context);
  };
}

function addNgRxFiles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dir = './'; // read path from where uses runs schematic?
    context.logger.debug(`adding NgRX files to ${dir} dir`);

    const templateSource = apply(url('./__files__'), [
      template({
        // ...strings,
        // 'if-flat': (s: string) => options.flat ? '' : s,
        // ...options,
      }),
      move(dir),
    ]);

    return templateSource(context);
  };
}
