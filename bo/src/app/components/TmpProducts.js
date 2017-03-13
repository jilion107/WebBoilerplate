/**
 * Created by jilion.chen on 3/8/2017.
 */
import React from 'react';
import TmpProductsStore from '../stores/TmpProductsStore';
import TmpProductsActions from '../actions/TmpProductsActions';
import moment from 'moment';
import { Form, Select, Input, Button, Checkbox, DatePicker, Card } from 'antd';
import InnerPagination from '../common/InnerPagination';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';

const all = 20;

class TmpProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            amount: 100,
            tmpProducts: [{
                img: 'bg.png',
                name: "Men's Online ",
                price: '50$',
                productId: 'FADAFADS13'
            },{
                img: 'bg.png',
                name: "WOW Warrior Sigil T ack",
                price: '50$',
                productId: 'FADAFADS13'
            },{
                img: 'bg.png',
                name: "es WOW Warrior Sigil ",
                price: '50$',
                productId: 'FADAFADS13'
            },{
                img: 'bg.png',
                name: "MeOW Warrior Sigil T Shirck",
                price: '50$',
                productId: 'FADAFADS13'
            },{
                img: 'bg.png',
                name: "MeWarrior Sigil T t Black",
                price: '50$',
                productId: 'FADAFADS13'
            },{
                img: 'bg.png',
                name: "Men's t Black",
                price: '50$',
                productId: 'FADAFADS13'
            },{
                img: 'bg.png',
                name: "M Warrior Sigil T Shirt Blak",
                price: '50$',
                productId: 'FADAFADS13'
            },{
                img: 'bg.png',
                name: "Men'sior Sigil T Shirtck",
                price: '50$',
                productId: 'FADAFADS13'
            },{
                img: 'bg.png',
                name: "M Sigil T Shirt Blackdddddddddddddddddddddddddddddd",
                price: '50$',
                productId: 'FADAFADS13'
            },{
                img: 'bg.png',
                name: "Men's Onlick",
                price: '50$',
                productId: 'FADAFADS13'
            }
            ]
        }
    }

    componentDidMount() {
        TmpProductsStore.listen(this.onChange);
        TmpProductsActions.getAllTmpProducts();
    }

    componentWillUnmount() {
        TmpProductsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSearch() {

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
        return (
            <div className="zhijian-tmpProducts">
                <Form layout="horizontal" onSubmit={this.handleSearch.bind(this)}>
                    <FormItem {...formItemLayout} label="品牌词：">
                        {getFieldDecorator('brand', {
                            rules: [{}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="ASIN：">
                        {getFieldDecorator('asin', {
                            rules: [{}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="分类：">
                        {getFieldDecorator('category', {
                            rules: [{}]
                        })(
                            <Input size="large" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="入库时间"
                    >
                        {getFieldDecorator('range-picker', rangeConfig)(
                            <RangePicker
                                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat}
                            />
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 3, offset: 17 }}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </FormItem>
                </Form>
                <div>
                    <Form layout="inline" className="action-form">
                        <FormItem  className="checkbox">
                            {getFieldDecorator('selectAll')(
                                <Checkbox>全选</Checkbox>
                            )}
                        </FormItem>
                        <FormItem>
                            已选择 {this.state.selected } 个
                        </FormItem>
                        <FormItem>
                            共 {this.state.amount } 个
                        </FormItem>
                        <FormItem className="buttons">
                            <Button type="primary">导入文件</Button>
                            <Button type="primary">导入出单文件</Button>
                            <Button type="primary">批量添加正式库</Button>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <InnerPagination total={this.state.amount} />
                </div>
                <div className="zhijian-clear"></div>
                <div>
                    <ul>
                        {this.state.tmpProducts.map((item) => {
                            return <li className="ant-col-6" key={item.name}>
                                <Card>
                                    <div>
                                        <img alt="example" width="100%" src="http://ecx.images-amazon.com/images/I/41qvM7u3E8L._SL233_.jpg" />
                                    </div>
                                    <div className="zhijan-productName">
                                        {item.name}
                                    </div>
                                    <div className="zhijian-price">
                                        <span>价格：{item.price}</span>
                                    </div>
                                    <div className="zhijian-productId">
                                        <span>{item.productId}</span>
                                    </div>
                                    <div>
                                        <Button type="primary" htmlType="submit" className="zhijian-button-margin">删除</Button>
                                        <Button type="primary" htmlType="submit" className="zhijian-button-margin">出单</Button>
                                        <Button type="primary" htmlType="submit" className="zhijian-button-margin">修改</Button>
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

let TmpProducts = Form.create()(TmpProductsPage);
export default TmpProducts;