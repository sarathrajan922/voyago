import dotenv from 'dotenv';
dotenv.config();

const configKeys = {
    MONGO_DB_URL: process.env.DATABASE as string,
  
    PORT: process.env.PORT,
  
    DB_NAME: process.env.DB_NAME,
  
    JWT_SECRET: process.env.JWT_SECRET as string,
  
    // NODE_ENV: process.env.NODE_ENV as string,
  
    GOOGLE_AUTH_CLIENT: process.env.GOOGLE_AUTH_CLIENT as string,
  
   

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,

    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY as string,
  
    // EMAIL_NODE_MAILER: process.env.EMAIL_USERNAME as string,
    EMAIL_NODE_MAILER: process.env.NODE_MAILER_EMAIL_ID as string,

    PASS_NODE_MAILER: process.env.NODE_MAILER_PASS as string
  };
  
  export default configKeys;