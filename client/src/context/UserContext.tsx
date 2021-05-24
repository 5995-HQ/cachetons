
import React, { useContext } from "react"
import { User } from "../types"

const UserContext = React.createContext<User>({
  nickName: "Fernando",
  isAdmin: true,
})

export const useUserContext = () => useContext(UserContext)

export default UserContext