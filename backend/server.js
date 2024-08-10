const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./config/database");
const dotenv = require("dotenv");
dotenv.config()
const app=express();
app.use(cors());
app.use(bodyParser.json())
app.use("/api/users", userRoutes);
sequelize.sync().then(()=>{
  console.log("database synced")
  const PORT=process.env.PORT || 5000;
  app.listen(PORT,()=>{
    console.log(`server is listing on port ${PORT}`)
  })
}).catch((error)=>{
  console.error("unable to sync database",error)
})