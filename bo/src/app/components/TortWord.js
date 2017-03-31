/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Spin, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import TortWordsStore from '../stores/TortWordsStore';
import TortWordsActions from '../actions/TortWordsActions';
import { message } from 'antd';

const FormItem = Form.Item;

class TortWordsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = TortWordsStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoad: false
        });
        TortWordsStore.listen(this.onChange);
        TortWordsActions.getAllTortWords();
    }

    componentWillUnmount() {
        TortWordsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd(e) {
        this.props.form.validateFields((err, values) => {
            if (err) {
                message.error('侵权词名称不能为空！');
                e.preventDefault();
            } else {
                TortWordsActions.addTortWord({ tortWordName: this.state.tortWordName });
            }
        });
    }

    handleUpdate(data, index) {
        let rawTortWord = data[index];
        let newTortWord = {};
        let isCancel = false;
        Object.keys(rawTortWord).forEach((prop) => {
            if(prop !== "key") {
                newTortWord[prop] = rawTortWord[prop].value
                if(rawTortWord[prop].status === "cancel") {
                    isCancel = true;
                }
            }
        });
        TortWordsActions.updateTortWord(newTortWord, data, isCancel);
    }

    handleDelete(index){
        let tortWordId = this.state.dataSource[index]["id"].value;
        TortWordsActions.deleteTortWord(index, tortWordId);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let dataSource = this.state.dataSource;
        let columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: '10%'
            }, {
                title: '侵权词',
                dataIndex: 'tortWordName',
                width: '30%'
            }, {
                title: '创建时间',
                dataIndex: 'createTime',
                width: '30%'
            }, {
                title: '操作',
                dataIndex: 'operation'
            }
        ];

        return (
            <Spin spinning={!this.state.isLoad}>
                <div>
                    <Form layout="inline">
                        <FormItem label="侵权词:">
                            {getFieldDecorator('tortWordName', {
                                rules: [{ required: true, message: '请输入侵权词！'}]
                            })(
                                <Input size="large"  onChange={TortWordsActions.onUpdateTortWordName}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={this.handleAdd.bind(this)}>添加</Button>
                        </FormItem>
                    </Form>
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } updateHandler={this.handleUpdate.bind(this)} deleteHandler={this.handleDelete.bind(this)} fields={ 3 }/>
                </div>
            </Spin>
        );
    }

}

let TortWords = Form.create()(TortWordsPage);
export default TortWords;