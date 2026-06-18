/**
 * WEF application intake -> Google Sheet.
 *
 * Setup:
 *  1. Create a Google Sheet (this will store the applications).
 *  2. Extensions > Apps Script, paste this file in.
 *  3. Run `setup` once (it creates the header row) and authorize when prompted.
 *  4. Deploy > New deployment > type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  5. Copy the Web app URL and put it in the app's .env as VITE_SHEETS_ENDPOINT.
 *
 * Re-deploy a NEW version whenever you change this script.
 */

// Order of columns written to the sheet. Keep in sync with the React form.
var FIELDS = [
  'submitted_at',
  'first_name',
  'last_name',
  'phone_number',
  'address',
  'local_government',
  'age_range',
  'has_existing_business',
  'business_type',
  'what_you_sell',
  'years_in_business',
  'monthly_revenue',
  'equipment_needs',
  'challenges',
  'programme_benefit',
  'funding_needs',
];

var SHEET_NAME = 'Applications';

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(FIELDS);
    sheet.getRange(1, 1, 1, FIELDS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Run this once manually to create the sheet + header row. */
function setup() {
  getSheet_();
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    var row = FIELDS.map(function (key) {
      var value = data[key];
      if (value === undefined || value === null) return '';
      return value;
    });

    sheet.appendRow(row);

    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ result: 'success', message: 'WEF intake endpoint is live.' });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
