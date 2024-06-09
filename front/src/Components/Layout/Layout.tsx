import React from 'react';
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer";
const Layout: React.FC = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: '100vh'}}>
            <Header/>

            <div style={{height: '100%'}} >
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;