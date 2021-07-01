## Getting Started

First create a .env.local file from the env.local.example and then:

```bash
docker compose up -d
npm run dev
```

Attach to debugger:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "port": 9229
    }
  ]
}
```
