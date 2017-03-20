/**
 * Created by jilion.chen on 3/12/2017.
 */
import Transport from '../common/Transport';

class FormalProductsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllFormalProducts(productRequest,offet,fetchSize) {
        return this.ajaxRequest({
            method: 'post',
            dataType: 'json',
            url: 'http://localhost:8080/api/formal-products/list?offset='+offet+'&fetchSize='+fetchSize,
            requestBody:JSON.stringify(productRequest),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    getFormalProductsAmount(productRequest){
        return this.ajaxRequest({
            method:'post',
            url:'http://localhost:8080/api/formal-products/count',
            requestBody:JSON.stringify(productRequest),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    deleteFormalProduct(formalProductId){
        return this.ajaxRequest({
            method:'delete',
            url:'http://localhost:8080/api/formal-products/'+formalProductId
        });
    }

    updateScenarioWhat(id){
        return this.ajaxRequest({
            method:'get',
            url:'http://localhost:8080/api/formal-products/scenarioWhat/'+id
        });
    }

    getAllSizes() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/sizes',
            requestBody: {}
        });
    }

    getAllColours() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/colours',
            requestBody: {}
        });
    }


}

export default FormalProductsTransport;