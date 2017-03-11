/**
 * Created by jilion.chen on 3/8/2017.
 */
import React from 'react';
import moment from 'moment';
import { Form, Select, Input, Button, Checkbox, DatePicker } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

class TmpProductsPage extends React.Component {
    constructor(props) {
        super(pros);
    }

    handleSearch() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return (
            <div>
                <Form layout="horizontal" onSubmit={this.handleSearch.bind(this)}>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="品牌词：">
                        {getFieldDecorator('brand', {
                            rules: [{}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="ASIN：">
                        {getFieldDecorator('asin', {
                            rules: [{}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="分类：">
                        {getFieldDecorator('category', {
                            rules: [{}]
                        })(
                            <Input size="large" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="RangePicker"
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
            </div>
        );
    }
}

let TmpProducts = Form.create()(TmpProductsPage);
export default TmpProducts;