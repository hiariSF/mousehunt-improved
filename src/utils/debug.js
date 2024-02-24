import { getFlag } from './flags';
import { getSetting } from './settings';

/**
 * Helper function to log a debug message.
 *
 * @param {string} message Message to log.
 * @param {any}    args    Additional arguments to log.
 */
const debug = (message, ...args) => {
  if (getFlag('debug')) {
    // eslint-disable-next-line no-console
    console.log(
      `%cMH Improved%c: ${message}`,
      'color: #90588c; font-weight: 900',
      'color: inherit; font-weight: inherit',
      ...args
    );
  }
};

/**
 * Helper function to log a debug message.
 *
 * @param {any} args Additional arguments to log.
 */
const debugplain = (...args) => {
  if (getFlag('debug')) {
    console.log(...args); // eslint-disable-line no-console
  }
};

/**
 * Helper function to log a debug message.
 *
 * @param {string} module  Module name.
 * @param {string} message Message to log.
 * @param {any}    args    Additional arguments to log.
 */
const debuglog = (module, message, ...args) => {
  if (getFlag('debug')) {
    // eslint-disable-next-line no-console
    console.log(
      `%cMH Improved %c${module}%c ${message}`,
      'color: #90588c; font-weight: 900',
      'color: #90588c; font-weight: 400',
      'color: inherit; font-weight: inherit',
      ...args
    );
  }
};

/**
 * Helper function to log a debug message.
 *
 * @param {string} message Message to log.
 * @param {any}    args    Additional arguments to log.
 */
const debuglite = (message, ...args) => {
  if (getFlag('debug')) {
    // eslint-disable-next-line no-console
    console.log(
      `%c   MH Improved%c: ${message}`,
      'color: #90588c',
      'color: inherit',
      ...args
    );
  }
};

export {
  debug,
  debuglog,
  debuglite,
  debugplain
};
