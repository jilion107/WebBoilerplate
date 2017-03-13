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
            'onUpdateTortWordName'
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

    updateTortWord(tortWord) {
        this.tortWordsInstance.updateTortWord(tortWord).then((response) => {
            this.updateTortWordSuccess(response);
        }, (response) => {
            this.updateTortWordFail(response);
        });
    }

    addTortWord(tortWord) {
        this.tortWordsInstance.addTortWord(tortWord).then((response) => {
            this.addTortWordSuccess(response);
        }, (response) => {
            this.addTortWordFail(response);
        });
    }
}

export default alt.createActions(TortWordsActions);