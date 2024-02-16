import { S3 } from "aws-sdk";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config()

const s3 = new S3({
  s3ForcePathStyle: true,
  accessKeyId: process.env.AWS_ACCESS_KEY_DEMO,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DEMO,
  endpoint: process.env.AWS_BUCKET_ENDPOINT
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);
  // console.log("filenaME", fileName);

  const response = await s3.upload({
    Body: fileContent,
    Bucket: "deployment-service",
    Key: fileName,
  }).promise();
  console.log(response);
}