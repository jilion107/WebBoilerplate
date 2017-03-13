/**
 * Created by jilion.chen on 3/13/2017.
 */
import React from 'react';
import { Form, Input, Button} from 'antd';
import FormalProductsStore from '../stores/FormalProductsStore';
import FormalProductsActions from '../actions/FormalProductsActions';

const FormItem = Form.Item;

class FormalRemitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        FormalProductsStore.listen(this.onChange);
        FormalProductsActions.getAllFormalProducts();
    }

    componentWillUnmount() {
        FormalProductsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleRemit() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="zhijian-remit">
                <Form layout="horizontal" onSubmit={this.handleRemit.bind(this)}>
                    <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="汇出条数：">
                        {getFieldDecorator('remitAmount', {
                            rules: [{}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="库存：">
                        {getFieldDecorator('inventory', {
                            rules: [{}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="不可重复汇出天数：">
                        {getFieldDecorator('unRemitDays', {
                            rules: [{}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="价格：">
                        {getFieldDecorator('price', {
                            rules: [{}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="发货天数：">
                        {getFieldDecorator('shipDays', {
                            rules: [{}]
                        })(
                            <Input size="large"  />
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ span: 3, offset: 18 }}>
                        <Button type="primary" htmlType="submit">汇出</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }

}

let FormalRemit = Form.create()(FormalRemitPage);
export default FormalRemit;