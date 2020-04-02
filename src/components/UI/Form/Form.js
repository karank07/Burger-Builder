import React from 'react';
import classes from './Form.css';

const form = (props) => {
    let Ielement = null;
    const formClasses=[classes.Ielement];
    if(props.invalid && props.shouldValidate && props.touched){
        formClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            Ielement = < input className={formClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            Ielement = < textarea className={formClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
        case ('select'):
            Ielement = < select className={formClasses.join(' ')}
                value={props.value} 
                onChange={props.changed}>
                {props.elementConfig.options.map(option=>(
                <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
                </select> ;
            break;
        default:
            Ielement = < input className={formClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />;
    }
    return (< div className={classes.Form}>
        <label className={classes.Label}> {props.label} </label>
        {Ielement}
    </div>
    );
}


export default form;