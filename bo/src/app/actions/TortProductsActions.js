/**
 * Created by jilion.chen on 3/13/2017.
 */
import alt from '../common/alt';
import TortProductsTransport from '../transport/TortProductsTransport';
import _ from 'underscore';

class TortProductsActions {
    constructor() {
        this.generateActions(
            'getAllTortProductsSuccess',
            'getAllTortProductsFail',
        );
        this.tortProductsInstance = new TortProductsTransport();
    }

    getAllTortProducts() {
        this.tortProductsInstance.getAllTortProducts().then((response) => {
            _.assign(response, history)
            this.getAllTortProductsSuccess(response);
        }, (response) => {
            this.getAllTortProductsFail(response);
        });
    }
}

export default alt.createActions(TortProductsActions);