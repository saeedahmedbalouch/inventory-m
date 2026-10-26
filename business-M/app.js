
require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const router = require("./routers/router");
const errorMiddleware = require("./middlewares/errMiddleware");
app.use(helmet());  
app.use(express.json());

const port = 3000;

app.use('/api', router);   

app.use(errorMiddleware);   

app.listen(port, () => {
    console.log("server is runing on the localhost:3000");
});