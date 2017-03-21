/**
 * Created by jilion.chen on 3/12/2017.
 */
import alt from '../common/alt';
import TmpProductsTransport from '../transport/TmpProductsTransport';
import _ from 'underscore';

class TmpProductsActions {
    constructor() {
        this.generateActions(
            'getAllTmpProductsSuccess',
            'getAllTmpProductsFail',
            'getTmpProductsAmountSuccess',
            'getTmpProductsAmountFail',
            'deleteTmpProductSuccess',
            'deleteTmpProductFail',
            'addToFormalSuccess',
            'addToFormalFail',
            'addToFormalBatchSuccess',
            'addToFormalBatchFail',
            'onUpdateSearchBrand',
            'onUpdateSearchAsin',
            'onUpdateSearchCategory',
            'onUpdateSearchRangeTime',
            'searchSuccess',
            'searchFail',
            'onUpdateIds',
            'onModifyPageSize',
            'onModifyPageNumber',
            'onCheckAll',
            'getAllCategoriesSuccess',
            'getAllCategoriesFail'

        );
        this.tmpProductsInstance = new TmpProductsTransport();
    }

    getAllTmpProducts(productRequest,offet,fetchSize) {
        this.tmpProductsInstance.getAllTmpProducts(productRequest,offet,fetchSize).then((response) => {
            this.getAllTmpProductsSuccess(response);
        }, (response) => {
            this.getAllTmpProductsFail(response);
        });
    }

    getTmpProductsAmount(productRequest){
        this.tmpProductsInstance.getTmpProductsAmount(productRequest).then((response)=> {
            this.getTmpProductsAmountSuccess(response);
        },(response)=>{
            this.getTmpProductsAmountFail(response);
        });
    }

    deleteTmpProduct(index,tmpProductId){
        this.tmpProductsInstance.deleteTmpProduct(tmpProductId).then((response)=> {
            response = { index: index };
            this.deleteTmpProductSuccess(response);
        },(response)=>{
            this.deleteTmpProductFail(response);
        });
    }

    addToFormal(tmpProductId,productTypeId){
        this.tmpProductsInstance.addToFormal(productTypeId,tmpProductId).then((response)=> {
            this.addToFormalSuccess(response);
        },(response)=>{
            this.addToFormalFail(response);
        });
    }

    addToFormalBatch(productIds,productTypeId){
        let productsIdRequest = {"productIds":productIds};
        this.tmpProductsInstance.addToFormalBatch(productsIdRequest,productTypeId).then((response)=> {
            this.addToFormalBatchSuccess(response);
        },(response)=>{
            this.addToFormalBatchFail(response);
        });
    }

    showSizeChange(productRequest,page,pageSize){
        this.onModifyPageSize(page,pageSize);
        this.getAllTmpProducts(productRequest,page,pageSize);
    }

    getAllCategories(){
        this.tmpProductsInstance.getAllCategories().then((response) => {
            this.getAllCategoriesSuccess(response);
        }, (response) => {
            this.getAllCategoriesFail(response);
        });
    }

}

export default alt.createActions(TmpProductsActions);