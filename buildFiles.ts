import {
  removeSync,
  ensureDirSync,
  writeFileSync,
  copySync,
  renameSync,
  readFileSync,
} from 'fs-extra';
import * as klawSync from 'klaw-sync';

const LocalRootFolder = 'src/ngrx-entity/__files__';
const RootPath = `${process.cwd()}/${LocalRootFolder}`;
const names = {
  file: `__name@dasherize`,
  class: `<%= classify(name) %>`,
  name: `<%= name %>`
};
const newEntityFolder = `${RootPath}/${names.file}@if-flat__`;

interface SourceNodes {
  fullPath: string;
  relativePath: string;
  isFolder: boolean;
  renameValue: string;
}

(function init(...args) {
  const options = args[0];

  if (options.length) {
    console.log('Options', options);
  }

  // clean up previous changes
  removeSync(LocalRootFolder);

  // copy schematic entity src files from demo project
  copySync('schematic-src/src/app/state', LocalRootFolder);

  // map file data, Klaw scans recursively
  const nodes: Array<SourceNodes> = klawSync(LocalRootFolder).map((res) => {
    // get everything after ${LocalRootFolder}
    // res.path = .../ngrx-entity-generator/__files__/entity/entity.actions.ts
    const relativePath = res.path.split(LocalRootFolder).slice(-1)[0]; // /entity/entity.actions.ts
    const filenameParts = relativePath.split('/');
    const renameValue = (filenameParts.length > 2 && filenameParts[1]) || '';

    return {
      fullPath: res.path,
      relativePath,
      isFolder: !relativePath.endsWith('.ts'),
      renameValue,
    };
  });

  // prettyPrint(fileNodes);

  nodes.forEach((node: SourceNodes) => {
    if (!node.isFolder) {
      console.log(`modifying path: ${node.relativePath}`);

      replaceEntityPaths(node, readFileSync(`${RootPath}/${node.relativePath}`, 'utf8'));

      // Should be last internal file modification, will loose reference in file to 'Entity' after this
      replaceEntityWithTemplateVariable(
        node,
        readFileSync(`${RootPath}/${node.relativePath}`, 'utf8')
      );

      // create __files__/${EntityName} folder
      ensureDirSync(newEntityFolder);

      renameEntityFiles(node, names.file);
    }
  });

  nodes.filter((node) => node.isFolder).forEach((node) => removeFolder(node));
})(process.argv.slice(2));

function replaceEntityPaths(node: SourceNodes, file: string) {
  if (!file) {
    return console.log('Error reading file');
  }

  const newFile = file
    .replace(/entity.actions/g, `${names.name}.actions`)
    .replace(/entity.effects/g, `${names.name}.effects`)
    .replace(/entity.model/g, `${names.name}.model`)
    .replace(/entity.reducer/g, `${names.name}.reducer`);

  return writeFileSync(`${RootPath}/${node.relativePath}`, newFile);
}

// replace "entity" placeholders with template string format (<%= ENTITY &>) for the schematic to use
function replaceEntityWithTemplateVariable(node: SourceNodes, file: string) {
  if (!file) {
    return console.log('Error reading file');
  }

  const newFile = file.replace(/Entity/g, names.class);

  return writeFileSync(`${RootPath}/${node.relativePath}`, newFile);
}

function renameEntityFiles(node: SourceNodes, name: string) {
  if (node.renameValue) {
    const newName = node.relativePath
      .replace(new RegExp(`${node.renameValue}`, 'i'), `${name}@if-flat__`)
      .replace(new RegExp(`${node.renameValue}`, 'i'), name);

    return renameSync(`${RootPath}${node.relativePath}`, `${RootPath}${newName}`);
  }
}

function removeFolder(node: SourceNodes) {
  return node.relativePath && removeSync(`${RootPath}${node.relativePath}`);
}

function prettyPrint(thing: any) {
  return console.log(JSON.stringify(thing, null, 4));
}
