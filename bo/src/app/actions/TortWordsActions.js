/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import TortWordsTransport from '../transport/TortWordsTransport';
import _ from 'underscore';

class TortWordsActions {
    constructor() {
        this.generateActions(
            'getAllTortWordsSuccess',
            'getAllTortWordsFail',
            'updateTortWordSuccess',
            'updateTortWordFail',
            'updateTortWordName',
            'addTortWordSuccess',
            'addTortWordFail',
            'onUpdateTortWordName',
            'deleteTortWordSuccess',
            'deleteTortWordFail'
        );
        this.tortWordsInstance = new TortWordsTransport();
    }

    getAllTortWords() {
        this.tortWordsInstance.getAllTortWords().then((response) => {
            _.assign(response, history)
            this.getAllTortWordsSuccess(response);
        }, (response) => {
            this.getAllTortWordsFail(response);
        });
    }

    updateTortWord(tortWord, dataSource, isCancel) {
        if(isCancel) {
            this.updateTortWordSuccess({
                dataSource: dataSource,
                isCancel: isCancel
            });
        } else {
            this.tortWordsInstance.updateTortWord(tortWord).then((response) => {
                if(response.result === "fail") {
                    this.updateTortWordFail(response.message);
                } else {
                    response = _.assign(response, {
                        dataSource: dataSource,
                        isCancel: isCancel
                    });
                    this.updateTortWordSuccess(response);
                }
            }, (response) => {
                this.updateTortWordFail(response);
            });
        }
    }

    addTortWord(tortWord) {
        this.tortWordsInstance.addTortWord(tortWord).then((response) => {
            if(response.result === "fail") {
                this.addTortWordFail(response.message);
            } else {
                this.addTortWordSuccess(response.tortWord);
            }
        }, (response) => {
            this.addTortWordFail(response);
        });
    }

    deleteTortWord(index, tortWordId) {
        this.tortWordsInstance.deleteTortWord(tortWordId).then((response) => {
            if(response.result === "fail") {
                this.deleteTortWordFail(response.message);
            } else {
                response = { index: index };
                this.deleteTortWordSuccess(response);
            }
        }, (response) => {
            this.deleteTortWordFail(response);
        });
    }
}

export default alt.createActions(TortWordsActions);