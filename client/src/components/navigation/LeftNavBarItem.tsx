import * as React from "react"
import * as types from "../../types"
import { NavLink, withRouter } from "react-router-dom"

const LeftNavBarItem = (props: types.TLeftNavBarItem) => {
    let styles = "w-full py-2 pl-8 hover:bg-grey-lightest text-grey"

    if (props.location.pathname === props.path) {
        styles += " border-indigo-dark border-r bg-grey-lightest"
    }

    return (
        <li className={styles}>
            <NavLink
                to={props.path}
                className="no-underline uppercase text-sm text-grey"
                activeStyle={{ color: "#2F365F" }}
                exact>
                {props.title}
            </NavLink>
        </li>
    )
}

export default withRouter(LeftNavBarItem)