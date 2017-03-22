/**
 * Created by jilion.chen on 3/12/2017.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class FormalProductsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllFormalProducts(productRequest,offet,fetchSize) {
        return this.ajaxRequest({
            method: 'post',
            dataType: 'json',
            url: RESTAPI_HOST + '/api/formal-products/list?offset='+offet+'&fetchSize='+fetchSize,
            requestBody:JSON.stringify(productRequest),
            headers: HEARDS
        });
    }

    getFormalProductsAmount(productRequest){
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/formal-products/count',
            requestBody:JSON.stringify(productRequest),
            headers: HEARDS
        });
    }

    deleteFormalProduct(formalProductId){
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/formal-products/'+formalProductId
        });
    }

    updateScenarioWhat(id){
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/formal-products/scenarioWhat/'+id
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

export default FormalProductsTransport;