import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logDirectory = path.join(__dirname, '../logs');
const logDirectoryExists = fs.existsSync(logDirectory);
if (!logDirectoryExists) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

export const logger = pino({
  level: 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          destination: path.join(logDirectory, 'output.log'),
        },
        level: 'info',
      },
      {
        target: 'pino-pretty',
        options: { destination: process.stdout.fd },
      },
    ],
  },
});
