# NgRx Entity Generator

## Usage

## Development

### Link the schematic to the `sandbox-app`

```shell
yarn link:schematic
```

### Run schematic locally

Compile the schematic code

```shell
yarn build:schematic
```

Reset the `sandbox-app` to it's version controlled state, then execute the schematic locally against the `sandbox-app`.

```shell
yarn clean:launch
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

This schematic uses a template project that's the working blueprint for what the schematic will eventually generate. This pattern was chosen to provide a faster and easier development cycle when testing the template app as a standalone application with the typical dev feedback provided by the Angular CLI. The alternative would involve developing against the template files (which include template variable like `<%= classify(name) %>`) and having to run the schematic locally on every change.

### Developing the `buildFiles` script

When editing the script that copies and modifies the blueprint files into the schematic directory. The following commands all for quick dev feedback and debugging.

Compile the `buildFiles` script into `/tmp` in one shell

```shell
build:fileBuilder
```

In another shell, run the script and watch the `/tmp` dir for changes. Allows for attaching a debugger on port `9222`. See the attached `.vscode/launch.json` file for debugging with VSCode.

```shell
run:fileBuilder
```

Once both of these are run, changes to `./buildFiles.ts` should recompile and trigger an update to nodemon. Then trigger the VSCode debugger `f5` and that will land a breakpoint on line:1 of the app. Step over that to get to your breakpoint.

## Architecture

### ./src

This is the schematic code that's executed when running `ng g @briebug/ngrx-entity-schematic`.

### ./schematic-src

This the blueprint used for generating the schematic, specifically in template files in `./src/ngrx-entity/__files__`. This is a working application that defines the final form of the schematic.

### ./sandbox-app

This is an application that's used for testing the schematic locally for development.