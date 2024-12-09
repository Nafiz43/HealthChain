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

# Running the app
Step 1:
Ensure you have nodejs installed in your system

Step 2:
Install npm-bootstrap by the following command:
`npm install bootstrap`

For running the front-end server:
run the following command while being inside the `frontend` directory:
`npm start`

For running the backend server:
run the following command while being inside the `backend` directory:
`npm run dev`

You need to make sure that the CrowHTTP server is working. For doing that run the following while being inside `ResilientDB-GraphQL` directory:
`bazel-bin/service/http_server/crow_service_main service/tools/config/interface/client.config service/http_server/server_config.config`

Use the following tutorial to setup resilientDb and CrowHTTP Server: https://blog.resilientdb.com/2023/09/21/ResVault.html

Shoot an email to the following email address, if you face any issues:
Nafiz Imtiaz Khan  - nikhan@ucdavis.edu
