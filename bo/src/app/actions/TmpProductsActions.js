/**
 * Created by jilion.chen on 3/12/2017.
 */
import alt from '../common/alt';
import TmpProductsTransport from '../transport/TmpProductsTransport';
import _ from 'underscore';

class TmpProductsActions {
    constructor() {
        this.generateActions(
            'getAllTmpProductsSuccess',
            'getAllTmpProductsFail',
        );
        this.tmpProductsInstance = new TmpProductsTransport();
    }

    getAllTmpProducts() {
        this.tmpProductsInstance.getAllTmpProducts().then((response) => {
            _.assign(response, history)
            this.getAllTmpProductsSuccess(response);
        }, (response) => {
            this.getAllTmpProductsFail(response);
        });
    }
}

export default alt.createActions(TmpProductsActions);