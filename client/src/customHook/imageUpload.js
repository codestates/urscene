import AWS from "aws-sdk";
require("dotenv").config();

async function imageUpload(file) {
  const imageName = "";

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_IAM_AccessKeyId,
    secretAccessKey: process.env.REACT_APP_IAM_SecretAccessKey,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BucketName_ImageUpload },
    region: process.env.REACT_APP_S3_region_ImageUpload,
  });

  const uploadFile = (file) => {
    let name =
      Math.floor(Math.random() * 1000).toString() +
      Date.now() +
      "." +
      file.name.split(".").pop();

    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.REACT_APP_S3_BucketName_ImageUpload,
      Key: name,
      ContentType: "image/jpg,image/png,image/jpeg,image/gif",
    };

    myBucket.putObject(params).send((err) => {
      if (err) console.log(err);
      imageName = name;
    });
  };

  await uploadFile(file);

  return imageName;
}

export default imageUpload;
