## Node.js and Express.js

What is Node.js? 
Node.js is a javascript runtime that runs on computers WITHOUT a browser. You can create simple or sophisticated CLI programs and algorithms using javascript without having to rely on a browsers. The runtime itself is built on the Chromium Javascript engine, V8. It only runs Javascript programs. You can not run Webpages with HTML, CSS, and Javascript using Node.js. Thats more of a browser rendering task. Node.js is mostly used for running javascript code on Servers.

What is Express.js?
Express.js is a framework for building web servers using Node.js' runtime. We can build full on web applications using Express.js. We can also utilze other frameworks/libraries such as React to build Full Stack (Both Backend and Frontend) Applications all entirely in Javascript.

How are both used together?
Well lets take a look in code:

```javascript

//server.js
import express from "express" //Import the Express.js package

const app = express(); //Initialize an Express Application

//Build a simple GET Route
app.get("/", (req, res) => {

  //Send back a simple Hello world string to the web page
  res.send("Hello world")
});

//Have the app run and listen to port 8080 on our localhost network
app.listen(8080, () => {
  //Print a message once the port has been attached
  console.log("Server is listening on port 8080");
});

```

```sh

$ node server.js

Server is listening on port 8080

```

From here, you can copy the code, run it on your local machine, then go to your browser and go to http://localhost:8080 and see the `Hello world` string. Simple server.
