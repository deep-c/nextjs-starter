## Getting Started

First create a .env.local file from the env.local.example and then:
#NOTE: Ensure NODE_ENV is appropriately set when using dev and start npm commands

```bash
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
