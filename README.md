# Node Security Project 
## Command Line Tools

## Installation

Through NPM
```bash
npm i nsp -g
```

Through github
```bash
git clone git@github.com:nodesecurity/nsp.git
cd nsp
npm link
```

## ```nsp shrinkwrap```
Takes an existing npm-shrinkwrap.json file and submits it for validation to nodesecurity.io

Example:

```bash
~/nodesecurity/jobsystem $ nsp shrinkwrap
Name     Installed  Patched  Vulnerable Dependency
connect    2.7.5    >=2.8.1  nodesecurity-jobs > kue > express
```
