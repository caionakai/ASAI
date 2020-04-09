import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Performance() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={14}/>
            <h1>Performance Page</h1>
            </div>
    );
}