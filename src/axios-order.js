import axios from 'axios';

const instance=axios.create(
    {
        baseURL:'https://burgerbuilder-b7bf1.firebaseio.com/'
    }
);

export default instance;