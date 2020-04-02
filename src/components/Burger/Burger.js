import React from 'react';
import classes from './Burger.css';
import BurgerIng from './BurgerIngredients/BurgerIng'

const burger=(props)=>{
    let ing=Object.keys(props.ingredients).map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIng key={igKey + i} type={igKey} />
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(ing.length===0){
        ing=<p>Please start adding ingredients!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIng type="bread-top" />
            {ing}
            <BurgerIng type="bread-bottom" />
        </div>
    );
};

export default burger;