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
            'onUpdateSizeName',
            'deleteSizeSuccess',
            'deleteSizeFail'
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

    updateSize(size, dataSource, isCancel) {
        if(isCancel) {
            this.updateSizeSuccess({
                dataSource: dataSource,
                isCancel: isCancel
            });
        } else {
            this.sizeInstance.updateSize(size).then((response) => {
                if(response.result === "fail") {
                    this.updateSizeFail(response.message);
                } else {
                    response = _.assign(response, {
                        dataSource: dataSource,
                        isCancel: isCancel
                    });
                    this.updateSizeSuccess(response);
                }
            }, (response) => {
                this.updateSizeFail(response);
            });
        }
    }

    addSize(size) {
        this.sizeInstance.addSize(size).then((response) => {
            if(response.result === "fail") {
                this.addSizeFail(response.message);
            } else {
                this.addSizeSuccess(response.size);
            }
        }, (response) => {
            this.addSizeFail(response);
        });
    }

    deleteSize(index, sizeId) {
        this.sizeInstance.deleteSize(sizeId).then((response) => {
            if(response.result === "fail") {
                this.deleteSizeFail(response.message);
            } else {
                response = { index: index };
                this.deleteSizeSuccess(response);
            }
        }, (response) => {
            this.deleteSizeFail(response);
        });
    }
}

export default alt.createActions(SizeActions);