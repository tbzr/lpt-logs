'use strict';

const EMERGENCY = 8;
const ALERT     = 7;
const CRITICAL  = 6;
const ERROR     = 5;
const WARNING   = 4;
const NOTICE    = 3;
const INFO      = 2;
const DEBUG     = 1;

module.exports = {
	DEBUG:     DEBUG,
	INFO:      INFO,
	NOTICE:    NOTICE,
	WARNING:   WARNING,
	ERROR:     ERROR,
	CRITICAL:  CRITICAL,
	ALERT:     ALERT,
	EMERGENCY: EMERGENCY
};