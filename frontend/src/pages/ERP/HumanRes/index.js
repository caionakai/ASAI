import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Hr() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={1}/>
            <h1>Human Resources Page</h1>
            </div>
    );
}