import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actionType from './../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,

    };
    componentDidMount() {
        this.props.initIng();
    }
    updatePurchaseState(ingredients) {
        const ing = { ...ingredients };
        const sum = Object.keys(ing).map(igKey => {
            return ing[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        //alert('You Continue!');
        this.props.initPurchase();
        this.props.history.push('/checkout');

    }

    render() {
        const disabledInfo = {
            ...this.props.ing
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <BuildControls
                        ingAdded={this.props.onIngAdd}
                        ingRemoved={this.props.onIngRem}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ing)}
                        purchasing={this.purchaseHandler} />
                </Aux>);
            orderSummary = <OrderSummary
                ingredients={this.props.ing}
                cancelOrder={this.purchaseCancelHandler}
                continueOrder={this.purchaseContinueHandler}
                price={this.props.price} />;
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

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}
const mapDispatchToState = dispatch => {
    return {
        onIngAdd: (ingName) => dispatch(actionType.addIng(ingName)),

        onIngRem: (ingName) => dispatch(actionType.remIng(ingName)),

        initIng: () => dispatch(actionType.initIng()),

        initPurchase: () => dispatch(actionType.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToState)(withErrorHandler(BurgerBuilder, axios));