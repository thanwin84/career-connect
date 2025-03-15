import pino, { destination } from 'pino';
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
        target: 'pino/file',
        options: {
          destination: path.join(logDirectory, 'info.log'),
        },
        level: 'info',
      },
      {
        target: 'pino/file',
        options: { destination: path.join(logDirectory, 'error.log') },
        level: 'error',
      },
    ],
  },
});
