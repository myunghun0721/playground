import { NavLink, useNavigate } from "react-router-dom";
import { Suspense } from "react";

function Homepage() {

    return <>
        <h1> Home page</h1>
        <NavLink to="/laptop">Laptop Portfolio</NavLink>
    </>
}

export default Homepage;
