/**
 * Created by jilion.chen on 3/12/2017.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class TmpProductsTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllTmpProducts(productRequest,offet,fetchSize) {
        return this.ajaxRequest({
            method: 'post',
            dataType: 'json',
            url: RESTAPI_HOST + '/api/tmp-products/list?offset='+offet+'&fetchSize='+fetchSize,
            requestBody:JSON.stringify(productRequest),
            headers: HEARDS
        });
    }

    getTmpProductsAmount(productRequest){
        return this.ajaxRequest({
           method: 'post',
            url: RESTAPI_HOST + '/api/tmp-products/count',
            requestBody: JSON.stringify(productRequest),
            headers: HEARDS
        });
    }

    deleteTmpProduct(tmpProductId){
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/tmp-products/'+tmpProductId
        });
    }

    addToFormal(productTypeId,tmpProductId){
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/add-to-formal-products/'+productTypeId+'?tmpProductId='+tmpProductId
        });
    }

    addToFormalBatch(productsIdRequest,productTypeId){
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/formal-products/batch/'+productTypeId,
            requestBody: JSON.stringify(productsIdRequest),
            headers: HEARDS
        });
    }

    getAllCategories(){
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/categories'
        });
    }

}

export default TmpProductsTransport;