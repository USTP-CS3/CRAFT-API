function exportFormDataToExcel() {
  // Access the active form
  var form = FormApp.getActiveForm();
  
  // Access all responses
  var responses = form.getResponses();
  
  // Access the spreadsheet
  var spreadsheet = SpreadsheetApp.create('Form Responses');
  
  // Access the sheet within the spreadsheet
  var sheet = spreadsheet.getActiveSheet();
  
  // Add headers to the sheet
  var headers = form.getItems().map(function(item) {
    return item.getTitle();
  });
  sheet.appendRow(headers);
  
  // Iterate through each form response
  responses.forEach(function(response) {
    var itemResponses = response.getItemResponses();
    var rowData = itemResponses.map(function(itemResponse) {
      return itemResponse.getResponse();
    });
    sheet.appendRow(rowData);
  });
  
  Logger.log('Data exported to Excel successfully!');
}
