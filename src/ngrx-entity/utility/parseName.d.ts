/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * source: https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/parse-name.ts
 */
import { Path } from '@angular-devkit/core';
export interface Location {
    name: string;
    path: Path;
}
export declare function parseName(path: string, name: string): Location;
export declare const camelize: (word: string, splitBy?: string) => string;
