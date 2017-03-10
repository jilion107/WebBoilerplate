/**
 * Created by jilion.chen on 3/10/2017.
 */
import React from 'react';
import { Form, Select, Input, Button} from 'antd';

const FormItem = Form.Item;

class AddUserPage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleAdd() {
        return null;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form  onSubmit={this.handleAdd.bind(this)}>
                    <FormItem label="登录名">
                        {getFieldDecorator('loginName', {
                            rules: [{ required: true, message: '请输入登录名！'}]
                        })(
                            <Input size="large"  onChange={null}/>
                        )}
                    </FormItem>
                    <FormItem label="姓名">
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入姓名！'}]
                        })(
                            <Input size="large"  onChange={null}/>
                        )}
                    </FormItem>
                    <FormItem label="电话">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入电话！'}]
                        })(
                            <Input size="large"  onChange={null}/>
                        )}
                    </FormItem>
                    <FormItem label="公司">
                        {getFieldDecorator('companyId', {
                            rules: [{ required: true, message: '请选择公司！'}]
                        })(
                            <Select placeholder="选择公司">
                                <Option value="1">指间科技</Option>
                                <Option value="2">翼华科技</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="权限">
                        {getFieldDecorator('role', {
                            rules: [{ required: true, message: '请选择权限！'}]
                        })(
                            <Input size="large"  onChange={null}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

let AddUser = Form.create()(AddUserPage);
export default AddUser;