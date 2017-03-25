/**
 * Created by jilion.chen on 3/12/2017.
 */
import alt from '../common/alt';
import FormalProductsActions from '../actions/FormalProductsActions';
import { message } from 'antd';
import $ from 'jquery';

class FormalProductsStore {
    constructor() {
        this.bindActions(FormalProductsActions);
        this.state = {
            formalProducts: [],
            sizeOptions:[],
            colourOptions:[],
            selectSizes:[],
            selectColours:[],
            amount:0,
            offset:0,
            fetchSize:10,
            productRequest:{
                userId:localStorage.getItem("loginUserId"),
                companyId:localStorage.getItem("loginCompanyId"),
                brand:'',
                asin:'',
                productTypeName:'',
                scenarioWhat:null,
                productSizes:[],
                productColours:[],
                startCreateTime:null,
                endCreateTime:null
            },
            exportDataRequest:{
                total:0,
                minQuantity:0,
                maxQuantity:0,
                beforeDays:0,
                prices:0,
                deliveryDays:0,
                productIds:[],
                productRequest:{}
            },
            formalProductIds:[],
            selectedTotal:0,
            checkAll:false,
            visible: false,
            modalVisible:false,
            defaultExportNumber:0,
            exportNumberDisabled:false,
            isLoad: false
        }
    }

    onLoadFormalProductsSuccess(data){
        this.setState({
            formalProducts: data[0],
            amount: data[1],
            colourOptions: data[2],
            sizeOptions: data[3],
            isLoad: true
        });
    }

    onLoadFormalProductsFail(data){
    }

    onGetAllFormalProductsSuccess(data) {
        this.setState({
            formalProducts: data,
            isLoad: true
        });
    }

    onGetFormalProductsAmountSuccess(data){
        this.setState({
            amount: data,
            isLoad: true
        });
    }
    onGetFormalProductsAmountFail(data){
        this.setState({
            amount: 0,
            isLoad: true
        });
    }
    onGetAllSizesSuccess(data){
        this.setState({
            sizeOptions: data,
            isLoad: true
        });
    }
    onGetAllSizesFail(data){

    }
    onGetAllColoursSuccess(data){
        this.setState({
            colourOptions: data,
            isLoad: true
        });
    }

    onGetAllColoursFail(){

    }

    onDeleteFormalProductSuccess(data){
        // message.info('删除成功. ');
        this.state.formalProducts.splice(data.index, 1);
    }
    onDeleteFormalProductFail(){
        //message.info('删除失败. ');
    }

    onUpdateSearchBrand(event) {
        this.state.productRequest.brand =  event.target.value;
    }
    onUpdateSearchAsin(event){
        this.state.productRequest.asin =  event.target.value;
    }
    onUpdateSearchCategory(event){
        this.state.productRequest.productTypeName =  event.target.value;
    }
    onUpdateSearchRangeTime(dates){
        if(dates[1]!=null){
            this.state.productRequest.startCreateTime =  dates[1][0];
            this.state.productRequest.endCreateTime =  dates[1][1];
        }
    }

    onUpdateIds(event,formalProductId) {
        for(let i=0;i<this.state.formalProducts.length;i++){
            if(this.state.formalProducts[i]["id"]==event[1]){
                this.state.formalProducts[i].checked=event[0].target.checked;
            }
        }
        if(event[0].target.checked){
            this.state.formalProductIds.push(event[1]);
        }else{
            for(let i=0;i<this.state.formalProductIds.length;i++){
                if(this.state.formalProductIds[i]==event[1]){
                    this.state.formalProductIds.splice(i,1);
                    break;
                }
            }
        }
        this.setState({selectedTotal:this.state.formalProductIds.length});
    }

    onModifyPageSize(page,pageSize){
        this.setState({ offset : page });
        this.setState({ fetchSize : pageSize });
    }

