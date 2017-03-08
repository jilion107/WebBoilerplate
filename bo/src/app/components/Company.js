/**
 * Created by jilion.chen on 3/8/2017.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;

class CompanyPage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();
        LoginActions.signIn(this.state.username, this.state.password, history);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="公司名">
                    {getFieldDecorator('companyname', {
                        rules: [{ required: true, message: '请输入公司名！'}]
                    })(
                        <Input size="large"  onChange={null}/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">添加</Button>
                </FormItem>
            </Form>
        );
    }

}

let Company = Form.create()(CompanyPage);
export default Company;