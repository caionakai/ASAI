import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Fa() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={5}/>
            <h1>Finance Page</h1>
            </div>
    );
}