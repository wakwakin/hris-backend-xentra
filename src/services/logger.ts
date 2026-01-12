import pino from 'pino';

const env = process.env.NODE_ENV;

export const logger = pino({
  level: env === 'production' ? 'info' : 'debug',
  transport:
    env === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
});
