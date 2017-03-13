/**
 * Created by jilion.chen on 3/13/2017.
 */
import React from 'react';
import { Form, Select, Input, Button, Checkbox} from 'antd';
import FilterStore from '../stores/FilterStore';
import FilterActions from '../actions/FilterActions';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const sizeOptions = [
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
    { label: 'XXL', value: 'xxl' },
];
const colourOptions = [
    { label: '白色', value: 'white' },
    { label: '黑色', value: 'black' },
    { label: '黄色', value: 'yellow' },
    { label: '绿色', value: 'green' },
    { label: '蓝色', value: 'blue' },
];

class AddFilterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = FilterStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        FilterStore.listen(this.onChange);
    }

    componentWillUnmount() {
        FilterActions.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    onColorChange() {

    }

    onSizeChange() {

    }

    handleAdd() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        return (
            <div className="zhijian-addFilter">
                <Form layout="horizontal" onSubmit={this.handleAdd.bind(this)}>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="分类：">
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: '请选择分类！'}]
                        })(
                            <Select placeholder="选择分类">
                                <Option value="1">超级管理员</Option>
                                <Option value="2">管理员</Option>
                                <Option value="3">普通用户</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="颜色：">
                        <Checkbox className="zhijian-selectAll"> 全选 </Checkbox>
                        <CheckboxGroup options={colourOptions} defaultValue={['white']} onChange={this.onColorChange.bind(this)} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="尺寸：">
                        <Checkbox className="zhijian-selectAll"> 全选 </Checkbox>
                        <CheckboxGroup options={sizeOptions} defaultValue={['s']} onChange={this.onSizeChange.bind(this)} />
                    </FormItem>
                    <FormItem wrapperCol={{ span: 3, offset: 17 }}>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

let AddFilter = Form.create()(AddFilterPage);
export default AddFilter;