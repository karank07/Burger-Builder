import React,{Component} from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
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
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false
    };
    updatePurchaseState(ingredients){
        const ing={...ingredients};
        const sum=Object.keys(ing).map(igKey=>{
            return ing[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);

        this.setState({purchasable:sum>0})
    }

    addIng=(type)=>{
        const updatedCount=this.state.ingredients[type] +1;
        const updatedIng={ ...this.state.ingredients };
        updatedIng[type]=updatedCount;
        const newPrice=this.state.totalPrice + ING_PRICES[type]; 
        this.setState({totalPrice:newPrice,ingredients:updatedIng});
        this.updatePurchaseState(updatedIng);
    }
    removeIng=(type)=>{
        const updatedCount=this.state.ingredients[type] -1;
        if(this.state.ingredients[type]<=0)
            return;
        const updatedIng={ ...this.state.ingredients };
        updatedIng[type]=updatedCount;
        const newPrice=this.state.totalPrice - ING_PRICES[type]; 
        this.setState({totalPrice:newPrice,ingredients:updatedIng});
        this.updatePurchaseState(updatedIng);
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        //alert('You Continue!');
        this.setState({loading:true});
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,  //for future scope- caclulate price on the server to reduce client side computation
            customer:{
                name:'Test_Karan',
                address:{
                    street:'Teststreet',
                    zipcode:'TEST',
                    country:'Canada'
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
        };
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false, purchasing:false});
        })
        .catch(error=>{
            this.setState({loading:false, purchasing:false});
        });
    }
    
    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let orderSummary=<OrderSummary 
        ingredients={this.state.ingredients} 
        cancelOrder={this.purchaseCancelHandler} 
        continueOrder={this.purchaseContinueHandler}
        price={this.state.totalPrice}
        />;
        if(this.state.loading){
            orderSummary=<Spinner />;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                 {orderSummary}  
                </Modal>
               <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    
                    ingAdded={this.addIng} 
                    ingRemoved={this.removeIng}
                    disabled={disabledInfo}  
                    price={this.state.totalPrice}  
                    purchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler}

                />
            </Aux>
        );
    };
}

export default withErrorHandler(BurgerBuilder,axios);