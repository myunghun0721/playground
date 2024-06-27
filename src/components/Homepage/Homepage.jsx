import { NavLink, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import "./Homepage.css"
function Homepage() {

    return <div className="nav">
        <h1> Home page</h1>
        <NavLink to="/laptop">Laptop Portfolio</NavLink>
        <NavLink to="/physics">Physics</NavLink>
    </div>
}

export default Homepage;
