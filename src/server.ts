import express, { Request, Response } from "express";
import "reflect-metadata"

const app = express();

app.use(express.json());

app.get("/test", (request: Request, response: Response) => {
    
    response.status(200).send({ message: "Hello World"});
})

app.listen(3000, () => console.log('server is running again'));

export { app }