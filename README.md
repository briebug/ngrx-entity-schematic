# NgRx Entity Generator

## How to Use

### Run schematic

Generate Entity files

```shell
ng g @briebug/ngrx-entity-schematic:ngrx-entity-schematic ENTITY_NAME
```

Generate Entity files at a specific relative path

```shell
ng g @briebug/ngrx-entity-schematic:ngrx-entity-schematic ENTITY_NAME --path RELATIVE/PATH
```

Generate Entity files with NgRx setup files

```shell
ng g @briebug/ngrx-entity-schematic:ngrx-entity-schematic ENTITY_NAME --init
```

- `ENTITY_NAME`, `--path`, and `--init` flags can be used together.
- `ENTITY_NAME` is **required** as the first argument after the schematic name

## Development

### Link the schematic to the `sandbox-app`

```shell
yarn link:schematic
```

### Run schematic locally

You can run or re-run schematic against `sandbox-app` and pass options

```shell
yarn launch ENTITY_NAME --init
```

Reset the `sandbox-app` to it's version controlled state, then execute the schematic locally against the `sandbox-app`.

```shell
yarn clean:launch
```

Compile the schematic code if changes have been made to `./src/*`

```shell
yarn build:schematic
```

### Copy `schematic-src` files into schematic template files

Read the blueprint app, `/schematic-src`, and copy all the necessary files into the schematic folder, `/src/__files__`. During the copy, replace all "entity" placeholders with their respective template placeholder. Run this if changes to the `schematic-src` app have been made.

```shell
yarn build:run:fileBuilder
```

#### Entity string mapping

| Entity | Template variable | Before | After |
| ------ | ----------------- |--|--|
|Briebug|`<%= classify(name) %>` |`class InsertBriebug`|`class Insert<%= classify(name) %>` |
|briebug|`<%= name %>` |`import {} from './briebug.model'`|`import {} from './<%= name %>.model'`|

#### About

This schematic uses a template project that acts as the working blueprint for what the schematic will eventually generate. This pattern was chosen to provide a faster and easier development cycle when testing the blueprint app as a standalone application providing the typical dev feedback by the Angular  CLI and other devtools. The alternative would involve developing against the template files (which include template variables like `<%= classify(name) %>`) and having to run the schematic locally on every change.

### Developing the `buildFiles` script

This script copies and modifies the blueprint Entity files into the schematic `__files__` directory. The following commands allow for quick dev feedback and debugging.

Compile the `buildFiles` script into `/tmp` in one shell

```shell
build:fileBuilder
```

In another shell, run the following script which will watch the `/tmp` dir for changes. Allows for attaching a debugger on port `9222`. See the attached `.vscode/launch.json` file for debugging with VSCode. Run the `Attach Schematic` debugger.

```shell
run:fileBuilder
```

Once both of these are run, changes to `./buildFiles.ts` should recompile and trigger an update to nodemon. Then trigger the VSCode debugger `f5` and that will land a breakpoint on line:1 of the app. Step over that to get to your breakpoint.

## Architecture

### ./src

This is the schematic code that's executed when running `ng g @briebug/ngrx-entity-schematic:ngrx-entity-schematic`.

### ./schematic-src

This is the blueprint app used for generating the schematic, specifically the template files in `./src/ngrx-entity/__files__`. This is a working application that defines the final form of the schematic.

### ./sandbox-app

This is an application that's used for testing the schematic locally during development.