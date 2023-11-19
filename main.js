
import Extractor from "./lib/extractor.js";

//
// Main (self-executing async function)--------------------------------------------------------------------------
(async function main() {
    
    const filePath = "./misc/cor1.pdf";

    try {
        const output    = await Extractor.getCorInfo(filePath);
        const structure = JSON.stringify(output, null, 4);

        console.log(structure);
    } 
    catch (error) {
        console.error("Error in main:", error.message);
    }

})();