FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive 

# Install dependencies
RUN apt-get update && apt-get install -y \
    software-properties-common \
    git \
    curl \
    python3-pip

# Install Bazelisk
RUN curl -Lo /usr/local/bin/bazel https://github.com/bazelbuild/bazelisk/releases/latest/download/bazelisk-linux-amd64 \
    && chmod +x /usr/local/bin/bazel

# Install Python 3.10
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y python3.10 python3.10-venv python3.10-distutils python3.10-dev

RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

# Set up virtual environment
RUN python3.10 --version
RUN python3.10 -m venv venv
ENV PATH="/app/venv/bin:$PATH" 

# Install pip packages
RUN python3.10 -m pip install --upgrade pip
RUN python3.10 -m pip install wheel strawberry-graphql flask_cors 

# Set the working directory
WORKDIR /app

# Copy your project files to the container
#COPY ./resilientdb-graphql /app

RUN git clone https://github.com/apache/incubator-resilientdb-graphql /app

RUN chmod +x ./entrypoint.sh
RUN python3.10 -m pip install -r requirements.txt
RUN sh service/tools/start_kv_service_sdk.sh
# Expose port
EXPOSE 18000  

RUN bazel build --jobs 4 service/http_server/crow_service_main

ENTRYPOINT ["./entrypoint.sh"]
