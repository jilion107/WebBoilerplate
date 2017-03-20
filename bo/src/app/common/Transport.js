/**
 * Created by jilion.chen on 2/28/2017.
 */
import $ from 'jquery';
import Util from '../common/Util';

class Transport {
    constructor() {
    }

    ajaxRequest(request) {
          request.headers = request.headers || {'Content-Type': 'multipart/form-data'};
          request.headers.Authorization = this.getAccessToken();
          return new Promise( (resolve, reject) => {
            $.ajax({
                type: request.method,
                url: request.url,
                data: request.requestBody,
                headers: request.headers
            })
            .done((data) => {
                resolve(data);
            })
            .fail((error) => {
                Util.changLocation("/login")
                reject(error);
            });
        });
    }

    getAccessToken() {
        return localStorage.getItem("accessToken");
    }
}

export default Transport;