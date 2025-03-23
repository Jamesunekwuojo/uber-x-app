import http from "http";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import consolidate from "consolidate";
import "./db/db.js";

dotenv.config();

const app= express();


app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json({
    extended: true
}));

// app.use('views', 'views'); // set folder name from where to render the views

app.use(express.static('./public')); // set folder name from where to serve the static files

app.set('view engine', 'html');

app.engine('html', consolidate.handlebars);  // Use handlebars to parse templates when we do res.render


// Routes
app.use('/', routes);

const server = http.Server(app);

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
}   );

