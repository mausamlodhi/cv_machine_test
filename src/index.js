import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import path from "path";
import cors from "cors";
import models from "./model";
import routes from "./routes";

export default class ServerClass {
  constructor(app) {
    this.app = app;
    this.middleware();
    this.connectDB();
    this.route();
    this.start();
  }
  middleware() {
    const { app } = this;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(compression());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(cors());
  }
  connectDB() {
    const { mongoose } = models;
  }
  route() {
    const { app } = this;
    routes(app);
  }
  start() {
    const { app } = this;
    const port = app.get("port");
    const server = app.listen(port, () => {
      console.log("Server started at port number : ", port);
    });
  }
}
