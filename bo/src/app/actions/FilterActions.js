/**
 * Created by Jilion on 2017/3/11.
 */
import alt from '../common/alt';
import FilterTransport from '../transport/FilterTransport';
import _ from 'underscore';

class FilterActions {
    constructor() {
        this.generateActions(
            'getAllFiltersSuccess',
            'getAllFiltersFail',
            'updateFilterSuccess',
            'updateFilterFail',
            'updateFilterName',
            'addFilterSuccess',
            'addFilterFail',
            'onUpdateFilterName'
        );
        this.filterInstance = new FilterTransport();
    }

    getAllFilters() {
        this.filterInstance.getAllFilters().then((response) => {
            _.assign(response, history)
            this.getAllFiltersSuccess(response);
        }, (response) => {
            this.getAllFiltersFail(response);
        });
    }

    updateFilter(filter) {
        this.filterInstance.updateFilter(filter).then((response) => {
            this.updateFilterSuccess(response);
        }, (response) => {
            this.updateFilterFail(response);
        });
    }

    addFilter(filter) {
        this.filterInstance.addFilter(filter).then((response) => {
            this.addFilterSuccess(response);
        }, (response) => {
            this.addFilterFail(response);
        });
    }
}

export default alt.createActions(FilterActions);