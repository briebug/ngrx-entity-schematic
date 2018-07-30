// If we need to nest files in the package, see Kevin Schuchard's commit -
// 5af3e6a8ca21d982d3279341727c7044d504cba9 - for an older recursive folder
// crawling implementation.

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
  name: `<%= name %>`,
};
const newEntityFolder = `${RootPath}/${names.file}@if-flat__`;

(function init(...args) {
  const options = args[0];

  if (options.length) {
    console.log('Options', options);
  }

  // clean up previous changes
  removeSync(LocalRootFolder);

  // copy schematic entity src files from demo project
  copySync('schematic-src/src/app/state/briebug', LocalRootFolder);

  // map file data, Klaw scans recursively
  const relativeFilePaths: Array<string> = klawSync(LocalRootFolder).map((res) => {
    // get everything after ${LocalRootFolder}
    // res.path = .../ngrx-entity-generator/__files__/briebug/briebug.actions.ts
    const relativePath = res.path.split(LocalRootFolder).slice(-1)[0]; // /briebug/briebug.actions.ts

    return relativePath;
  });

  relativeFilePaths.forEach((relativePath: string) => {
    console.log(`modifying path: ${relativePath}`);

    // Should be last internal file modification, will loose reference in file to 'Entity' after this
    replaceEntityWithTemplateVariable(
      relativePath,
      readFileSync(`${RootPath}/${relativePath}`, 'utf8')
    );

    // create __files__/${EntityName} folder
    ensureDirSync(newEntityFolder);

    renameEntityFiles(relativePath, names.file);
  });
})(process.argv.slice(2));

function replaceEntityWithTemplateVariable(relativePath: string, file: string) {
  if (!file) {
    return console.log('Error reading file');
  }

  // replace "briebug" placeholders with template string format (<%= ENTITY &>) for the schematic to use

  const newFile = file
    .replace(/Briebug/g, names.class) // `<%= classify(name) %>`
    .replace(/briebug/g, names.name); // `<%= name %>`

  return writeFileSync(`${RootPath}/${relativePath}`, newFile);
}

function renameEntityFiles(relativePath: string, name: string) {
  const schemaPlaceholderString = `${name}@if-flat__`;
  const newPathAndName = `/${schemaPlaceholderString}${
    relativePath
      .replace(new RegExp('briebug', 'i'), schemaPlaceholderString)
  }`;

  return renameSync(
    `${RootPath}${relativePath}`,
    `${RootPath}${newPathAndName}`
  );
}
