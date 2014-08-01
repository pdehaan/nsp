# Node Security Project 
**Command Line Tools**

## Badgers
[![Dependency Status](https://david-dm.org/nodesecurity/nsp.png)](https://david-dm.org/nodesecurity/nsp)

![](https://nodesecurity.io/img/nodesecurity.png)


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


## ```nsp audit-shrinkwrap```
Takes an existing npm-shrinkwrap.json file and submits it for validation to nodesecurity.io

Example:

```bash
~/nodesecurity/jobsystem $ nsp audit-shrinkwrap
Name     Installed  Patched  Vulnerable Dependency
connect    2.7.5    >=2.8.1  nodesecurity-jobs > kue > express
```

## ```nsp audit-package```
Takes an existing package.json file and submits it for validation to nodesecurity.io

Example:

```bash
~/nodesecurity/jobsystem $ nsp audit-package
Name     Installed  Patched  Vulnerable Dependency
connect    2.7.5    >=2.8.1  nodesecurity-jobs > kue > express
```
