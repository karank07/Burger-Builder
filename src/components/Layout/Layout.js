import React from 'react';
import Aux from '../../hoc/aux'
const layout=(props)=>(
    <Aux>
    <div>Toolbar,Sidebar,backdrop</div>
    <main>
        {props.children}
    </main>
    </Aux>
);

export default layout;