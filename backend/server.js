const dotenv = require("dotenv");
const app = require("./app");
const connectDatabase = require("./database");
const cloudinary = require("cloudinary");
dotenv.config({ path: "config/config.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
