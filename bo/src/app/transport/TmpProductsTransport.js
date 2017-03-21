/**
 * Created by jilion.chen on 3/12/2017.
 */
import Transport from '../common/Transport';

class TmpProductsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllTmpProducts(productRequest,offet,fetchSize) {
        return this.ajaxRequest({
            method: 'post',
            dataType: 'json',
            url: 'http://localhost:8080/api/tmp-products/list?offset='+offet+'&fetchSize='+fetchSize,
            requestBody:JSON.stringify(productRequest),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    getTmpProductsAmount(productRequest){
        return this.ajaxRequest({
           method:'post',
            url:'http://localhost:8080/api/tmp-products/count',
            requestBody:JSON.stringify(productRequest),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    deleteTmpProduct(tmpProductId){
        return this.ajaxRequest({
            method:'delete',
            url:'http://localhost:8080/api/tmp-products/'+tmpProductId
        });
    }

    addToFormal(productTypeId,tmpProductId){
        return this.ajaxRequest({
            method:'get',
            url:'http://localhost:8080/api/add-to-formal-products/'+productTypeId+'?tmpProductId='+tmpProductId
        });
    }

    addToFormalBatch(productsIdRequest,productTypeId){
        return this.ajaxRequest({
            method:'post',
            url:'http://localhost:8080/api/formal-products/batch/'+productTypeId,
            requestBody:JSON.stringify(productsIdRequest),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

}

export default TmpProductsTransport;