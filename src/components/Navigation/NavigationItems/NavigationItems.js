import React from 'react';
import classes from './NavigationItems.css';
import NavigatioItem from './NavigationItem/NavigationItem'
const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigatioItem link="/" exact>Burger Builder</NavigatioItem>
        <NavigatioItem  link="/orders">Orders</NavigatioItem>
    </ul>
);

export default navigationItems;