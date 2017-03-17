/**
 * Created by jilion.chen on 3/17/2017.
 */
import React from 'react';
import { Form, Modal } from 'antd'
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 15
    }
}

class FilterModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal {...this.props.modalOpts}>
                <Form horizontal>
                    <FormItem {...formItemLayout} label="类别：">
                        {getFieldDecorator('categoryId', {
                            rules: [{ required: true, message: '请选择类别！'}]
                        })(
                            <Select placeholder="选择类别">
                                {this.props.selectOptions.categories}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="颜色：">
                        {getFieldDecorator('colourId', {
                            rules: [{ required: true, message: '请选择颜色！'}]
                        })(
                            <Select placeholder="选择颜色">
                                {this.props.selectOptions.colours}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="尺寸：">
                        {getFieldDecorator('sizeId', {
                            rules: [{ required: true, message: '请选择尺寸！'}]
                        })(
                            <Select placeholder="选择尺寸">
                                {this.props.selectOptions.sizes}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(FilterModal);

