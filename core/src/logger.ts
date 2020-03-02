import pino from "pino";

export const logger = pino({
  prettyPrint: {
    translateTime: true,
    ignore: "pid,hostname"
  }
});

const _logWithDuration = (message: string, rethrow: boolean, fn: Function) => {
  const start = new Date().getTime();
  logger.info(message);

  try {
    fn();
  } catch (e) {
    logger.error(e);
    if (rethrow) throw e;
  }

  logger.info(`Done! (${new Date().getTime() - start}ms)`);
};

export const logWithDuration = (logMessage: string, fn: Function) => {
  _logWithDuration(logMessage, false, fn);
};

export const logWithDurationAndThrow = (logMessage: string, fn: Function) => {
  _logWithDuration(logMessage, true, fn);
};
