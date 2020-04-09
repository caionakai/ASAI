import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Sales() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={3} />
            <h1>Sales Page</h1>
            </div>
    );
}