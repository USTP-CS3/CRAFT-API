
import Extractor from "./lib/extractor.js";
import Logger    from "./lib/logger.js";

//
// Main (self-executing async function)--------------------------------------------------------------------------
(async function main() {
    
    const filePath = "./misc/cor.pdf";
    console.log('hello');
    try {
        const output    = await Extractor.getCorInfo(filePath);
        const structure = JSON.stringify(output, null, 4);
        console.log(structure);
    } 
    catch (error) {
        const errlog = Logger('./log/extractor.log')
        errlog.append(error, 'ERROR');
    }

})();