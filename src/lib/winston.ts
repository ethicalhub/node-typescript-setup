import winston from 'winston'

import config from '@/config/config'

const { combine, timestamp, json, errors, align, printf, colorize } = winston.format

const transports: winston.transport[] = []

if (config.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                align(),
                printf(({ level, message, timestamp, ...meta }) => {
                    const metaSTring = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''
                    return `${timestamp} [${level}]: ${message} ${metaSTring}`
                })
            )
        })
    )
} else {
    transports.push(
        new winston.transports.File({
            filename: 'logs/production.log',
            level: 'info',
            format: combine(timestamp(), json(), errors({ stack: true }))
        })
    )
}

// create a logger instance using winston

const logger = winston.createLogger({
    level: config.LOG_LEVEL || 'info',
    format: combine(timestamp(), json(), errors({ stack: true })),
    transports,
    silent: config.NODE_ENV === 'test'
})

export { logger }
