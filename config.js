import dotenv  from "dotenv"
dotenv.config()

export const dbobj = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
};

export const cloudobj = {
    cloud_name: 'doryfkoj2', 
    api_key: '188848899426429', 
    api_secret: 'x2i9z2XCara1ZBYUuC43DE1Nqi4' 
}