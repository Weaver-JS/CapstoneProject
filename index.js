import express from "express";
import bodyParser from "body-parser";
import blogEntry from './blogEntry.js';
import fs from 'fs.promises'


const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
var entries = [];


app.get("/", async (req, res) => {
  if(entries.length == 0)
  {
    const content = await fs.readFile("data.json", 'utf-8');
    entries = JSON.parse(content);
  }
  res.render("index.ejs", {entries : entries});
});

app.get("/create", (req,res) => {
    res.render("create.ejs");
})

app.post("/submit", async  (req, res) => {
  console.log(req.params.id);
  var entry = new blogEntry(
  entries.length, 
  req.body['title'], 
  req.body['content'], 
  req.body['image']);

  entries.push(entry);
  const entriesJson = JSON.stringify(entries, null, 4);
  console.log(entriesJson);

  await fs.writeFile("data.json", entriesJson);
    // Redirigir después de completar la escritura del archivo
    res.redirect('/');
});

app.get("/edit/:id", (req, res) => {

  console.log("hello");
  console.log(req.params);
  res.render("edit.ejs", req.params);
})

app.post("/apply/:id", (req, res) => {
  var entry = entries[req.params.id];
  if(entry !== undefined)
  {
    entry = new blogEntry(
      req.params.id, 
      req.body['title'], 
      req.body['content'], 
      req.body['image']);

    entries[req.params.id] = entry;
  }
  res.redirect("/");
})

app.post("/delete/:id", (req, res) => {
  console.log("hello");
  var entry = entries[req.params.id];
  entries.splice(req.params.id, 1);
  console.log(entries);
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
