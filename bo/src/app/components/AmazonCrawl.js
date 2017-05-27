/**
 * Created by jilion.chen on 5/13/2017.
 */
import React from 'react';
import { Form, Input, Button, Spin} from 'antd';
import AmazonCrawlStore from '../stores/AmazonCrawlStore';
import AmazonCrawlActions from '../actions/AmazonCrawlActions';
import { message } from 'antd';

const FormItem = Form.Item;

class AmazonCrawlPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = AmazonCrawlStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AmazonCrawlStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AmazonCrawlStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleCrawl(e) {
        this.props.form.validateFields((err, values) => {
            if (err) {
                message.error('不能为空！');
                e.preventDefault();
            } else {
                AmazonCrawlActions.crawl(this.state.keyword);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={!this.state.isLoad}>
                <div>
                    <Form layout="inline">
                        <FormItem label="关键词:">
                            {getFieldDecorator('keyword', {
                                rules: [{ required: true, message: '请输入关键词！'}]
                            })(
                                <Input size="large"  onChange={AmazonCrawlActions.onUpdateKeyword}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={this.handleCrawl.bind(this)}>添加</Button>
                        </FormItem>
                    </Form>
                </div>
            </Spin>
        );
    }

}

let AmazonCrawl = Form.create()(AmazonCrawlPage);
export default AmazonCrawl;