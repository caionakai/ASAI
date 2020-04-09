import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Recruitment() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={6}/>
            <h1>Recruitment Page</h1>
            </div>
    );
}