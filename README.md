# lpt-logs
Logs library for LPT APIs

## Installation

```bash
npm install --save tbzr/lpt-logs
```

## Usage

```javascript

var Logs = require('lpt-logs');

var logger = new Logs({
	// cf: Library options
});

logger.info('User {username} has logged in.', { username: 'tbzr' });

```

## Constants
Name      | Value
----------|-------
DEBUG     | 1
INFO      | 2
NOTICE    | 3
WARNING   | 4
ERROR     | 5
CRITICAL  | 6
ALERT     | 7
EMERGENCY | 8


## Library Options

Name      | Type    | Default | Description
----------|---------|---------|---------------
level     | Number  | DEBUG   | 
prefix    | String  | lpt_    | Log file prefix
extension | String  | .log    | Log file extension
filename  | String  | -       | Force log filename, by default today date YYYYMMDD
encoding  | String  | utf8    | Force log file encoding
stdout    | Boolean | true    | Log event into standard output stream
stderr    | Boolean | false   | Log event into standard error stream
wfile     | Boolean | true    | Log file into a file
nl        | Boolean | true    | Append a new line character after each event

## Public Methods

Method    | Description
----------|-------------
emergency | -
alert     | -
critical  | -
error     | -
warning   | -
notice    | -
info      | -
debug     | -