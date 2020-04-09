import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Inventory() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={2} />
            <h1>Inventory Page</h1>
            </div>
    );
}