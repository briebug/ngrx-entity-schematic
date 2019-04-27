import { experimental, JsonAstObject } from "@angular-devkit/core";
import { Tree, SchematicContext } from "@angular-devkit/schematics";
import { DeleteNodeDependency } from "./dependencies";
export interface NodePackage {
    name: string;
    version: string;
}
export declare enum Paths {
    AngularJson = "./angular.json"
}
export declare enum Configs {
    JsonIndentLevel = 4
}
export declare type WorkspaceSchema = experimental.workspace.WorkspaceSchema;
export interface JestOptions {
    updateTests?: boolean;
    project?: string;
    config?: "file" | "packagejson" | string;
    overwrite?: boolean;
    __version__: number;
}
export declare function getAngularVersion(tree: Tree): number;
export declare function getWorkspacePath(host: Tree): string;
export declare function getWorkspace(host: Tree): WorkspaceSchema;
export declare function getSourcePath(tree: Tree, options: any): String;
export declare function removePackageJsonDependency(tree: Tree, dependency: DeleteNodeDependency): void;
export declare function safeFileDelete(tree: Tree, path: string): boolean;
export declare function addPropertyToPackageJson(tree: Tree, context: SchematicContext, propertyName: string, propertyValue: {
    [key: string]: string;
}): void;
export declare function getWorkspaceConfig(tree: Tree, options: JestOptions): {
    projectProps: any;
    workspacePath: string;
    workspace: experimental.workspace.WorkspaceSchema;
    projectName: any;
};
/**
 * Angular5 (angular-cli.json) config is formatted into an array of applications vs Angular6's (angular.json) object mapping
 * multi-app Angular5 apps are currently not supported.
 *
 * @param tree
 * @param options
 */
export declare function isMultiAppV5(tree: Tree, options: JestOptions): boolean;
/**
 * Attempt to retrieve the latest package version from NPM
 * Return an optional "latest" version in case of error
 * @param packageName
 */
export declare function getLatestNodeVersion(packageName: string): Promise<NodePackage>;
export declare function parseJsonAtPath(tree: Tree, path: string): JsonAstObject;
export interface NgRxOptions {
    name: string;
    path?: string;
    init?: boolean;
    flat?: boolean;
}
