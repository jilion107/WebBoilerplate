/**
 * Created by jilion.chen on 3/13/2017.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class TortProductsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllTortProducts(productRequest,offet,fetchSize) {
        return this.ajaxRequest({
            method: 'post',
            dataType: 'json',
            url: RESTAPI_HOST + '/api/tort-products/list?offset='+offet+'&fetchSize='+fetchSize,
            requestBody:JSON.stringify(productRequest),
            headers: HEARDS
        });
    }

    getTortProductsAmount(productRequest){
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/tort-products/count',
            requestBody:JSON.stringify(productRequest),
            headers: HEARDS
        });
    }

    deleteTortProduct(tortProductId){
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/tort-products/'+tortProductId
        });
    }

    updateScenarioWhat(id){
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/tort-products/scenarioWhat/'+id
        });
    }

    getAllSizes() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/sizes',
            requestBody: {}
        });
    }

    getAllColours() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/colours',
            requestBody: {}
        });
    }
}

export default TortProductsTransport;