/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * source: https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/parse-name.ts
 */
// import { relative, Path } from "../../../angular_devkit/core/src/virtual-fs";
import { Path, basename, dirname, normalize } from '@angular-devkit/core';

export interface Location {
  name: string;
  path: Path;
}

export function parseName(path: string, name: string): Location {
  const nameWithoutPath = basename(name as Path);
  const namePath = dirname((path + '/' + name) as Path);

  return {
    // entity name input expects camelCase or dasherized name (customerOrder || customer-order)
    name: camelize(nameWithoutPath, '-'),
    path: normalize('/' + namePath),
  };
}

export const camelize = (word: string, splitBy: string = '-') => {
  const parts = word.split(splitBy);

  return !parts.length
    ? word
    : parts[0] +
        parts
          .slice(1)
          .map((part) => part[0].toUpperCase() + part.slice(1))
          .join('');
};
