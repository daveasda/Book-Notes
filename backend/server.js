import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
const api = process.env.API_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');  // EJS looks for templates in a 'views' folder

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/books/search", async (req, res) => {
  const query = req.query.q;
  
  const response = await fetch(
    `https://openlibrary.org/search.json?title=${query}`
  );
  
 
  const data = await response.json();
  const books = data.docs.map(book => ({
    title: book.title,
    author: book.author_name?.[0],
    coverId: book.cover_i,
    coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
  }));
  
  res.json(books);

});