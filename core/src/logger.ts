import pino from "pino";

import { Loggable } from "./Loggable";

export const logger = pino({
  prettyPrint: {
    translateTime: true,
    ignore: "pid,hostname"
  }
});

export const logWithDuration = (loggable: Loggable, fn: Function) => {
  _logWithDuration(loggable, false, fn);
};

export const logWithDurationAndThrow = (loggable: Loggable, fn: Function) => {
  _logWithDuration(loggable, true, fn);
};

const _logWithDuration = (
  loggable: Loggable,
  rethrow: boolean,
  fn: Function
) => {
  const start = new Date().getTime();
  const component = `${loggable.type} '${loggable.name}'`;
  const message = `Executing ${component}...`;

  logger.info(message);

  try {
    fn();
  } catch (e) {
    if (rethrow) {
      throw e;
    } else {
      logger.error(e);
    }
  }

  logger.info(`${component} - Done! (${new Date().getTime() - start}ms)`);
};
