import React from 'react';
import classes from './NavigationItems.css';
import NavigatioItem from './NavigationItem/NavigationItem'
const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigatioItem link="/" active>Burger Builder</NavigatioItem>

        <NavigatioItem link="/">Checkout</NavigatioItem>
    </ul>
);

export default navigationItems;