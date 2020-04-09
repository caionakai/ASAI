import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Leads() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={9}/>
            <h1>Leads Page</h1>
            </div>
    );
}