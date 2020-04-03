import express from "express";

const app = express();
app.use(express.static("dist"));
app.use(express.static(__dirname));
app.listen(parseInt(process.env.PIPELINER_UI_PORT), "0.0.0.0");
