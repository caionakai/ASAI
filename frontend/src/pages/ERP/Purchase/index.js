import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Purchase() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={4}/>
            <h1>Purchase Page</h1>
            </div>
    );
}