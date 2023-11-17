import { getCorInfo } from "./lib/extractor.js";

// Main (self-executing async function)
(async function main() {
    
    const filePath = "./misc/cor3.pdf";

    try {
        const output = await getCorInfo(filePath);
        const structure = JSON.stringify(output, null, 4);

        console.log(structure);
    } 
    catch (error) {
        console.error("Error in main:", error.message);
    }

})();
