import React from 'react';
import classes from './Burger.css';
import BurgerIng from './BurgerIngredients/BurgerIng'

const burger=(props)=>{
    return(
        <div className={classes.Burger}>
            <BurgerIng type="bread-top" />

            <BurgerIng type="cheese" />
            <BurgerIng type="meat" />
            <BurgerIng type="bread-bottom" />
        </div>
    );
};

export default burger;