import React from 'react'

function Sidebar(){
    return (
        <div className='sidebar'>

            <div className='sidebar-image-placeholder'>Logo placeholder</div>
            
            <div className='sidebar-options'>
                <div className='sidebar-options-text'>Portfolio</div>
                <div className='sidebar-options-text'>Dashboard</div>
                <div className='sidebar-options-text'>Stocks</div>
                <div className='sidebar-options-text'>Settings</div>
            </div>

            <div className='sidebar-end'>
                <div className='sidebar-options-text'>Logout</div>
            </div>

        </div>
    );
}

export default Sidebar;

