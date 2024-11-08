import React from "react";
import Sidebar from "./Sidebar"

function MainLayout( {children } ){
    return (
        <div className="main-layout-Container">
            <Sidebar/>
            {children}
        </div>
    );
}

export default MainLayout