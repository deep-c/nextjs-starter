## Getting Started

Ensure docker is running on your system, create a .env.local file from the env.local.example and then:

```bash
yarn install #Yarn must be used for now
npm run db:migrate:dev

npm run dev
# OR
Run Launch configuration via vscode below
```

NOTE: Ensure NODE_ENV is appropriately set when using dev and start npm commands

Attach to debugger:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch App",
      "skipFiles": ["<node_internals>/**"],
      "port": 9229,
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run-script", "dev"],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug Tests",
      "request": "launch",
      "runtimeArgs": [
        "run-script",
        "test:debug"
      ],
      "runtimeExecutable": "npm",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "node",
      "console": "integratedTerminal"
    },
    {
      "name": "Attach App",
      "port": 9229,
      "request": "attach",
      "skipFiles": ["<node_internals>/**"],
      "type": "node"
    }
  ]
}
```

Technologies Used:

- Next.js
- Apollo Client
- HeadlessUI React Tailwind Components
- NextAuth.js
- Prisma
- GraphQL
- Nexus
- Nexus Prisma
- React Hook Form
- Tailwindcss
- Typescript
- Jest
- React Testing Library
- Prettier
- ESLint
- TestCafe

Recommendations:

- If using VSCode which I highly recommend, use the Apollo GraphQL extension. https://www.apollographql.com/docs/devtools/editor-plugins/

## Possible problems and solutions

**My GraphQl schema is not updating when using the development playground / typescript (nexus) is complaining that types are incompatible.**

Ensure that there are no typescript error's in other files. What looks to happen here is the updated typegen information doesnt get flushed if there are typescript errors detected in the application and thus dynamic type information for the GraphQL schema and nexus is not updated.

**Typescript is throwing a lot of type errors after I have just cloned the project or after running an npm script**

A number of libraries (prisma/nexus/apollo) used produce typings dynamically at compile time. As a result you may need to run multiple scripts in parallel or before running certain npm scripts from package json to have the appropriate types generated. See `npm run build:types`

**Running `build:apollo` results in an error**

Ensure that you are using yarn for dependency management so we can use a single version of the graphql dependency through use of the resolutions field which is yarn specific. Furthermore ensure that you do not change the path for nexus schema generation output as `apollo client:codegen` has been configured to use the current output paths. See https://github.com/apollographql/apollo-tooling/issues/1296

**Types are still missing when running the app in dev mode**

If you installed packages via another shell and had the dev server still running generated types for Prisma will get nuked. You will need to rerun the dev server after adding or removing packages.

**VSCode Apollo GraphQL extension for Apollo client types in `src/graphql/[query|mutation]` is throwing a type error after updating the graphql nexus types**

It seems the extension doesnt automatically reload the type definitions if the files change. To reload a schema, open the Command Palette (cmd + shift + p on mac), search "Apollo" and choose the "Apollo: Reload Schema" option.
