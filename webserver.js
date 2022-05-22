const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

//allow to use static files in public folder
app.use(express.static(__dirname + "public"));
//parse encoded data into object we can use
app.use(express.urlencoded({ extended: true }));
//helps with urls entered in browser
const { dirname } = require("path");


app.use(express.json());
// --------------------------
app.get('/:name(index|register|login)?', function(req, res) {
    var name = __dirname+"/public/"+req.params.name+".html";
    res.sendFile(name);
});
// ------------------------------
app.post('/addUser', function(req, res) {
  const submittedValues = req.body;
  console.log("submittedValues:",submittedValues);
  const dataBaseFile = JSON.parse(fs.readFileSync(path.join(__dirname,"dataBase/dataBase.json"),'utf8'));
  dataBaseFile.push(submittedValues);
  fs.writeFileSync(path.join(__dirname,"dataBase/dataBase.json"),JSON.stringify(dataBaseFile));
  console.log(dataBaseFile);
});

app.get("/loaddata/register",(req,res)=>
{
  const dataBaseFile= fs.readFileSync(path.join(__dirname,"/dataBase/dataBase.json"),'utf-8');
 res.json(dataBaseFile);

})









// ----this should at always bottom
app.use((req, res) => {
    res.status(404).sendFile("./public/404.html", { root: __dirname });
  });
  // -----------------------------------------------
  app.listen(3000, () => {
    console.log("server listening on 3000 port");
  });
  