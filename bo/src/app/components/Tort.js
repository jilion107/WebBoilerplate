/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import TortStore from '../stores/TortStore';
import TortActions from '../actions/TortActions';

const FormItem = Form.Item;

class TortPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = TortStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        TortStore.listen(this.onChange);
        TortActions.getAllTorts();
    }

    componentWillUnmount() {
        TortStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd() {
        let { torts, tortName } = this.state;
        let tort = TortActions.addTort({ name: tortName });
        let newTort = {
            key: torts.length,
            id: {
                editable: false,
                value: tort.id,
                changeable: false
            },
            tortName: {
                editable: false,
                value: tort.name,
                changeable: true
            },
            createTime: {
                editable: false,
                value: tort.createTime,
                changeable: false
            }
        };
        this.setState({
            torts: [...torts, newTort]
        });
    }

    handleUpdate(data) {
        let tort = this.state.torts.find((item) => {
            return item.id === data.id.value;
        });
        tort.name = data.tortName.value
        TortActions.updateTort(tort);
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
                tortName: {
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
        let torts = this.state.torts;
        let dataSource = this.createDataSource(torts);
        let columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: '10%'
            }, {
                title: '侵权词',
                dataIndex: 'tortName',
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
                            {getFieldDecorator('tortName', {
                                rules: [{ required: true, message: '请输入颜色！'}]
                            })(
                                <Input size="large"  onChange={TortActions.onUpdateTortName}/>
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

let Tort = Form.create()(TortPage);
export default Tort;