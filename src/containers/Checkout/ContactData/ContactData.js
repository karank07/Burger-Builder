import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Form from '../../../components/UI/Form/Form';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fast', displayValue: 'Priority' },
                    { value: 'slow', displayValue: 'Usual' }]
                },
                validation: {},
                value: 'fast',
                valid: true

            },
        },
        formIsValid: false
    }
    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let ele in this.state.orderForm) {
            formData[ele] = this.state.orderForm[ele].value;
        }
        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            orderData: formData
        };

        this.props.onOrderBurger(order);
    }
    checkValidation(value, rules) {
        let isValid = true;
        if(!rules){
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    inputChangeHandler = (event, eleID) => {

        const updatedForm = {
            ...this.state.orderForm
        };
        const updatedFormelement = {
            ...updatedForm[eleID]
        };
        updatedFormelement.value = event.target.value;
        updatedFormelement.valid = this.checkValidation(updatedFormelement.value, updatedFormelement.validation);
        updatedFormelement.touched = true;
        updatedForm[eleID] = updatedFormelement;
        let formValid = true;
        for (let ele in updatedForm) {
            formValid = updatedForm[ele].valid && formValid;
        }
        this.setState({ orderForm: updatedForm, formIsValid: formValid });

    }
    render() {
        
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });

        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElements.map(ele => (
                <Form key={ele.id}
                    elementType={ele.config.elementType}
                    elementConfig={ele.config.elementConfig}
                    value={ele.config.value}
                    invalid={!ele.config.valid}
                    shouldValidate={ele.config.validation}
                    touched={ele.config.touched}
                    changed={(event, ) => this.inputChangeHandler(event, ele.id)} />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}
const mapDsipatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(action.purchase(orderData))
    };

}

export default connect(mapStateToProps, mapDsipatchToProps)(withErrorHandler(ContactData, axios));