/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import TortTransport from '../transport/TortTransport';
import _ from 'underscore';

class TortActions {
    constructor() {
        this.generateActions(
            'getAllTortsSuccess',
            'getAllTortsFail',
            'updateTortSuccess',
            'updateTortFail',
            'updateTortName',
            'addTortSuccess',
            'addTortFail',
            'onUpdateTortName'
        );
        this.tortInstance = new TortTransport();
    }

    getAllTorts() {
        this.tortInstance.getAllTorts().then((response) => {
            _.assign(response, history)
            this.getAllTortsSuccess(response);
        }, (response) => {
            this.getAllTortsFail(response);
        });
    }

    updateTort(tort) {
        this.tortInstance.updateTort(tort).then((response) => {
            this.updateTortSuccess(response);
        }, (response) => {
            this.updateTortFail(response);
        });
    }

    addTort(tort) {
        this.tortInstance.addTort(tort).then((response) => {
            this.addTortSuccess(response);
        }, (response) => {
            this.addTortFail(response);
        });
    }
}

export default alt.createActions(TortActions);