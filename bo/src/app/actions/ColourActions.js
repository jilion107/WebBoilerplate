/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import ColourTransport from '../transport/ColourTransport';
import _ from 'underscore';

class ColourActions {
    constructor() {
        this.generateActions(
            'getAllColoursSuccess',
            'getAllColoursFail',
            'updateColourSuccess',
            'updateColourFail',
            'updateColourName',
            'addColourSuccess',
            'addColourFail',
            'onUpdateColourName'
        );
        this.colourInstance = new ColourTransport();
    }

    getAllColours() {
        this.colourInstance.getAllColours().then((response) => {
            _.assign(response, history)
            this.getAllColoursSuccess(response);
        }, (response) => {
            this.getAllColoursFail(response);
        });
    }

    updateColour(colour) {
        this.colourInstance.updateColour(colour).then((response) => {
            this.updateColourSuccess(response);
        }, (response) => {
            this.updateColourFail(response);
        });
    }

    addColour(colour) {
        this.colourInstance.addColour(colour).then((response) => {
            this.addColourSuccess(response);
        }, (response) => {
            this.addColourFail(response);
        });
    }
}

export default alt.createActions(ColourActions);