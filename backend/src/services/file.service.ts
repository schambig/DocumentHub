import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectAclCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } from "../config.aws";
import fs from "fs";

export const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
      accessKeyId: AWS_PUBLIC_KEY,
      secretAccessKey: AWS_SECRET_KEY
  }
})
