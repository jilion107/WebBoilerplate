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
            'onUpdateColourName',
            'deleteColourSuccess',
            'deleteColourFail'
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

    updateColour(colour, dataSource, isCancel) {
        if(isCancel) {
            this.updateColourSuccess({
                dataSource: dataSource,
                isCancel: isCancel
            });
        } else {
            this.colourInstance.updateColour(colour).then((response) => {
                if(response.result === "fail") {
                    this.updateColourFail(response.message);
                } else {
                    response = _.assign(response, {
                        dataSource: dataSource,
                        isCancel: isCancel
                    });
                    this.updateColourSuccess(response);
                }
            }, (response) => {
                this.updateColourFail(response);
            });
        }
    }

    addColour(colour) {
        this.colourInstance.addColour(colour).then((response) => {
            if(response.result === "fail") {
                this.addColourFail(response.message);
            } else {
                this.addColourSuccess(response);
            }
        }, (response) => {
            this.addColourFail(response);
        });
    }

    deleteColour(index, colourId) {
        this.colourInstance.deleteColour(colourId).then((response) => {
            if(response.result === "fail") {
                this.deleteColourFail(response.message);
            } else {
                response = { index: index };
                this.deleteColourSuccess(response);
            }
        }, (response) => {
            this.deleteColourFail(response);
        });
    }
}

export default alt.createActions(ColourActions);