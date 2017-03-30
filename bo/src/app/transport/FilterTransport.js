/**
 * Created by Jilion on 2017/3/11.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST }from '../common/Config';

class FilterTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllFilters() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/filters/',
            requestBody: {}
        });
    }

    updateFilter(filter) {
        return this.ajaxRequest({
            method: 'put',
            url: RESTAPI_HOST + '/api/filters/' + filter.id,
            requestBody: JSON.stringify(filter),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    addFilter(filter) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/filter',
            requestBody: JSON.stringify(filter),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    deleteFilter(filterId) {
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/filters/' + filterId,
            requestBody: {},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
	
    searchFilters(query) {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/filters?' + query.field + '=' + query.keyword
        });
    }	
}

export default FilterTransport;