import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';
const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
];
const buildControls=(props)=>(

    <div className={classes.BuildControls}> 
        {controls.map(c=>(
            <BuildControl 
                key={c.label} 
                label={c.label} 
                added={()=>props.ingAdded(c.type)}
                removed={()=>props.ingRemoved(c.type)}
            />
        ))}
    </div>

);

export default buildControls;