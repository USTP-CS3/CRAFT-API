import { promises } from 'fs';

const resetColor  = '\x1b[0m';
const redColor    = '\x1b[31m';
const yellowColor = '\x1b[33m';
const blueColor   = '\x1b[34m';
const grayColor   = '\x1b[90m';


/**
 * 
 * @param {string} logfile - Path to the log file. 
 * @returns {object} a function to append messages to the log file.
 */
export default function Logger(logfile) {
    
    /**
     * Logs a message with a specified type and color to the console and appends it to a log file.
     * 
     * @param {string} message - Text to be logged.
     * @param {string} type - Should be one of 'ERROR', 'WARN', 'INFO', or 'OTHER'.
     * @returns {Promise<void>} A promise that resolves write operation.
     */
     const append = async (message, type) => {
        try {
            const dt = new Date().toLocaleString();
            let text = dt + ' ' + JSON.stringify(message, null, 4);

            switch (type) {
                case 'ERROR':
                    text = redColor    + text + resetColor;
                    break;
                case 'WARN':
                    text = yellowColor + text + resetColor;
                    break;
                case 'INFO':
                    text = blueColor   + text + resetColor;
                    break;
                default:
                    text = grayColor   + text + resetColor;
                    break;
            }

            await promises.writeFile(logfile, `${text}\n`, { flag: 'a' });
            console.log('LOG Successful.');
        } 
        
        catch (error) {
            console.error('LOG Failed.', JSON.stringify(error, null, 4));
        }
    }

    return {
        append
    }
};

