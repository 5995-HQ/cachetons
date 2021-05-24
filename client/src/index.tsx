import React from "react"
import { render } from "react-dom"
import "./App.css"
import API from "./scripts/Api"
import App from "./App"
import { User } from "./types"
import * as serviceWorker from "./serviceWorker"

API.get("/user").then(({ data: user }: any) => {
  render(<App user={user as User} />, document.getElementById("root"))
})

serviceWorker.unregister()