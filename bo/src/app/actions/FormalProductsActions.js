/**
 * Created by jilion.chen on 3/12/2017.
 */
import alt from '../common/alt';
import FormalProductsTransport from '../transport/FormalProductsTransport';
import _ from 'underscore';

class FormalProductsActions {
    constructor() {
        this.generateActions(
            'getAllFormalProductsSuccess',
            'getAllFormalProductsFail',
            'getFormalProductsAmountSuccess',
            'getFormalProductsAmountFail',
            'getAllSizesSuccess',
            'getAllSizesFail',
            'getAllColoursSuccess',
            'getAllColoursFail',
            'deleteFormalProductSuccess',
            'deleteFormalProductFail',
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
            'onSetExportRequest',
            'onSetExportDate',
            'onExportDataSuccess'
        );
        this.formalProductsInstance = new FormalProductsTransport();
    }

    getAllFormalProducts(productRequest,offet,fetchSize) {
        this.formalProductsInstance.getAllFormalProducts(productRequest,offet,fetchSize).then((response) => {
            this.getAllFormalProductsSuccess(response);
        }, (response) => {
            this.getAllFormalProductsFail(response);
        });
    }
    
    getFormalProductsAmount(productRequest){
        this.formalProductsInstance.getFormalProductsAmount(productRequest).then((response)=> {
            this.getFormalProductsAmountSuccess(response);
        },(response)=>{
            this.getFormalProductsAmountFail(response);
        });
    }

    deleteFormalProduct(index,formalProductId){
        this.formalProductsInstance.deleteFormalProduct(formalProductId).then((response)=> {
            response = { index: index };
            this.deleteFormalProductSuccess(response);
        },(response)=>{
            this.deleteFormalProductFail(response);
        });
    }

    showSizeChange(productRequest,page,pageSize){
        this.onModifyPageSize(page,pageSize);
        this.getAllFormalProducts(productRequest,page,pageSize);
    }

    getAllSizes(){
        this.formalProductsInstance.getAllSizes().then((response)=> {
            this.getAllSizesSuccess(response);
        },(response)=>{
            this.getAllSizesFail(response);
        });
    }

    getAllColours(){
        this.formalProductsInstance.getAllColours().then((response)=> {
            this.getAllColoursSuccess(response);
        },(response)=>{
            this.getAllColoursFail(response);
        });
    }

    updateScenarioWhat(index,id){
        this.formalProductsInstance.updateScenarioWhat(id).then((response)=> {
            this.updateScenarioWhatSuccess(index);
        },(response)=>{
            this.updateScenarioWhatFail(index);
        });
    }

    exportDate(exportDataRequest){
        debugger;
        this.formalProductsInstance.exportData(exportDataRequest).then((response)=> {
            this.onExportDataSuccess(response);
        },(response)=>{
            this.updateScenarioWhatFail(response);
        });

    }

}

export default alt.createActions(FormalProductsActions);