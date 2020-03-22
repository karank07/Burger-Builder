import React,{Component} from 'react';
import Aux from '../../hoc/aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
const ING_PRICES={
    salad:0.5,
    cheese:0.3,
    meat:1,
    bacon:1.2
}
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            cheese:0,
            bacon:0,
            meat:0
        },
        totalPrice:4
    };
    addIng=(type)=>{
        const updatedCount=this.state.ingredients[type] +1;
        const updatedIng={ ...this.state.ingredients };
        updatedIng[type]=updatedCount;
        const newPrice=this.state.totalPrice + ING_PRICES[type]; 
        this.setState({totalPrice:newPrice,ingredients:updatedIng});
    }
    removeIng=(type)=>{
        const updatedCount=this.state.ingredients[type] -1;
        const updatedIng={ ...this.state.ingredients };
        updatedIng[type]=updatedCount;
        const newPrice=this.state.totalPrice + ING_PRICES[type]; 
        this.setState({totalPrice:newPrice,ingredients:updatedIng});
    }
    render(){
        return(
            <Aux>
               <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingAdded={this.addIng} ingRemoved={this.removeIng}/>
            </Aux>
        );
    };
}

export default BurgerBuilder;