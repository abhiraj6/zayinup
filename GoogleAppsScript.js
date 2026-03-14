function doGet(e) {
  var action = e.parameter.action;
  if(action === 'getAll') {
    return ContentService.createTextOutput(JSON.stringify({
      jobs: getSheetData('Jobs'),
      colleges: getSheetData('Colleges'),
      domains: getSheetData('Domains'),
      purposes: getSheetData('Purposes'),
      employees: getSheetData('Employees'),
      apps: getSheetData('Applications'),
      contacts: getSheetData('ContactRequests')
    })).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput("ZayinUp Backend API Running");
}

function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var payload = JSON.parse(rawData);
    if(payload.action === 'syncAll') {
      var sheetName = payload.type; 
      var dataArray = payload.data;
      
      // If no valid data, just return
      if(!sheetName || !dataArray) return ContentService.createTextOutput("Missing required fields");
      
      var validNames = ['Jobs', 'Colleges', 'Domains', 'Purposes', 'Employees', 'Applications', 'ContactRequests'];
      if(validNames.indexOf(sheetName) !== -1) {
        syncSheetData(sheetName, dataArray);
        return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
      }
    }
  } catch(err) {
    return ContentService.createTextOutput("Error: " + err.toString());
  }
  return ContentService.createTextOutput("Unknown Command");
}

function getSheetData(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if(!sheet) return [];
  
  var data = sheet.getDataRange().getValues();
  if(data.length < 2) return []; // No headers or data
  
  var headers = data[0];
  var result = [];
  
  for(var i=1; i<data.length; i++) {
    var row = data[i];
    var obj = {};
    for(var j=0; j<headers.length; j++) {
      var key = headers[j];
      var value = row[j];
      
      // Try to parse JSON strings back into arrays/objects (like college 'programs' array)
      if(typeof value === 'string' && (value.indexOf('[') === 0 || value.indexOf('{') === 0)) {
        try {
          value = JSON.parse(value);
        } catch(e) {}
      }
      obj[key] = value;
    }
    result.push(obj);
  }
  return result;
}

function syncSheetData(sheetName, dataArray) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  
  // Create sheet if it doesn't exist
  if(!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  
  sheet.clear();
  
  if(!dataArray || dataArray.length === 0) return;
  
  // Extract headers
  var headers = [];
  for(var key in dataArray[0]) {
    headers.push(key);
  }
  
  var rows = [headers];
  
  for(var i=0; i<dataArray.length; i++) {
    var rowData = [];
    var obj = dataArray[i];
    for(var j=0; j<headers.length; j++) {
      var val = obj[headers[j]];
      // Stringify objects/arrays so they fit in Sheets cell
      if(typeof val === 'object') val = JSON.stringify(val);
      rowData.push(val);
    }
    rows.push(rowData);
  }
  
  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
}
