/**
 * Created by jilion.chen on 2/28/2017.
 */
import $ from 'jquery';

class Trans {
    constructor() {
        this.requests = {};// for cache implement in the future
    }

    ajaxRequest(reqeust) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: reqeust.method,
                url: reqeust.url,
                data: reqeust.requestBody
            })
            .done((data) => {
                resolve(data.message);
            })
            .fail((jqxhr) => {
                reject(jqxhr.responseJSON.message);
            });
        });
    }
}

export default Trans;