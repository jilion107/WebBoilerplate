/**
 * Created by Jilion on 2017/3/11.
 */
import Transport from '../common/Transport';

class FilterTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllFilters() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/filters',
            requestBody: {}
        });
    }

    updateFilter(filter) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/filters/' + filter.id,
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
            url: 'http://localhost:8080/api/filter',
            requestBody: JSON.stringify(filter),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default FilterTransport;