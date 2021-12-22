import React, { Component } from 'react';

// Stateless Functional Component
const TotalCounter = ({ totalResults }) => {
    return ( 
        <h2 className="responsive-width">Total results: {totalResults}</h2> 
    );
}
 
export default TotalCounter;