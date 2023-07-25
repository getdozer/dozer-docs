---
sidebar_position: 2
---

# Setting up local environment

Dozer is fully built on Rust. You can install the following dependencies to set up locally.

#### Build Dependencies

- [`Rust`](https://rustup.rs)
- [`protoc`](https://github.com/protocolbuffers/protobuf/releases) latest release on your `PATH`
- `sqlite3` (`sudo apt install libsqlite3-dev` on Ubuntu)
- `openssl` (brew install pkg-config openssl on MacOS)
- `libprotobuf-dev` (sudo apt install libprotobuf-dev on Ubuntu. Package is named protobuf-devel in Fedora)

_Note: If you run across a file not found protoc error while building, that's probably due to the absence of libprotobuf-dev_.

### Running locally

```bash
# Help
cargo run --bin dozer -- -h

# Running dozer
cargo run --bin dozer
```

Build

```bash
cargo build --release dozer
```

You can also run `app` and `api` servers separately. We will be updating our docs with a full deployment guide. Stay tuned.
