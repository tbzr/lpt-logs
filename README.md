# lpt-logs
Logs library for LPT APIs

## Installation

```bash
npm install --save tbzr/lpt-logs
```

## Usage

```javascript

var logs = require('lpt-logs');

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

Name          | Type    | Default | Description
--------------|---------|---------|---------------
debug         | Boolean | false   | Debug mode
level         | Number  | DEBUG   | 
prefix        | String  | lpt_    | Log file prefix
extension     | String  | .log    | Log file extension
filename      | String  | -       | Force log filename, by default today date YYYYMMDD
encoding      | String  | utf8    | Force log file encoding
stdout        | Boolean | true    | Log event into standard output stream
stderr        | Boolean | false   | Log event into standard error stream
wfile         | Boolean | true            | Log file into a file
nl            | Boolean | true        | Append a new line character after each event
pattern       | String  | [%l][%d] %e | Log patterns
pattern_token | String  | %           | Log flag pattern
path          | String  | /var/log    | 
mode          | Number  | 0o666       |
	mode: 0o666,

## Public Methods

Method       | Parameters       | Description
-------------|------------------|-------------
emergency    | message, context | Write log in emergency state
alert        | message, context | Write log in alert state
critical     | message, context | Write log in critical state
error        | message, context | Write log in error state
warning      | message, context | Write log in warning state
notice       | message, context | Write log in notice state
info         | message, context | Write log in info state
debug        | message, context | Write log in debug state
stdout       | sw               | Write the following logs into standard output stream or set _stdout option if `sw` is defined
stderr       | sw               | Write the following logs into standard error stream or set _stderr option if `sw` is defined
getFile      | -                | Provide current log file
getPath      | -                | Provide current log directory
getFilename  | -                | Provide current log filename
getExtension | -                | Provide current log file extension
getPrefix    | -                | Provide current log file prefix
