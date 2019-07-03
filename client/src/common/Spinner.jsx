import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
    return ( 
        <div><img src={spinner} style={{
            width:200,margin:'auto',display:'block'
        }} alt=""/></div>
        
     );
}
 
export default Spinner;