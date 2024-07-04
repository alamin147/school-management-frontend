import React from 'react';
import { Link } from 'react-router-dom';
const Error = () => {
    return (
       <>
        <div className='my-12 mx-auto flex items-center justify-center'>
            <img src="https://wpklik.com/wp-content/uploads/2019/03/A-404-Page-Best-Practices-and-Design-Inspiration.jpg" className='object-center w-full' alt="" />
            
        </div>
        <div className='my-12 mx-auto flex items-center justify-center'><Link to="/"> <button className="btn btn-primary">Go back to home</button></Link></div>
      
       </>
    );
};

export default Error;