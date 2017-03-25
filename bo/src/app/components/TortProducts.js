/**
 * Created by jilion.chen on 3/13/2017.
 */
import React from 'react';
import TortProductsStore from '../stores/TortProductsStore';
import TortProductsActions from '../actions/TortProductsActions';
import moment from 'moment';
import { Form, Input, Button, Checkbox, DatePicker, Card } from 'antd';
import InnerPagination from '../common/InnerPagination';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const dateFormat = 'YYYY-MM-DD';

class TortProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = TortProductsStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        TortProductsStore.listen(this.onChange);
        TortProductsActions.getAllTortProducts(this.state.productRequest,this.state.offset,this.state.fetchSize);
        TortProductsActions.getTortProductsAmount(this.state.productRequest);
        TortProductsActions.getAllSizes();
        TortProductsActions.getAllColours();
    }

    componentWillUnmount() {
        TortProductsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    showSizeChange(current,pageSize) {
        let page = (current-1)*pageSize;
        TortProductsActions.showSizeChange(this.state.productRequest,page,pageSize);
    }

    handleSearch() {
        TortProductsActions.getAllTortProducts(this.state.productRequest,this.state.offset,this.state.fetchSize);
        TortProductsActions.getTortProductsAmount(this.state.productRequest);
    }

    handleDelete(index){
        let id = this.state.tortProducts[index]["id"];
        TortProductsActions.deleteTortProduct(index,id);
    }

    onSelectColours(colourName,event) {
        TortProductsActions.onSelectColours(event,colourName);
    }

    onSelectSizes(sizeName,event) {
        TortProductsActions.onSelectSizes(event,sizeName);
    }

    onUpdateIds(id,event){
        TortProductsActions.onUpdateIds(event,id);
    }

    updateScenarioWhat(index){
        let id = this.state.tortProducts[index]["id"];
        TortProductsActions.updateScenarioWhat(index,id);
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const buttonFormItemLayout = {
            wrapperCol: { span: 15, offset: 6 },
        };
        return (
            <div className="zhijian-tmpProducts">
                <Form layout="horizontal" >
                    <FormItem {...formItemLayout} label="品牌词：">
                        {getFieldDecorator('brand', {
                            rules: []
                            })(
                            <Input size="large"  onChange={TortProductsActions.onUpdateSearchBrand}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="ASIN：">
                        {getFieldDecorator('asin', {
                            rules: []
                            })(
                            <Input size="large"  onChange={TortProductsActions.onUpdateSearchAsin}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="分类：">
                        {getFieldDecorator('category', {
                            rules: []
                            })(
                            <Input size="large" onChange={TortProductsActions.onUpdateSearchCategory}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="颜色：">
                        <Checkbox className="zhijian-selectAll" onChange={TortProductsActions.onCheckAllColour} > 全选 </Checkbox>
                        {this.state.colourOptions.map((item) => {
                            return  <Checkbox onChange={this.onSelectColours.bind(this,item.colourName)} checked={item.checked}> {item.colourName}</Checkbox>
                        })}
                    </FormItem>
                    <FormItem {...formItemLayout} label="尺寸：">
                        <Checkbox className="zhijian-selectAll" onChange={TortProductsActions.onCheckAllSize} > 全选 </Checkbox>
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
                format={dateFormat}  onChange={TortProductsActions.onUpdateSearchRangeTime}
            />
            )}
            </FormItem>
                <FormItem {...buttonFormItemLayout}>
            <Checkbox onChange={TortProductsActions.onUpdateSearchScenarioWhat}>出单</Checkbox>
                <Button type="primary" htmlType="submit" className="zhijian-search" onClick={this.handleSearch.bind(this)}>搜索</Button>
                </FormItem>
                </Form>
                <div>
                <Form layout="inline" className="action-form">
                    <FormItem  className="checkbox">
                    {getFieldDecorator('selectAll')(
                <Checkbox onChange={TortProductsActions.onCheckAllProduct} >全选</Checkbox>
            )}
            </FormItem>
                <FormItem>
                已选择 {this.state.selectedTotal } 个
                </FormItem>
                <FormItem>
                共 {this.state.amount } 个
                </FormItem>

            </Form>
            </div>
            <div>
            <InnerPagination total={this.state.amount} onShowSizeChange={this.showSizeChange.bind(this)} onChange={this.showSizeChange.bind(this)}/>
        </div>
            <div>
            <ul>
            {this.state.tortProducts.map((item,index) => {
                const scenarioWhat = item.scenarioWhat == 1?"disabled":"";
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
            </div>
        );
    }

}

let TortProducts = Form.create()(TortProductsPage);
export default TortProducts;