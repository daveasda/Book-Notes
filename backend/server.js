import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');  // EJS looks for templates in a 'views' folder

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});