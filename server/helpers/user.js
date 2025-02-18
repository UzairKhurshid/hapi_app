const s3 = require('../config/aws');

const uploadFileToS3 = async (file) => {
    const fileName = `${Date.now()}-${file.hapi.filename}`; // Unique file name
    const fileStream = file._data; // Get the file stream
  
    // S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // S3 Bucket Name
      Key: fileName, // File name in S3
      Body: fileStream, // File stream to upload
      ContentType: file.hapi.headers['content-type'], // Content Type
      ACL: 'public-read', // Make the file publicly readable
    };
  
    try {
      // Upload file to S3
      const data = await s3.upload(params).promise();
      return data.Location; // Return the URL of the uploaded file
    } catch (error) {
      throw new Error('File upload failed: ' + error.message);
    }
};

module.exports = {
    uploadFileToS3
}