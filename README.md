# NgRx Entity Schematic

An Angular schematic for quickly scaffolding NgRx Entities with actions, effects, reducer, model, service, and passing specs.

- [How to use](#how-to-use)
- [What it generates](#generated)
- [Local development](#development)
- [Schematic project architecture](#architecture)

## How to Use <a name="how-to-use"></a>

### Install the necessary NgRx Entity libraries in your project

    yarn add @ngrx/{effects,entity,router-store,store,store-devtools} ngrx-store-freeze

### Running the schematic

    ng add @briebug/ngrx-entity-schematic ENTITY --path src/app/state

This will add the schematic as a project dependency, create all the default `ENTITY` files and write them at the `--path` specified

#### Entity name

The `ENTITY` name provided should either be camel case or dasherized (`customerOrder` || `customer-order`)

### Generate default Entity files

    ng add @briebug/ngrx-entity-schematic ENTITY

### Generate Entity files at a specific relative path

    ng add @briebug/ngrx-entity-schematic ENTITY --path PATH/TO/WRITE

### Generate Entity files with NgRx setup files

    ng add @briebug/ngrx-entity-schematic ENTITY --init --path PATH/TO/WRITE

- `ENTITY`, `--path`, and `--init` flags can be used together.
- `ENTITY` is **required** as the first argument after the schematic name

## What it generates <a name="generated"></a>

This schematic accepts an entity name and scaffolds all the necessary files for utilizing the NgRx Entity Library. For example, if you run the schematic for the entity `customer`, you'll end up with the following:

    ng add @briebug/ngrx-entity-schematic customer --path app/state

```text
app/
├── state/
│   └── customer
│       ├── customer.actions.ts
│       ├── customer.effects.spec.ts
│       ├── customer.effects.ts
│       ├── customer.model.ts
│       ├── customer.reducer.spec.ts
│       ├── customer.reducer.ts
│       ├── customer.service.ts
│       ├── index.ts
```

the `--init` option provides 4 additional files

    ng add @briebug/ngrx-entity-schematic customer --init --path app/state

```text
app/
├── state/
│   └── customer
│       ├── customer.actions.ts
│       ├── customer.effects.spec.ts
│       ├── customer.effects.ts
│       ├── customer.model.ts
│       ├── customer.reducer.spec.ts
│       ├── customer.reducer.ts
│       ├── customer.service.ts
│       ├── index.ts
│   ├── app.interfaces.ts          *
│   ├── app.reducer.ts             *
│   ├── state-utils.ts             *
│   ├── state.module.ts            *
```

Continuing the example of `customer`, the following are included:

| action | effect | reducer |
| ------ | ------ | ------- |
| `InsertCustomer` | ✅ | ✅ |
| `InsertCustomerSuccess` |  | ✅ |
| `InsertCustomerFail` | | ✅ |
| `SearchAllCustomerEntities` | ✅ |  ✅ |
| `SearchAllCustomerEntitiesSuccess` | | ✅ |
| `SearchAllCustomerEntitiesFail` |  | ✅ |
| `LoadCustomerById` | ✅ | ✅ |
| `LoadCustomerByIdSuccess` | | ✅ |
| `LoadCustomerByIdFail` |  | ✅ |
| `UpdateCustomer` | ✅ | ✅ |
| `UpdateCustomerSuccess` |  | ✅ |
| `UpdateCustomerFail` |  | ✅ |
| `DeleteCustomerById` | ✅ | ✅ |
| `DeleteCustomerByIdSuccess` |  | ✅ |
| `DeleteCustomerByIdFail` |  | ✅ |
| `SetSearchQuery` | ✅ | ✅ |
| `SelectCustomerById` | ✅ | ✅ |

### Other files:

- `index.ts` exports all the selectors.
- `customer.service.ts` is a provider for your entities - you will need to modify this service to make CRUD calls for your entity. Be aware that the effects expect the methods in this file.
- `customer.model.ts` - you can safely replace this but the generated spec files uses exported methods to generate mocks.

*Be sure to audit the files and tailor them to your project*

## Local Development

### Link the schematic to the `sandbox-app`

This will create a symlink in your global packages so that when this schematic package is requested in the sandbox-app, it executes this local directory.

Effectively executing the `./src/ngrx-entity/index.ts` every time the schematic is run inside the `./sandbox-app`.

    yarn link:schematic

### Run schematic locally

The most robust way to test schematic changes against the sandbox-app is to reset the sandbox to its version-controlled state, build the schematic code, and execute the schematic against the sandbox-app. Make changes and repeat.

    yarn clean:build:launch

You can pass optionally pass arguments to this command

    yarn clean:build:launch customerOrders --init --path src/app/state

There are more specific commands that allow for individually running the above workflow. Those scripts can be found in the `./package.json`.

## Schematic Project Architecture <a name="architecture"></a>

### ./src

This is the schematic code that's executed when running `ng add @briebug/ngrx-entity-schematic`.

### ./sandbox-app

This is an application that's used for testing the schematic locally during development. This provides E2E like feedback.
