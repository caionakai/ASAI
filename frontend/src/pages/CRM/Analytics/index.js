import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Analytics() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={10}/>
            <h1>Analytics Page</h1>
            </div>
    );
}