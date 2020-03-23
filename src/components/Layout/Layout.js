import React,{Component} from 'react';
import Aux from '../../hoc/aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        show:false
    }
    sideDrawerCloseHandler=()=>{
        this.setState({show:false});
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {show:!prevState.show};
        });
    }
    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.show} 
                    closed={this.sideDrawerCloseHandler} 
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;