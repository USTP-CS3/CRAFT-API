class Reporter {
    /**
     * @param {Object} reportData - Data to be reported.
     */
    static report(reportData) {
        console.log("Reporting data to the client-side:", reportData);

        // how does it report its logic using client-side approach?
        // issue: there is a module specifier conflict with the pdf2json
        // find a way to deal with it before making use of index to create client-side report
    }
}

export default Reporter;
