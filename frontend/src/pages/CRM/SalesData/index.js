import React from 'react';
import Sidebar from '../../../Sidebar';

export default function Sd() {
    return (
            <div style={{ display:'flex', flexDirection: 'row'}}>
            <Sidebar currentPage={13}/>
            <h1>Sales Data Page</h1>
            </div>
    );
}