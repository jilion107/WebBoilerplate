/**
 * Created by jilion.chen on 3/12/2017.
 */
import React from 'react';
import FormalProductsStore from '../stores/FormalProductsStore';
import FormalProductsActions from '../actions/FormalProductsActions';
import moment from 'moment';
import { Form, Select, Input, Button, Checkbox, DatePicker, Card, Modal, InputNumber } from 'antd';
import InnerPagination from '../common/InnerPagination';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const dateFormat = 'YYYY-MM-DD';

class FormalProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = FormalProductsStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        FormalProductsStore.listen(this.onChange);
        FormalProductsActions.loadFormalProducts(this.state.productRequest,this.state.offset,this.state.fetchSize);
    }

    componentWillUnmount() {
        FormalProductsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    showSizeChange(current,pageSize) {
        let page = (current-1)*pageSize;
        FormalProductsActions.showSizeChange(this.state.productRequest,page,pageSize);
    }

    handleSearch() {
        FormalProductsActions.getAllFormalProducts(this.state.productRequest,this.state.offset,this.state.fetchSize);
        FormalProductsActions.getFormalProductsAmount(this.state.productRequest);
    }

    handleDelete(index){
        let id = this.state.formalProducts[index]["id"];
        FormalProductsActions.deleteFormalProduct(index,id);
    }

    onSelectColours(colourName,event) {
        FormalProductsActions.onSelectColours(event,colourName);
    }

    onSelectSizes(sizeName,event) {
        FormalProductsActions.onSelectSizes(event,sizeName);
    }

    onUpdateIds(id,event){
        FormalProductsActions.onUpdateIds(event,id);
    }

    updateScenarioWhat(index){
        let id = this.state.formalProducts[index]["id"];
        FormalProductsActions.updateScenarioWhat(index,id);
    }
    exportDate(){
        this.props.form.validateFields((err, values) => {
            if(err) {
                return;
            } else {
                FormalProductsActions.onSetExportDate(values);
                FormalProductsActions.exportDate(this.state.exportDataRequest);
            }
        });
    }

    onClose(e){
        this.setState({
            modalVisible: false
        });
        e.preventDefault();
    }

    onShowModel() {
        this.setState({
            modalVisible: true
             });
        this.state.defaultExportNumber =  this.state.formalProductIds.length>0? this.state.formalProductIds.length:this.state.amount;
        this.state.exportNumberDisabled = this.state.formalProductIds.length>0? false:true;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const rangeConfig = {
            rules: [],
        };
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const buttonFormItemLayout = {
            wrapperCol: { span: 15, offset: 6 },
        };
        const modalOpts = {
            title: '汇出',
            visible: this.state.modalVisible,
            onOk: this.exportDate.bind(this),
            onCancel: this.onClose.bind(this),
            maskClosable: true
        }

        const isValid = localStorage.getItem("loginRole")=='公司操作员';

        return (
            <div className="zhijian-tmpProducts">
                <Form layout="horizontal" >
                    <FormItem {...formItemLayout} label="品牌词：">
                        {getFieldDecorator('brand', {
                            rules: []
                        })(
                            <Input size="large"  onChange={FormalProductsActions.onUpdateSearchBrand}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="ASIN：">
                        {getFieldDecorator('asin', {
                            rules: []
                        })(
                            <Input size="large"  onChange={FormalProductsActions.onUpdateSearchAsin}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="分类：">
                        {getFieldDecorator('category', {
                            rules: []
                        })(
                            <Input size="large" onChange={FormalProductsActions.onUpdateSearchCategory}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="颜色：">
                        <Checkbox className="zhijian-selectAll" onChange={FormalProductsActions.onCheckAllColour} > 全选 </Checkbox>
                        {this.state.colourOptions.map((item) => {
                            return  <Checkbox onChange={this.onSelectColours.bind(this,item.colourName)} checked={item.checked}> {item.colourName}</Checkbox>
                        })}
                    </FormItem>
                    <FormItem {...formItemLayout} label="尺寸：">
                        <Checkbox className="zhijian-selectAll" onChange={FormalProductsActions.onCheckAllSize} > 全选 </Checkbox>
                            {this.state.sizeOptions.map((item) => {
                                return <Checkbox onChange={this.onSelectSizes.bind(this,item.sizeName)} checked={item.checked}>{item.sizeName}</Checkbox>
                            })}

                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="入库时间"
                    >
                        {getFieldDecorator('range-picker', rangeConfig)(
                            <RangePicker
                                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat}  onChange={FormalProductsActions.onUpdateSearchRangeTime}
                            />
                        )}
                    </FormItem>
                    <FormItem {...buttonFormItemLayout}>
                        <Checkbox onChange={FormalProductsActions.onUpdateSearchScenarioWhat}>出单</Checkbox>
                        <Button type="primary" htmlType="submit" className="zhijian-search" onClick={this.handleSearch.bind(this)}>搜索</Button>
                    </FormItem>
                </Form>
                <div>
                    <Form layout="inline" className="action-form">
                        <FormItem  className="checkbox">
                            {getFieldDecorator('selectAll')(
                                <Checkbox onChange={FormalProductsActions.onCheckAllProduct} >全选</Checkbox>
                            )}
                        </FormItem>
                        <FormItem>
                            已选择 {this.state.selectedTotal } 个
                        </FormItem>
                        <FormItem>
                            共 {this.state.amount } 个
                        </FormItem>
                        <FormItem className="buttons" disabled = {isValid}>
                            <Button type="primary" onClick={this.onShowModel.bind(this)}>汇出</Button>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <InnerPagination total={this.state.amount} onShowSizeChange={this.showSizeChange.bind(this)} onChange={this.showSizeChange.bind(this)}/>
                </div>
                <div>
                    <ul>
                        {this.state.formalProducts.map((item,index) => {
                            const scenarioWhat = item.scenarioWhat == 1?"disabled":"";
                            return <li className="ant-col-6" key={index}>
                                <Card>
                                    <div className="zhijian-checkbox">
                                        <Checkbox onChange={this.onUpdateIds.bind(this,item.id)} checked={item.checked}/>
                                    </div>
                                    <div>
                                        <img alt="example" width="100%" src={item.productThumbnail} />
                                    </div>
                                    <div className="zhijan-productName">
                                        {item.productName}
                                    </div>
                                    <div className="zhijian-category">
                                        <span>分类：{item.productTypeName}</span>
                                    </div>
                                    <div className="zhijian-brand">
                                        <span>品牌：{item.brand}</span>
                                    </div>
                                    <div className="zhijian-size">
                                        <span>尺寸：{item.productSize}</span>
                                    </div>
                                    <div className="zhijian-colour">
                                        <span>颜色：{item.productColour}</span>
                                    </div>
                                    <div className="zhijian-price">
                                        <span>评论数：{item.commentNumber}</span>
                                    </div>
                                    <div className="zhijian-productId">
                                        <span>{item.asin}</span>
                                    </div>
                                    <div>
                                        <Button type="primary" htmlType="submit" className="zhijian-button-margin" onClick={this.handleDelete.bind(this,index)}>删除</Button>
                                        <Button type="primary" disabled={scenarioWhat} htmlType="submit" className="zhijian-button-margin" onClick={this.updateScenarioWhat.bind(this,index)}>出单</Button>

                                    </div>
                                </Card>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="zhijian-clear"></div>

            <Modal {...modalOpts}>
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="汇出条数：">
                        {getFieldDecorator('exportNumber', { initialValue: this.state.defaultExportNumber },{
                            rules: [{ required: true, message: '汇出条数必填！'}]
                        })(
                            <InputNumber min={1}  disabled={this.state.exportNumberDisabled}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="库存：">
                        {getFieldDecorator('minQuantity', {
                                rules: [{ required: true, message: '库存最小值必填！'}]
                            })(
                            <InputNumber min={1}/>
                        )}
                         --
                         {getFieldDecorator('maxQuantity', {
                                rules: [{ required: true, message: '库存最大值必填！'}]
                            })(
                            <InputNumber min={1}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="不可重复汇出天数：">
                        {getFieldDecorator('beforeDays', {
                        rules: [{ required: true, message: '不可重复汇出天数必填！'}]
                        })(
                            <InputNumber min={1}/>
                         )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="价格：">
                        {getFieldDecorator('prices', {
                        rules: [{regexp:"/^(0|([1-9]\d{0,9}(\.\d{1,2})?))$/", required: true, message: '价格必填！' }]
                        })(
                             <Input />
                         )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="发货天数：">
                        {getFieldDecorator('deliveryDays', {
                        rules: [{ required: true, message: '发货天数必填！'}]
                            })(
                            <InputNumber min={1}/>
                        )}
                    </FormItem>

                </Form>
            </Modal>

            </div>
        );
    }

}

let FormalProducts = Form.create()(FormalProductsPage);
export default FormalProducts;