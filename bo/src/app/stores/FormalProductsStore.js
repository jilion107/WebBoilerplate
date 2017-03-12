/**
 * Created by jilion.chen on 3/12/2017.
 */
import alt from '../common/alt';
import FormalProductsActions from '../actions/FormalProductsActions';
import { message } from 'antd';

class FormalProductsStore {
    constructor() {
        this.bindActions(FormalProductsActions);
        this.state = {
            formalProducts: [],
            isLoad: false
        }
    }

    onGetAllTmpProductsSuccess(data) {
        this.setState({
            formalProducts: data,
            isLoad: true
        });
    }
}

export default alt.createStore(FormalProductsStore);