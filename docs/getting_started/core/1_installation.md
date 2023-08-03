# Installation

### For the Ubuntu 20.04 and later
Start by opening your terminal to create a new folder for the project, then run the command:
```
# amd64
curl -sLO https://github.com/getdozer/dozer/releases/latest/download/dozer-linux-amd64.deb && sudo dpkg -i dozer-linux-amd64.deb

# aarch
curl -sLO https://github.com/getdozer/dozer/releases/latest/download/dozer-linux-aarch64.deb && sudo dpkg -i dozer-linux-aarch64.deb
```

### For the MacOS Monterey 12 and later

Type the following commands in terminal:

```
brew tap getdozer/dozer
brew install dozer
```

### For the Windows users and other platforms

Before installing from source, ensure that you have Rust and Protocol Buffers installed. Don't forget to add Protocol Buffers to your system's path variable. This will ensure a smooth installation process for Dozer. 

Type the followig command:

`cargo install --git https://github.com/getdozer/dozer dozer-cli --locked`

## ✅ Check Dozer version

In Linux, you can check the Dozer version and installation by running:

`dozer --version`

