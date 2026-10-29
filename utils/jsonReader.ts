import * as fs from 'fs';
import * as path from 'path';

/**
 * Custom method to read a JSON array file synchronously.
 * @param relativeFilePath - The path to the JSON file relative to the project root or current file.
 */
export function readJsonArray<T>(relativeFilePath: string): T[] {
  try {
    // Resolve the absolute path of the JSON file
    const absolutePath = path.resolve(process.cwd(), relativeFilePath);
    
    // Read raw file content
    const rawData = fs.readFileSync(absolutePath, 'utf-8');
    
    // Parse the JSON string into an object/array
    const parsedData = JSON.parse(rawData);
    
    // Validate that the root element is indeed an array
    if (!Array.isArray(parsedData)) {
      throw new Error(`Data in ${relativeFilePath} is not a valid JSON array.`);
    }
    
    return parsedData as T[];
  } catch (error) {
    console.error(`Failed to read JSON array from ${relativeFilePath}:`, error);
    throw error;
  }
}