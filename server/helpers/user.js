const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const uploadFileToS3 = async (file) => {
  if (!file || !file._data) {
    throw new Error("Invalid file data");
  }

  const buffer = file._data; // Extract file buffer from Hapi.js
  const fileName = `uploads/${Date.now()}-${file.hapi.filename}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: file.hapi.headers["content-type"],
    ContentLength: buffer.length,
  };

  await s3.send(new PutObjectCommand(params));

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

module.exports = { uploadFileToS3 };
