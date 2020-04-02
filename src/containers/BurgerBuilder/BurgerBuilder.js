import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
const ING_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1,
    bacon: 1.2
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };
    componentDidMount() {
        axios.get('https://burgerbuilder-b7bf1.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error=>{
                this.setState({error:true});
            });

    }
    updatePurchaseState(ingredients) {
        const ing = { ...ingredients };
        const sum = Object.keys(ing).map(igKey => {
            return ing[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({ purchasable: sum > 0 })
    }

    addIng = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIng = { ...this.state.ingredients };
        updatedIng[type] = updatedCount;
        const newPrice = this.state.totalPrice + ING_PRICES[type];
        this.setState({ totalPrice: newPrice, ingredients: updatedIng });
        this.updatePurchaseState(updatedIng);
    }
    removeIng = (type) => {
        const updatedCount = this.state.ingredients[type] - 1;
        if (this.state.ingredients[type] <= 0)
            return;
        const updatedIng = { ...this.state.ingredients };
        updatedIng[type] = updatedCount;
        const newPrice = this.state.totalPrice - ING_PRICES[type];
        this.setState({ totalPrice: newPrice, ingredients: updatedIng });
        this.updatePurchaseState(updatedIng);
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        //alert('You Continue!');
        
        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price="+ this.state.totalPrice);
        const queryString =queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:'?' +queryString
        });
       
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary=null;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        let burger= this.state.error? <p>ingredients can't be loaded!</p>:<Spinner />;
        if(this.state.ingredients){
            burger = <Aux>
                     <Burger ingredients={this.state.ingredients} />
                     <BuildControls
                        ingAdded={this.addIng}
                        ingRemoved={this.removeIng}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchaseHandler}/>
                     </Aux>;
            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            cancelOrder={this.purchaseCancelHandler}
            continueOrder={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

export default withErrorHandler(BurgerBuilder, axios);