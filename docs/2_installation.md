---
hide_table_of_contents: true
---
# Installation

## Ubuntu (20.04) and above

```bash
# amd64
curl -sLO https://github.com/getdozer/dozer/releases/latest/download/dozer-linux-amd64.deb && sudo dpkg -i dozer-linux-amd64.deb

# aarch
curl -sLO https://github.com/getdozer/dozer/releases/latest/download/dozer-linux-aarch64.deb && sudo dpkg -i dozer-linux-aarch64.deb
```
Dozer requires `protobuf-compiler`, installation instructions can be found in [additional steps](/docs/installation/#additional-steps-for-protobuf-compiler-dependency)


## MacOS Monterey (12) and above

```bash
brew tap getdozer/dozer
brew install dozer
```

## Build from Source (Windows and Other Platforms)

For other platforms, you can build from source.

> Important: Before installing from source, ensure that you have [Rust](https://www.rust-lang.org/tools/install) and [Protocol Buffers](https://protobuf.dev/downloads/) installed. Don't forget to add Protocol Buffers to your system's path variable. This will ensure a smooth installation process for Dozer.

```bash
cargo install --git https://github.com/getdozer/dozer dozer-cli --locked
```

### Additional steps for protobuf-compiler dependency
By default, Ubuntu `20.04` uses protobuf-compiler version `3.6.1.3`, which is insufficient for dozer. To install the newer version you can use the commands below.

```bash
# amd64
curl -sLO https://github.com/protocolbuffers/protobuf/releases/download/v22.2/protoc-22.2-linux-x86_64.zip
unzip protoc-22.2-linux-x86_64.zip -d $HOME/.local
export PATH="$PATH:$HOME/.local/bin"

# aarch
curl -sLO https://github.com/protocolbuffers/protobuf/releases/download/v22.2/protoc-22.2-linux-aarch_64.zip
unzip protoc-22.2-linux-aarch_64.zip -d $HOME/.local
export PATH="$PATH:$HOME/.local/bin"
```
