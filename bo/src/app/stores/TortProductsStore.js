/**
 * Created by jilion.chen on 3/13/2017.
 */
import alt from '../common/alt';
import TortProductsActions from '../actions/TortProductsActions';
import { message } from 'antd';

class TortProductsStore {
    constructor() {
        this.bindActions(TortProductsActions);
        this.state = {
            tortProducts: [],
            sizeOptions:[],
            colourOptions:[],
            selectSizes:[],
            selectColours:[],
            amount:0,
            offset:0,
            fetchSize:10,
            productRequest:{
                brand:'',
                asin:'',
                productTypeName:'',
                scenarioWhat:null,
                productSizes:[],
                productColours:[],
                startCreateTime:null,
                endCreateTime:null
            },
            tortProductIds:[],
            selectedTotal:0,
            checkAll:false,
            visible: false,
            modalVisible:false,
            isLoad: false
        }
    }

    onGetAllTortProductsSuccess(data) {
        this.setState({
            tortProducts: data,
            isLoad: true
        });
    }

    onGetTortProductsAmountSuccess(data){
        this.setState({
            amount: data,
            isLoad: true
        });
    }
    onGetTortProductsAmountFail(data){
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

    onDeleteTortProductSuccess(data){
        // message.info('删除成功. ');
        this.state.tortProducts.splice(data.index, 1);
    }
    onDeleteTortProductFail(){
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

    onUpdateIds(event,tortProductId) {
        for(let i=0;i<this.state.tortProducts.length;i++){
            if(this.state.tortProducts[i]["id"]==event[1]){
                this.state.tortProducts[i].checked=event[0].target.checked;
            }
        }
        if(event[0].target.checked){
            this.state.tortProductIds.push(event[1]);
        }else{
            for(let i=0;i<this.state.tortProductIds.length;i++){
                if(this.state.tortProductIds[i]==event[1]){
                    this.state.tortProductIds.splice(i,1);
                    break;
                }
            }
        }
        this.setState({selectedTotal:this.state.tortProductIds.length});
    }

    onModifyPageSize(page,pageSize){
        this.setState({ offset : page });
        this.setState({ fetchSize : pageSize });
    }

    onCheckAllProduct(event){
        this.setState({tortProductIds:[]});
        for(let i=0;i<this.state.tortProducts.length;i++){
            this.state.tortProducts[i].checked=event.target.checked;
            if(event.target.checked){
                this.state.tortProductIds.push( this.state.tortProducts[i]["id"]);
            }
        }

        this.setState({selectedTotal:this.state.tortProductIds.length,checkAll:event.target.checked});

        console.log("productIds: "+JSON.stringify(this.state.tortProductIds))
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
        this.state.tortProducts[index].scenarioWhat=1;
    }
    updateScenarioWhatFail(index){

    }

}

export default alt.createStore(TortProductsStore);