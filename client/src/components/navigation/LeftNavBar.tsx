import React, { useContext } from "react"
import LeftNavBarItem from "./LeftNavBarItem"
import UserContext from "../../context/UserContext"

const LeftNavBar = () => {
    const user = useContext(UserContext)

    return (
        <div className="w-1/5 border-r bg-white py-4 ">
            <ul className="list-reset w-full">
                {user.isAdmin && (
                    <>
                        <LeftNavBarItem path="/craigslist" title="Craigslist" />
                        <LeftNavBarItem path="/ebay" title="Ebay items" />
                        <LeftNavBarItem path="/fbmarketplace" title="Facebook Marketplace" />
                        <LeftNavBarItem path="/feeling-lucky" title="Randomly generated items" />
                    </>
                )}
                <LeftNavBarItem path="/" title="Welcome" />
            </ul>
        </div>
    )
}

export default LeftNavBar
