import { config } from "dotenv";

config();

export const AWS_BUCKET_NAME: string = <string>process.env.AWS_BUCKET_NAME;
export const AWS_BUCKET_REGION: string = <string>process.env.AWS_BUCKET_REGION;
export const AWS_PUBLIC_KEY: string = <string>process.env.AWS_PUBLIC_KEY;
export const AWS_SECRET_KEY: string = <string>process.env.AWS_SECRET_KEY;