const express = require('express');
const app = express();

//import dei middlewares,routers...
const routeNotFound = require('./middlewares/routeNotFound')
const errorHandler = require('./middlewares/errorHandler')
const postsRouter = require("./routers/posts.js")
const categoriesRouter = require("./routers/categories.js")
const tagsRouter = require("./routers/tags.js")


require("dotenv").config();
const port = 3000;

app.use(express.json());


console.log("entrato app.js /posts")
app.use('/posts', postsRouter);

console.log("entrato app.js /categories")
app.use('/categories', categoriesRouter);

console.log("entrato app.js /tags")
app.use('/tags', tagsRouter);

//? middlewares per errori di rotta/generici
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server avviato alla porta http://localhost:${port}`)
})