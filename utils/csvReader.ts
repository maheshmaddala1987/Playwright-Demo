import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

/**
 * Custom method to read and parse a CSV file.
 * @param relativeFilePath - Path to the CSV file relative to the project root.
 * @returns Array of parsed objects matching type T.
 */
export function readCsvData<T>(relativeFilePath: string): T[] {
  const absolutePath = path.resolve(process.cwd(), relativeFilePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`CSV file not found at path: ${absolutePath}`);
  }

  // Read file content as string
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  // Parse CSV string into an array of objects
  return parse(fileContent, {
    columns: true,           // Uses the first row as object keys
    skip_empty_lines: true,  // Bypasses blank rows
    trim: true,              // Trims whitespace around headers and values
  }) as T[];
}