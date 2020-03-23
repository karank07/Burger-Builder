import React from 'react';
import classes from './NavigationItem.css';
const navigatioItem=(props)=>(
    <li className={classes.NavigationItem}>
        <a href={props.link} classNam={props.active ? classes.active : null}>{props.children}</a>
    </li>
);

export default navigatioItem;