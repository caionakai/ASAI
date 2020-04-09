import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Em() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={15}/>
            <h1>Email Marketing Page</h1>
            </div>
    );
}