    onCheckAllProduct(event){
        this.setState({formalProductIds:[]});
        for(let i=0;i<this.state.formalProducts.length;i++){
            this.state.formalProducts[i].checked=event.target.checked;
            if(event.target.checked){
                this.state.formalProductIds.push( this.state.formalProducts[i]["id"]);
            }
        }

        this.setState({selectedTotal:this.state.formalProductIds.length,checkAll:event.target.checked});

        console.log("productIds: "+JSON.stringify(this.state.formalProductIds))
    }

    onCheckAllColour(event){
        this.setState({selectColours:[]});
        for(let i=0;i<this.state.colourOptions.length;i++){
            this.state.colourOptions[i].checked=event.target.checked;
            if(event.target.checked){
                this.state.selectColours.push( this.state.colourOptions[i]["colourName"]);
            }
        }
        this.state.productRequest.productColours = this.state.selectColours;
        console.log("AllColours: "+JSON.stringify(this.state.selectColours))
    }

    onCheckAllSize(event){
        this.setState({selectSizes:[]});
        for(let i=0;i<this.state.sizeOptions.length;i++){
            this.state.sizeOptions[i].checked=event.target.checked;
            if(event.target.checked){
                this.state.selectSizes.push( this.state.sizeOptions[i]["sizeName"]);
            }
        }
        this.state.productRequest.productSizes = this.state.selectSizes;
        console.log("AllSize: "+JSON.stringify(this.state.selectSizes))
    }

    onSelectColours(event,colourName) {
        for(let i=0;i<this.state.colourOptions.length;i++){
            if(this.state.colourOptions[i]["colourName"]==event[1]){
                this.state.colourOptions[i].checked=event[0].target.checked;
                break;
            }
        }
        if(event[0].target.checked){
            this.state.selectColours.push(event[1]);
        }else{
            for(let i=0;i<this.state.selectColours.length;i++){
                if(this.state.selectColours[i]==event[1]){
                    this.state.selectColours.splice(i,1);
                    break;
                }
            }
        }
        this.state.productRequest.productColours = this.state.selectColours;
        console.log("SelectCoulour: "+JSON.stringify(this.state.selectColours))

    }

    onSelectSizes(event,sizeName) {
        for(let i=0;i<this.state.sizeOptions.length;i++){
            if(this.state.sizeOptions[i]["sizeName"]==event[1]){
                this.state.sizeOptions[i].checked=event[0].target.checked;
                break;
            }
        }
        if(event[0].target.checked){
            this.state.selectSizes.push(event[1]);
        }else{
            for(let i=0;i<this.state.selectSizes.length;i++){
                if(this.state.selectSizes[i]==event[1]){
                    this.state.selectSizes.splice(i,1);
                    break;
                }
            }
        }

        this.state.productRequest.productSizes = this.state.selectSizes;
        console.log("SelectSize: "+JSON.stringify(this.state.selectSizes))
    }

    onUpdateSearchScenarioWhat(event){
        if(event.target.checked){
            this.state.productRequest.scenarioWhat=1;
        }else{
            this.state.productRequest.scenarioWhat=0;
        }
    }

    updateScenarioWhatSuccess(index){
        this.state.formalProducts[index].scenarioWhat=1;
    }
    updateScenarioWhatFail(index){

    }

    downloadFile(filePath, fileName){
        var aLink = document.createElement('a');
        aLink.download = fileName;
        aLink.href = filePath;
        aLink.click();
    }

    onExportDataSuccess(response){
        this.downloadFile("/bg.png", "test");
    }

    onSetExportDate(values){
        this.state.exportDataRequest.total = values.exportNumber;
        this.state.exportDataRequest.minQuantity = values.minQuantity;
        this.state.exportDataRequest.maxQuantity = values.maxQuantity;
        this.state.exportDataRequest.beforeDays = values.beforeDays;
        this.state.exportDataRequest.deliveryDays = values.deliveryDays;
        this.state.exportDataRequest.prices = values.prices;
        this.state.exportDataRequest.productIds = this.state.formalProductIds;
        this.state.exportDataRequest.productRequest = this.state.productRequest;
    }

}

export default alt.createStore(FormalProductsStore);