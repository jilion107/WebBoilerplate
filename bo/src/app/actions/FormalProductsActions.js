/**
 * Created by jilion.chen on 3/12/2017.
 */
import alt from '../common/alt';
import FormalProductsTransport from '../transport/FormalProductsTransport';
import _ from 'underscore';

class FormalProductsActions {
    constructor() {
        this.generateActions(
            'getAllFormalProductsSuccess',
            'getAllFormalProductsFail',
        );
        this.formalProductsInstance = new FormalProductsTransport();
    }

    getAllFormalProducts() {
        this.formalProductsInstance.getAllFormalProducts().then((response) => {
            _.assign(response, history)
            this.getAllFormalProductsSuccess(response);
        }, (response) => {
            this.getAllFormalProductsFail(response);
        });
    }
}

export default alt.createActions(FormalProductsActions);