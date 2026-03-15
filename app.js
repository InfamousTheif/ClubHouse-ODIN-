import express from "express";
const app = express();
import './utils/dotenv.js';
import { indexRouter } from "./routes/indexRoute.js";

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(indexRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500 ).send(err.message || "Internal Server Error");
});

const PORT = process.env.PORT || 3000 ;

app.listen(PORT, (error) => {
  if(error) {
    throw error;
  };

  console.log(`Express is listening at port ${PORT}`);
});
