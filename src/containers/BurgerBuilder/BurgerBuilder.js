import React,{Component} from 'react';
import Aux from '../../hoc/aux'
import Burger from '../../components/Burger/Burger'
class BurgerBuilder extends Component{

    render(){
        return(
            <Aux>
               <Burger />
                <div>BuildControls</div>
            </Aux>
        );
    };
}

export default BurgerBuilder;