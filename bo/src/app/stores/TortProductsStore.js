/**
 * Created by jilion.chen on 3/13/2017.
 */
import alt from '../common/alt';
import TortProductsActions from '../actions/TortProductsActions';
import { message } from 'antd';

class TortProductsStore {
    constructor() {
        this.bindActions(TortProductsActions);
        this.state = {
            tortProducts: [],
            isLoad: false
        }
    }

    onGetAllTortProductsSuccess(data) {
        this.setState({
            tortProducts: data,
            isLoad: true
        });
    }
}

export default alt.createStore(TortProductsStore);