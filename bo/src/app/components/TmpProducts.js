/**
 * Created by jilion.chen on 3/8/2017.
 */
import React from 'react';
import TmpProductsStore from '../stores/TmpProductsStore';
import TmpProductsActions from '../actions/TmpProductsActions';
import moment from 'moment';
import { Form, Select, Input, Button, Checkbox, DatePicker, Card, Modal, Upload, Icon  } from 'antd';
import { message } from 'antd';
import InnerPagination from '../common/InnerPagination';
import { RESTAPI_HOST } from '../common/Config'
import Util from '../common/Util';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';

const uploadProps0 = {
    action: RESTAPI_HOST + "/api/upload?scenarioWhat=0",
    headers: {
        Authorization : localStorage.getItem("accessToken")
    },
    showUploadList: false
}

const uploadProps1 = {
    action: RESTAPI_HOST + "/api/upload?scenarioWhat=1",
    headers: {
        Authorization : localStorage.getItem("accessToken")
    }
}

class TmpProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = TmpProductsStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        TmpProductsStore.listen(this.onChange);
        TmpProductsActions.getAllTmpProducts(this.state.productRequest,this.state.offset,this.state.fetchSize);
        TmpProductsActions.getTmpProductsAmount(this.state.productRequest);
        TmpProductsActions.getAllCategories();
    }

    componentWillUnmount() {
        TmpProductsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }


    handleSearch() {
        TmpProductsActions.getAllTmpProducts(this.state.productRequest,this.state.offset,this.state.fetchSize);
        TmpProductsActions.getTmpProductsAmount(this.state.productRequest);
    }

    handleDelete(index){
        let tmpProductId = this.state.tmpProducts[index]["id"];
        TmpProductsActions.deleteTmpProduct(index,tmpProductId);
    }
    handleAddToFormal(){
        this.props.form.validateFields((err, values) => {
            if(err) {
                return;
            } else {
                let tmpProductId = this.state.tmpProducts[this.state.productIndex]["id"];
                TmpProductsActions.addToFormal(tmpProductId,values.categoryId);
            }
        });

    }
    handleAddToFormalBatch(){
        this.props.form.validateFields((err, values) => {
            if(err) {
                return;
            } else {
                TmpProductsActions.addToFormalBatch(this.state.tmpProductIds, values.categoryId);
            }
        });


    }

    onUpdateIds(id,event){
        TmpProductsActions.onUpdateIds(event,id);
    }

    showSizeChange(current,pageSize) {
        let page = (current-1)*pageSize;
        TmpProductsActions.showSizeChange(this.state.productRequest,page,pageSize);
    }

    uploadFile() {

    }

    onClose(e) {
        this.setState({
            modalVisible: false
        });
        e.preventDefault();
    }

    onShowModel(index) {
        this.setState({
            modalVisible: true,
            productIndex:index,
            modalType:'single'
        });
    }

    onShowModelBatch() {
        this.setState({
            modalVisible: true,
            modalType:'Batch'
        });
    }

    onFileUpload(info) {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功`);
            setTimeout(function() {
                Util.changLocation("/home/tmpProducts")
            }, 500);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    }

    render() {
        const categoryOptions = this.state.categories && this.state.categories.map(category => <Option key={category.id} value={category.id}>{category.categoryName}</Option>);
        const { getFieldDecorator } = this.props.form;
        const rangeConfig = {
            rules: [],
        };
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const modalOpts = {
            title: '添加正式库',
            visible: this.state.modalVisible,
            onOk: this.state.modalType == "Batch" ? this.handleAddToFormalBatch.bind(this):this.handleAddToFormal.bind(this),
            onCancel: this.onClose.bind(this),
            maskClosable: true
        }
        let deleter = this.handleDelete.bind(this);
        let { filterInfo } = this.state;
        return (
            <div className="zhijian-tmpProducts">
                <Form layout="horizontal" >
                    <FormItem {...formItemLayout} label="品牌词：">
                        {getFieldDecorator('brand', {
                            rules: []
                        })(
                            <Input size="large"   onChange={TmpProductsActions.onUpdateSearchBrand}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="ASIN：">
                        {getFieldDecorator('asin', {
                            rules: [{}]
                        })(
                            <Input size="large"  onChange={TmpProductsActions.onUpdateSearchAsin}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="分类：">
                        {getFieldDecorator('category', {
                            rules: [{}]
                        })(
                            <Input size="large" onChange={TmpProductsActions.onUpdateSearchCategory}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="入库时间"
                    >
                        {getFieldDecorator('range-picker', rangeConfig)(
                            <RangePicker
                                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat} onChange={TmpProductsActions.onUpdateSearchRangeTime}
                            />
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 3, offset: 17 }}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)} >搜索</Button>
                    </FormItem>
                </Form>
                <div>
                    <Form layout="inline" className="action-form">
                        <FormItem  className="checkbox">
                            {getFieldDecorator('selectAll')(
                                 <Checkbox onChange={TmpProductsActions.onCheckAll} checked={this.state.checkAll}>全选</Checkbox>
                            )}
                        </FormItem>
                        <FormItem>
                            已选择 {this.state.selectedTotal } 个
                        </FormItem>
                        <FormItem>
                            共 {this.state.amount } 个
                        </FormItem>
                        <FormItem className="buttons">
                            <Button type="primary" onClick={this.onShowModelBatch.bind(this)} >批量添加正式库</Button>
                            <Upload name="file" onChange={this.onFileUpload.bind(this)} {...uploadProps1}>
                                <Button>
                                    <Icon type="upload" />导入出单文件
                                </Button>
                            </Upload>
                            <Upload name="file" onChange={this.onFileUpload.bind(this)} {...uploadProps0}>
                                <Button>
                                    <Icon type="upload" />导入文件
                                </Button>
                            </Upload>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <InnerPagination total={this.state.amount}  onShowSizeChange={this.showSizeChange.bind(this)} onChange={this.showSizeChange.bind(this)}/>
                </div>
                <div className="zhijian-clear"></div>
                <div>
                    <ul>
                        {this.state.tmpProducts.map((item,index) => {
                            return <li className="ant-col-6" key={index}>
                                <Card>
                                    <div>
                                        <Checkbox onChange={this.onUpdateIds.bind(this,item.id)} checked={item.checked}/>
                                    </div>
                                    <div>
                                        <img alt="example" width="100%" src={item.productThumbnail} />
                                    </div>
                                    <div className="zhijan-productName">
                                        {item.productName}
                                    </div>
                                    <div className="zhijian-price">
                                        <span>评论数：{item.commentNumber}</span>
                                    </div>
                                    <div className="zhijian-productId">
                                        <span>{item.asin}</span>
                                    </div>
                                    <div>
                                        <Button type="primary" htmlType="submit" className="zhijian-button-margin" onClick={this.handleDelete.bind(this,index)}>删除</Button>
                                        <Button type="primary" htmlType="submit" className="zhijian-button-margin" onClick={this.onShowModel.bind(this,index)}>添加正式库</Button>
                                    </div>
                                </Card>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="zhijian-clear"></div>

            <Modal {...modalOpts}>
                <Form layout="horizontal">
                        <FormItem {...formItemLayout} label="类别：">
                            {getFieldDecorator('categoryId', {
                                rules: [{ required: true, message: '请选择类别！'}]
                                })(
                                    <Select placeholder="选择类别">
                                        {categoryOptions}
                                    </Select>
                                   )
                            }
                        </FormItem>
                </Form>
            </Modal>

            </div>
        );
    }
}

let TmpProducts = Form.create()(TmpProductsPage);
export default TmpProducts;