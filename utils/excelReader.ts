import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Reads an Excel sheet and returns data as an array of custom type objects.
 * @param filePath Relative path to the Excel file from the project root.
 * @param sheetName Name of the sheet to read. Defaults to the first sheet.
 */
export function readExcelData<T>(filePath: string, sheetName?: string): T[] {
  // 1. Resolve absolute file path
  const absolutePath = path.resolve(process.cwd(), filePath);
  
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Excel file not found at: ${absolutePath}`);
  }

  // 2. Read the workbook
  const workbook = xlsx.readFile(absolutePath);

  // 3. Determine the targeted worksheet
  const targetSheetName = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[targetSheetName];

  if (!worksheet) {
    throw new Error(`Sheet named "${targetSheetName}" was not found in the workbook.`);
  }

  // 4. Convert sheet data into an array of JSON objects
  // The first row of the excel sheet is automatically treated as header keys.
  const records = xlsx.utils.sheet_to_json(worksheet) as T[];

  return records;
}