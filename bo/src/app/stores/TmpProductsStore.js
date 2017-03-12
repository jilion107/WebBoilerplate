/**
 * Created by jilion.chen on 3/12/2017.
 */
import alt from '../common/alt';
import TmpProductsActions from '../actions/TmpProductsActions';
import { message } from 'antd';

class TmpProductsStore {
    constructor() {
        this.bindActions(TmpProductsActions);
        this.state = {
            tmpProducts: [],
            isLoad: false
        }
    }

    onGetAllTmpProductsSuccess(data) {
        this.setState({
            tmpProducts: data,
            isLoad: true
        });
    }
}

export default alt.createStore(TmpProductsStore);