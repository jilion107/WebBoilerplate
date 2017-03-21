/**
 * Created by jilion.chen on 3/17/2017.
 */
import React from 'react';
import { Form, Modal, Select } from 'antd'
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 15
    }
}

class AddToFormalModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal {...this.props.modalOpts}>
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="类别：">
                        {getFieldDecorator('categoryId', {
                            rules: [{ required: true, message: '请选择类别！'}]
                        })(
                            <Select placeholder="选择类别">
                                {this.props.selectOptions.categories}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(AddToFormalModal);

