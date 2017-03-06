/**
 * Created by jilion.chen on 2/28/2017.
 */
import $ from 'jquery';

class Transport {
    constructor() {
    }

    ajaxRequest(reqeust) {
          return new Promise( function(resolve, reject) {
            $.ajax({
                type: reqeust.method,
                url: reqeust.url,
                data: reqeust.requestBody
            })
            .done((data) => {
                resolve(data);
            })
            .fail((error) => {
                reject(error);
            });
        });
    }
}

export default Transport;