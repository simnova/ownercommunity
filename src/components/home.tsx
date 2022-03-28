import React from "react";
import {Link, Outlet} from "react-router-dom"
import { PhotoUpload } from "./admin/photo-upload";
import CmsPage from "./cms-page";
import {Button} from "antd";
import { Header } from "./ui/organisms/header";

const Home: React.FC = (props) => {


    return <>
    <div style={{padding:'20px'}}>
            <h1>hey</h1>
            <Header />

    <PhotoUpload/>
    <h1>there</h1>
    </div>

    

    <CmsPage/>
    </>
}
export default Home;
