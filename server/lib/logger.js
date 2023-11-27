/**
 * A custom logger module that uses Winston to log to the console and a file.
 * 
 * Logger.success() 
 * Logger.info(), 
 * Logger.warn(), 
 * Logger.error(), 
 * 
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import winston from 'winston';
import path from 'path';
import chalk from 'chalk';


// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);


// Get the current module's directory
const moduleDirectory = dirname(__filename);

// Set the log  directory
const logDirectory = moduleDirectory + '/../log/';

// Define the log file path relative to the module's directory
const logFilePath = path.join(logDirectory, 'api.log');


// Define custom log levels and colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    success: 3, // Custom log level
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    success: 'green', // Custom log level color
  },
};


// Register the custom levels with Winston
winston.addColors(customLevels.colors);


// Create a custom colorizer for Winston using chalk
const customColorizer = winston.format.printf(({ level, message, timestamp }) => {
  const formattedTimestamp = chalk.gray(`[${timestamp}]`);
  const formattedLevel = chalk[customLevels.colors[level]](`[${level.toUpperCase()}]`);
  const formattedMessage = chalk[customLevels.colors[level]](message); // Color the entire message

  return `${formattedTimestamp} ${formattedLevel} ${formattedMessage}`;
});


// Create a Winston logger with console and file transports
const Logger = winston.createLogger({
  levels: customLevels.levels, // Use the custom levels
  level: 'success',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customColorizer
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: logFilePath,
      level: 'success',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customColorizer
      ),
    }),
  ],
});


export default Logger;