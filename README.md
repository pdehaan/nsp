# Node Security Project 
**Command Line Tools**

## Badgers
[![Dependency Status](https://david-dm.org/nodesecurity/nsp.png)](https://david-dm.org/nodesecurity/nsp)

![](https://nodesecurity.io/img/nodesecurity.png)


## Installation

Through npm:
```bash
npm i nsp -g
```

Through GitHub:
```bash
git clone git@github.com:nodesecurity/nsp.git
cd nsp
npm link
```


## `nsp audit-shrinkwrap`
Takes an existing npm-shrinkwrap.json file and submits it for validation to [nodesecurity.io](https://nodesecurity.io/)

**Example:**

```bash
$ nsp audit-shrinkwrap
Name     Installed  Patched  Vulnerable Dependency
connect    2.7.5    >=2.8.1  nodesecurity-jobs > kue > express
```

## `nsp audit-package`
Takes an existing package.json file and submits it for validation to [nodesecurity.io](https://nodesecurity.io/)

**Example:**

```bash
$ nsp audit-package
Name     Installed  Patched  Vulnerable Dependency
connect    2.7.5    >=2.8.1  nodesecurity-jobs > kue > express
```
