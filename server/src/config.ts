import dotenv from 'dotenv';
dotenv.config();

const configKeys = {
    MONGO_DB_URL: process.env.DATABASE as string,
  
    PORT: process.env.PORT,
  
    DB_NAME: process.env.DB_NAME,
  
    JWT_SECRET: process.env.JWT_SECRET as string,
  
    // NODE_ENV: process.env.NODE_ENV as string,
  
    GOOGLE_AUTH_CLIENT: process.env.GOOGLE_AUTH_CLIENT as string,
  
    // ORIGIN_PORT: process.env.ORIGIN_PORT as string,
  
    // EMAIL_NODE_MAILER: process.env.EMAIL_USERNAME as string,
  
    // PASSWORD_NODE_MAILER: process.env.EMAIL_PASSWORD as string,
  };
  
  export default configKeys;