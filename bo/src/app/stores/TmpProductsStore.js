/**
 * Created by jilion.chen on 3/12/2017.
 */
import alt from '../common/alt';
import TmpProductsActions from '../actions/TmpProductsActions';
import { message } from 'antd';
import { DEFAULTPAGESIZE } from '../common/Config';

class TmpProductsStore {
    constructor() {
        this.bindActions(TmpProductsActions);
        this.state = {
            tmpProducts: [],
            categories: [],
            amount:0,
            offset:0,
            fetchSize:DEFAULTPAGESIZE,
            productRequest:{
                userId:localStorage.getItem("loginUserId"),
                companyId:localStorage.getItem("loginCompanyId"),
                brand:'',
                asin:'',
                productTypeName:'',
                startCreateTime:null,
                endCreateTime:null
            },
            productIndex:null,
            tmpProductIds:[],
            selectedTotal:0,
            checkAll:false,
            visible: false,
            modalType:null,
            isLoad: false,
			isLoading: false
        }
    }

    onLoadTmpProductsSuccess(data){
        this.setState({
            tmpProducts: data[0],
            amount: data[1],
            categories: data[2],
            isLoad: true
        });
    }

    onLoadTmpProductsFail(data){
    }


    onGetAllTmpProductsSuccess(data) {
        this.setState({
            tmpProducts: data,
            checkAll:false,
            isLoad: true
        });
    }

    onGetTmpProductsAmountSuccess(data){
        this.setState({
            amount: data,
            isLoad: true
        });
    }
    onGetTmpProductsAmountFail(data){
        this.setState({
            amount: 0,
            isLoad: true
        });
    }
    onDeleteTmpProductSuccess(data){
       // message.info('删除成功. ');
        this.state.tmpProducts.splice(data.index, 1);
    }
    onDeleteTmpProductFail(){
        //message.info('删除失败. ');
    }
    addToFormalSuccess(data){
        //message.info('添加成功. ');
        this.state.tmpProducts.splice(data.index, 1);
        this.setState({modalVisible: false});
    }
    addToFormalFail(data){
        //message.info('添加失败. ');
    }

    addToFormalBatchSuccess(){
        let idsLength = this.state.tmpProductIds.length;
        for(let i=0;i<idsLength;i++){
            for(let j=0;j<this.state.tmpProducts.length;j++){
                if(this.state.tmpProductIds[i] == this.state.tmpProducts[j]["id"]){
                    this.state.tmpProducts.splice(j,1);
                    break;
                }
            }
        }

        this.setState({tmpProductIds:[], modalVisible: false});

    }

    addToFormalBatchFail(){

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

    onUpdateIds(event,tmpProductId) {
        for(let i=0;i<this.state.tmpProducts.length;i++){
            if(this.state.tmpProducts[i]["id"]==event[1]){
                this.state.tmpProducts[i].checked=event[0].target.checked;
            }
        }
        if(event[0].target.checked){
            this.state.tmpProductIds.push(event[1]);
        }else{
            for(let i=0;i<this.state.tmpProductIds.length;i++){
                if(this.state.tmpProductIds[i]==event[1]){
                    this.state.tmpProductIds.splice(i,1);
                    break;
                }
            }
        }
        this.setState({selectedTotal:this.state.tmpProductIds.length});
    }

    onModifyPageSize(page,pageSize){
        this.setState({ offset : page });
        this.setState({ fetchSize : pageSize });
    }

    onCheckAll(event){
        this.setState({tmpProductIds:[]});
        for(let i=0;i<this.state.tmpProducts.length;i++){
            this.state.tmpProducts[i].checked=event.target.checked;
            if(event.target.checked){
                this.state.tmpProductIds.push( this.state.tmpProducts[i]["id"]);
            }
        }

        this.setState({selectedTotal:this.state.tmpProductIds.length,checkAll:event.target.checked});
    }

    getAllCategoriesSuccess(data){
        this.setState({categories:data});
    }

    getAllCategoriesFail(data){

    }


}

export default alt.createStore(TmpProductsStore);