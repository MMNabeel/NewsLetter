

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
  const name1 = req.body.firstName;
  const name2 = req.body.lastName;
  const mail = req.body.email;
  var data = {
    members : [
      {
        email_address:mail,
        status:"subscribed",
        merge_fields:{
          FNAME: name1,
          LNAME: name2
        }
      }
    ]
  }


  const jsonData = JSON.stringify(data);
  const url = "https://com/3.0/lists/";
  // const url = "https.m3.0/ping/f6544eeebd"


  const options = {
    method : "POST",
    auth : "Hahn ab-us21"
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData)
  request.end();
  // res.write("Your first name: "+ name1 + " Last Name is: "+ name2 + "and email is: "+ mail);
  // res.send();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("Currently server is running on 3000 port: ");
});

