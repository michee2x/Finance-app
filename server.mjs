import express from "express";
const app = express()
import cookieParser from "cookie-parser";
import cors from "cors"
import { transaction } from "./controller/paystack.mjs";


app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true, origin:"http://localhost:5173"}))

app.post("/", (req, res) => {
    console.log("this are the infos", req.body)
    transaction()
})

app.listen(8000, () => {
    console.log("this app is runnind on port 6000")
})