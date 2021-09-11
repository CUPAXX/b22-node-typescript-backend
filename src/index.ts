import express from "express"
import router from "./routes"
import cors from "cors"
import morgan from "morgan"
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan("dev"))
app.use("/", router)

app.listen(8080, () => {
  // tslint:disable-next-line: no-console
  console.log("App listening on port 8080")
})
