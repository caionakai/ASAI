import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Marketing() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={11}/>
            <h1>Marketing Page</h1>
            </div>
    );
}