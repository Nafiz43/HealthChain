# Setup Python 3.10

1. Ensure you have Python3.10, otherwise download it and set it up as default.

```bash
    python3 --version
```

# Setup ResilientDB

1. Clone the repository of ResilientDB

```bash
    git clone https://github.com/resilientdb/resilientdb.git
```

2. Then navigate inside the ResilientDB repo

```bash
    cd resilientdb
```

3. Install dependencies:
```
    sh INSTALL.sh
```

4. Run ResilientDB KV Service (this may take a few minutes for the first time): 

```bash
    ./service/tools/kv/server_tools/start_kv_service.sh
```

# Setup Crow HTTP server, SDK, and GraphQL server

1. You will need to clone the ResilientDB GraphQL repo to get started: 

```bash
    git clone https://github.com/ResilientApp/ResilientDB-GraphQL.git

```

2. Then navigate inside the ResilientDBGraphQL directory: 

```bash
    cd ResilientDB-GraphQL
```

3. Install the Crow dependencies: 

```bash
    sudo apt update sudo apt install build-essential sudo apt install python3.10-dev sudo apt install apt-transport-https curl gnupg
```

4. Build Crow HTTP server (this may take a few minutes for the first time): 

```bash
    bazel build service/http_server:crow_service_main
```

5. Start the Crow HTTP server: 

```bash
    bazel-bin/service/http_server/crow_service_main service/tools/config/interface/client.config service/http_server/server_config.config
```

6. Start the GraphQL server

```bash
    python3 app.py
```

# Running the App

## Prerequisites
- Ensure you have Node.js and npm installed
- Verify previous setup steps for ResilientDB, Crow HTTP server, and GraphQL server are completed

## Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install bootstrap:
```bash
npm install bootstrap
```

3. Start the frontend server:
```bash
npm start
```

## Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Start the backend server:
```bash
npm run dev
```

## Crow HTTP Server
Before running the entire application, ensure the Crow HTTP server is running:

1. Navigate to the ResilientDB-GraphQL directory:
```bash
cd ResilientDB-GraphQL
```

2. Start the Crow HTTP server:
```bash
bazel-bin/service/http_server/crow_service_main service/tools/config/interface/client.config service/http_server/server_config.config
```

## Troubleshooting
- If you encounter issues, refer to the tutorial: [ResilientDB Blog Post](https://blog.resilientdb.com/2023/09/21/ResVault.html)
- For further assistance, contact:
  - Nafiz Imtiaz Khan (nikhan@ucdavis.edu)

## Notes
- Ensure all servers (Crow HTTP, Frontend, Backend) are running simultaneously
- Check network configurations and firewall settings if connection issues arise
