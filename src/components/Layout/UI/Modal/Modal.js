import React from 'react';
import classes from './Modal.css';

const modal=(props)=>(
    <div 
    className={classes.Modal} 
    style={{transform:props.show?'translateY(0)':'trasnaleY(-100vh)',
    opacity:props.show ?'1':'0'
    }}>
        {props.children}
    </div>
);

export default modal;