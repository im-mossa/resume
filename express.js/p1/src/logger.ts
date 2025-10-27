import pino from 'pino';

const level: pino.LevelWithSilent = (process.env.LOG_LEVEL as pino.LevelWithSilent) || 'info';

const logger = pino({
    level,
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname'
                }
            }
        ]
    }
});

export default logger;
