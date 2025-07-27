const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://basilroy:basilroy@cluster0.ubfflww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//Write missing code here
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
