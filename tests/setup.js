// filepath: tests/setup.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../src/app.js";

// read the file ourselves to be 100 % sure
const envPath = path.resolve(process.cwd(), ".env.test");
if (!fs.existsSync(envPath)) {
  throw new Error(".env.test not found at project root");
}
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

console.log("loaded env:", {
  DOTENV_CONFIG_PATH: process.env.DOTENV_CONFIG_PATH,
  MONGO_URI: process.env.MONGO_URI,
});

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not set in .env.test");
}

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

export default app;