import React, {Component} from 'react';
import axios from '../../axios-order';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res=>{
            const Porder=[];
            for(let k in res.data){
                Porder.push({
                    ...res.data[k],
                    id:k
                });
            }
            this.setState({orders:Porder, loading:false})
        })
        .catch(err=>{
            this.setState({loading:false})
        })
    }
    render(){
        return(
            <div>
              {this.state.orders.map(order=>(
                  <Order key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}/>
              ))}
              
            </div>
        );
    }
}
export default withErrorHandler(Orders,axios);