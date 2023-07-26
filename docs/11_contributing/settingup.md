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

#### Installing protoc with a package manager

You can install protoc with your package manager or by using pre-built binaries. On Debian and Ubuntu based distros run

```sh
sudo apt install protobuf protobuf-compiler
```

to install protobuf-compiler which provides the `protoc` command.

Similarly for Fedora, run

```sh
sudo dnf install protobuf protobuf-compiler
```

and for Arch based distros,

```sh
sudo pacman -S protobuf protobuf-compiler
```

**Note: If you encounter a File not found error, it's probably due to the absence of libprotobuf-dev,
the package is named libprotobuf-dev on Ubuntu and protobuf-devel in Fedora.**

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
