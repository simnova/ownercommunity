import React from "react";
import {Link, Outlet} from "react-router-dom"

const Home: React.FC = (props) => {
    return <>
    Before Outlet<br/>
    <Outlet/><br/>
    After Outlet<br/>
    <Link to="/pageEditor">Editor</Link>
    </>
}
export default Home;
