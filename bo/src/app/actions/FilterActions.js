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
            'onUpdateSearchName',
            'addFilterSuccess',
            'addFilterFail',
            'deleteFilterSuccess',
            'deleteFilterFail'
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

    updateFilter(filter, dataSource, isCancel) {
        if(isCancel) {
            this.updateFilterSuccess({
                dataSource: dataSource,
                isCancel: isCancel
            });
        } else {
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
    }

    addFilter(filter) {
        this.filterInstance.addFilter(filter).then((response) => {
            if(response.result === "fail") {
                this.addFilterFail(response.message);
            } else {
                this.addFilterSuccess(response);
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