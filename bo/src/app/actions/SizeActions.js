/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import SizeTransport from '../transport/SizeTransport';
import _ from 'underscore';

class SizeActions {
    constructor() {
        this.generateActions(
            'getAllSizesSuccess',
            'getAllSizesFail',
            'updateSizeSuccess',
            'updateSizeFail',
            'updateSizeName',
            'addSizeSuccess',
            'addSizeFail',
            'onUpdateSizeName'
        );
        this.sizeInstance = new SizeTransport();
    }

    getAllSizes() {
        this.sizeInstance.getAllSizes().then((response) => {
            _.assign(response, history)
            this.getAllSizesSuccess(response);
        }, (response) => {
            this.getAllSizesFail(response);
        });
    }

    updateSize(size) {
        this.sizeInstance.updateSize(size).then((response) => {
            this.updateSizeSuccess(response);
        }, (response) => {
            this.updateSizeFail(response);
        });
    }

    addSize(size) {
        this.sizeInstance.addSize(size).then((response) => {
            this.addSizeSuccess(response);
        }, (response) => {
            this.addSizeFail(response);
        });
    }
}

export default alt.createActions(SizeActions);