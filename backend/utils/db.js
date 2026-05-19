import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.join(__dirname, '../database');

const getFilePath = (filename) => path.join(databasePath, `${filename}.json`);

export const readData = (filename) => {
  try {
    const filePath = getFilePath(filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error.message);
    return [];
  }
};

export const writeData = (filename, data) => {
  try {
    const filePath = getFilePath(filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing to ${filename}.json:`, error.message);
    return false;
  }
};

export const getNextId = (filename) => {
  const data = readData(filename);
  if (data.length === 0) return 1;
  return Math.max(...data.map((item) => item.id)) + 1;
};

export const findById = (filename, id) => {
  const data = readData(filename);
  return data.find((item) => item.id === parseInt(id));
};

export const findByEmail = (filename, email) => {
  const data = readData(filename);
  return data.find((item) => item.email === email);
};

export const deleteById = (filename, id) => {
  const data = readData(filename);
  const filtered = data.filter((item) => item.id !== parseInt(id));
  return writeData(filename, filtered);
};

export const updateById = (filename, id, updates) => {
  const data = readData(filename);
  const index = data.findIndex((item) => item.id === parseInt(id));
  if (index === -1) return false;
  data[index] = { ...data[index], ...updates };
  return writeData(filename, data);
};

export const addData = (filename, newItem) => {
  const data = readData(filename);
  const id = getNextId(filename);
  const item = { id, ...newItem, createdAt: new Date().toISOString() };
  data.push(item);
  return writeData(filename, data) ? item : null;
};
