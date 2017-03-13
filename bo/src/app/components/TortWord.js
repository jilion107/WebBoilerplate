/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import TortWordsStore from '../stores/TortWordsStore';
import TortWordsActions from '../actions/TortWordsActions';

const FormItem = Form.Item;

class TortWordsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = TortWordsStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        TortWordsStore.listen(this.onChange);
        TortWordsActions.getAllTortWords();
    }

    componentWillUnmount() {
        TortWordsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd() {
        let { tortWords, tortWordName } = this.state;
        let tortWord = TortWordsActions.addTortWord({ name: tortWordName });
        let newTortWord = {
            key: tortWord.length,
            id: {
                editable: false,
                value: tortWord.id,
                changeable: false
            },
            tortWordsName: {
                editable: false,
                value: tortWord.name,
                changeable: true
            },
            createTime: {
                editable: false,
                value: tortWord.createTime,
                changeable: false
            }
        };
        this.setState({
            torts: [...tortWords, newTortWord]
        });
    }

    handleUpdate(data) {
        let tortWord = this.state.torts.find((item) => {
            return item.id === data.id.value;
        });
        tortWord.name = data.tortWordName.value
        TortWordsActions.updateTortWord(tortWord);
    }

    createDataSource(store) {
        return store.map((item, index) => {
            return {
                key: index,
                id: {
                    editable: false,
                    value: item.id,
                    changeable: false
                },
                tortWordName: {
                    editable: false,
                    value: item.name,
                    changeable: true
                },
                createTime: {
                    editable: false,
                    value: item.createTime,
                    changeable: false
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let tortWords = this.state.tortWords;
        let dataSource = this.createDataSource(tortWords);
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

        return ( this.state.isLoad ?
                <div>
                    <Form layout="inline" onSubmit={this.handleAdd.bind(this)}>
                        <FormItem label="侵权词:">
                            {getFieldDecorator('tortWordName', {
                                rules: [{ required: true, message: '请输入颜色！'}]
                            })(
                                <Input size="large"  onChange={TortWordsActions.onUpdateTortWordName}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">添加</Button>
                        </FormItem>
                    </Form>
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } callback={this.handleUpdate.bind(this)} fields={ 3 }/>
                </div> : null
        );
    }

}

let TortWords = Form.create()(TortWordsPage);
export default TortWords;