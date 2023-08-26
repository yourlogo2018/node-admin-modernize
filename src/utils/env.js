import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const UPLOAD_PATH = process.env.UPLOAD_PATH || path.resolve('./uploads');

export {
  PORT, UPLOAD_PATH
};
