import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Sm() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={12}/>
            <h1>Social Media Page</h1>
            </div>
    );
}