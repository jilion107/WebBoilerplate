/**
 * Created by Jilion on 2017/3/11.
 */
import alt from '../common/alt';
import FilterTransport from '../transport/FilterTransport';
import SizeTransport from '../transport/SizeTransport';
import CategoryTransport from '../transport/CategoryTransport';
import ColourTransport from '../transport/ColourTransport';
import _ from 'underscore';

class FilterActions {
    constructor() {
        this.generateActions(
            'getAllFiltersSuccess',
            'getAllFiltersFail',
            'updateFilterSuccess',
            'updateFilterFail',
            'onUpdateSearchName',
            'addFilterSuccess',
            'addFilterFail',
            'deleteFilterSuccess',
            'deleteFilterFail',
            'addFail'
        );
        this.filterInstance = new FilterTransport();
        this.sizeInstance = new SizeTransport();
        this.categoryInstance = new CategoryTransport();
        this.colourInstance = new ColourTransport();
    }

    getAllFilters() {
        let getSizes = this.sizeInstance.getAllSizes();
        let getCategories = this.categoryInstance.getAllCategories();
        let getColours = this.colourInstance.getAllColours();
        let getFilters = this.filterInstance.getAllFilters();
        Promise.all([getSizes, getCategories, getColours, getFilters]).then((response) => {
            this.getAllFiltersSuccess(response);
        }, (response) => {
            this.getAllFiltersFail(response);
        });
    }

    updateFilter(filter) {
        this.filterInstance.updateFilter(filter).then((response) => {
            if(response.result === "fail") {
                this.updateFilterFail(response.message);
            } else {
                this.updateFilterSuccess(response.filter);
            }
        }, (response) => {
            this.updateFilterFail(response);
        });
    }

    addFilter(filter) {
        this.filterInstance.addFilter(filter).then((response) => {
            if(response.result === "fail") {
                this.addFilterFail(response.message);
            } else {
                this.addFilterSuccess(response.filter);
            }
        }, (response) => {
            this.addFilterFail(response);
        });
    }

    deleteFilter(index, filterId) {
        this.filterInstance.deleteFilter(filterId).then((response) => {
            if(response.result === "fail") {
                this.deleteFilterFail(response.message);
            } else {
                response = { index: index };
                this.deleteFilterSuccess(response);
            }
        }, (response) => {
            this.deleteFilterFail(response);
        });
    }
}

export default alt.createActions(FilterActions);