/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import ColorTransport from '../transport/ColorTransport';
import _ from 'underscore';

class ColorActions {
    constructor() {
        this.generateActions(
            'getAllColorsSuccess',
            'getAllColorsFail',
            'updateColorSuccess',
            'updateColorFail',
            'updateColorName',
            'addColorSuccess',
            'addColorFail',
            'onUpdateColorName'
        );
        this.colorInstance = new ColorTransport();
    }

    getAllColors() {
        this.colorInstance.getAllColors().then((response) => {
            _.assign(response, history)
            this.getAllColorsSuccess(response);
        }, (response) => {
            this.getAllColorsFail(response);
        });
    }

    updateColor(color) {
        this.colorInstance.updateColor(color).then((response) => {
            this.updateColorSuccess(response);
        }, (response) => {
            this.updateColorFail(response);
        });
    }

    addColor(color) {
        this.colorInstance.addColor(color).then((response) => {
            this.addColorSuccess(response);
        }, (response) => {
            this.addColorFail(response);
        });
    }
}

export default alt.createActions(ColorActions);