import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Contacts() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={8}/>
            <h1>Contacts Page</h1>
            </div>
    );
}