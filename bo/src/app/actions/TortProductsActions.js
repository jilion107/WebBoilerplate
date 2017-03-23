/**
 * Created by jilion.chen on 3/13/2017.
 */
import alt from '../common/alt';
import TortProductsTransport from '../transport/TortProductsTransport';
import _ from 'underscore';

class TortProductsActions {
    constructor() {
        this.generateActions(
            'getAllTortProductsSuccess',
            'getAllTortProductsFail',
            'getTortProductsAmountSuccess',
            'getTortProductsAmountFail',
            'getAllSizesSuccess',
            'getAllSizesFail',
            'getAllColoursSuccess',
            'getAllColoursFail',
            'deleteTortProductSuccess',
            'deleteTortProductFail',
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
            'onSelectColours',
            'onSelectSizes',
            'onCheckAllSize',
            'onCheckAllColour',
            'onCheckAllProduct',
            'onUpdateSearchScenarioWhat',
            'updateScenarioWhatSuccess',
            'updateScenarioWhatFail',
        );
        this.tortProductsInstance = new TortProductsTransport();
    }

    getAllTortProducts(productRequest,offet,fetchSize) {
        this.tortProductsInstance.getAllTortProducts(productRequest,offet,fetchSize).then((response) => {
            this.getAllTortProductsSuccess(response);
        }, (response) => {
            this.getAllTortProductsFail(response);
        });
    }

    getTortProductsAmount(productRequest){
        this.tortProductsInstance.getTortProductsAmount(productRequest).then((response)=> {
            this.getTortProductsAmountSuccess(response);
        },(response)=>{
            this.getTortProductsAmountFail(response);
        });
    }

    deleteTortProduct(index,tortProductId){
        this.tortProductsInstance.deleteTortProduct(tortProductId).then((response)=> {
            response = { index: index };
            this.deleteTortProductSuccess(response);
        },(response)=>{
            this.deleteTortProductFail(response);
        });
    }

    showSizeChange(productRequest,page,pageSize){
        this.onModifyPageSize(page,pageSize);
        this.getAllTortProducts(productRequest,page,pageSize);
    }

    getAllSizes(){
        this.tortProductsInstance.getAllSizes().then((response)=> {
            this.getAllSizesSuccess(response);
        },(response)=>{
            this.getAllSizesFail(response);
        });
    }

    getAllColours(){
        this.tortProductsInstance.getAllColours().then((response)=> {
            this.getAllColoursSuccess(response);
        },(response)=>{
            this.getAllColoursFail(response);
        });
    }

    updateScenarioWhat(index,id){
        this.tortProductsInstance.updateScenarioWhat(id).then((response)=> {
            this.updateScenarioWhatSuccess(index);
        },(response)=>{
            this.updateScenarioWhatFail(index);
        });
    }
}

export default alt.createActions(TortProductsActions);