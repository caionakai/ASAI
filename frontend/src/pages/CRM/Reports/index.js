import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Reports() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={16}/>
            <h1>Reports Page</h1>
            </div>
    );
}