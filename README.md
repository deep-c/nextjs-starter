## Getting Started

First create a .env.local file from the env.local.example and then:
#NOTE: Ensure NODE_ENV is appropriately set when using dev and start npm commands

```bash
yarn install #Yarn must be used for now
docker compose up -d
npm run db:makemigration

npm run dev
# OR
Run Launch configuration via vscode below
```

Attach to debugger:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch",
      "skipFiles": ["<node_internals>/**"],
      "port": 9229,
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run-script", "dev"],
      "console": "integratedTerminal"
    },
    {
      "name": "Attach",
      "port": 9229,
      "request": "attach",
      "skipFiles": ["<node_internals>/**"],
      "type": "node"
    }
  ]
}

```

## Possible problems and solutions

**My GraphQl schema is not updating when using the development playground / typescript (nexus) is complaining that types are incompatible.**

Ensure that there are no typescript error's in other files. What looks to happen here is the updated typegen information doesnt get flushed if there are typescript errors detected in the application and thus dynamic type information for the GraphQL schema and typescript is not updated.

**Typescript is throwing a lot of type errors after I have just cloned the project or after running an npm script**

A number of libraries (prisma/nexus/apollo) used produce typings dynamically at compile time. As a result you may need to run multiple scripts in parallel or before running certain npm scripts from package json to have the appropriate types generated. See `npm run build:types`

**Running `build:apollo` results in an error**

Ensure that you are using yark for dependency management so we can use a single version of the graphql dependency through use of the resolutions field which is yarn specific. Furthermore ensure that you do not change the path for nexus schema generation output as `apollo client:codegen` has been configured to use the current output paths
