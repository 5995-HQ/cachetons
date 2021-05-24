import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import UserContext from "./context/UserContext"
import HeaderNavigation from "./components/navigation/HeaderNavigation"
import LeftNavBar from "./components/navigation/LeftNavBar"
import Welcome from "./components/Welcome"
import Craigslist from "./components/Craigslist"
import { User } from "./types"


interface Props {
  user: User
}

const App = ({ user }: Props) => {
  return (
    <UserContext.Provider value={user}>
      <HeaderNavigation />
      <Router>
        <div className="flex overflow-scroll bg-grey-lightest">
          <LeftNavBar />
          <div className="static flex-1 min-h-screen px-8 py-4">
            {user.isAdmin && (
              <>
                <Route path="/craigslist" component={Craigslist} exact />
              </>
            )}
            <Route path="/" component={Welcome} exact />
          </div>
        </div>
      </Router>
      <footer className="text-center bg-indigo-lightest text-black">
        <small>
          © Copyright 2020-2021, cachetones
						<br />
          <a href="mailto:odnanrefdev@gmail.com"></a>
            Contact
        </small>
      </footer>
    </UserContext.Provider>
  )
}

export default App