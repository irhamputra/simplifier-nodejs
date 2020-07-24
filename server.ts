import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    data: "Hello world",
  });
});

app.listen(port, () => console.log(`Server running on port:${port}`));
