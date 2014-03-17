# Node Security Project 
**Command Line Tools**

## Badgers
[![Dependency Status](https://david-dm.org/nodesecurity/nsp.png)](https://david-dm.org/nodesecurity/nsp)

## Installation
```
npm i nsp -g
```

## ```nsp shrinkwrap```
Takes an existing npm-shrinkwrap.json file and submits it for validation to nodesecurity.io

Example:

```
~/Documents/nodesecurity/jobsystem (master)$ nsp shrinkwrap
Name     Installed  Patched  Vulnerable Dependency
connect    2.7.5    >=2.8.1  nodesecurity-jobs > kue > express
```
