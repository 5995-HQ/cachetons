import * as React from "react"
import { useUserContext } from "../../context/UserContext"

const HeaderNavigation = () => {
    const user = useUserContext()

    return (
        <div className="flex items-center justify-between px-8 py-4 border-b">
            <div className="flex items-center uppercase">
                <div className="ml-2 text-xl tracking-wide">cachetons</div>
            </div>
            <div className="align-middle">{user.nickName}</div>
        </div>
    )
}

export default HeaderNavigation
