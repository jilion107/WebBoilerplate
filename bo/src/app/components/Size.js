/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import SizeStore from '../stores/SizeStore';
import SizeActions from '../actions/SizeActions';

const FormItem = Form.Item;

class SizePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = SizeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        SizeStore.listen(this.onChange);
        SizeActions.getAllSizes();
    }

    componentWillUnmount() {
        SizeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd() {
        let { sizes, sizeName } = this.state;
        let size = SizeActions.addSize({ name: sizeName });
        let newSize = {
            key: sizes.length,
            id: {
                editable: false,
                value: size.id,
                changeable: false
            },
            sizeName: {
                editable: false,
                value: size.name,
                changeable: true
            },
            createTime: {
                editable: false,
                value: size.createTime,
                changeable: false
            }
        };
        this.setState({
            sizes: [...sizes, newSize]
        });
    }

    handleUpdate(data) {
        let size = this.state.sizes.find((item) => {
            return item.id === data.id.value;
        });
        size.name = data.sizeName.value
        SizeActions.updateSize(size);
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
                sizeName: {
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
        let sizes = this.state.sizes;
        let dataSource = this.createDataSource(sizes);
        let columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: '10%'
            }, {
                title: '尺寸',
                dataIndex: 'sizeName',
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
                        <FormItem label="尺 寸:">
                            {getFieldDecorator('sizeName', {
                                rules: [{ required: true, message: '请输入尺寸！'}]
                            })(
                                <Input size="large"  onChange={SizeActions.onUpdateSizeName}/>
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

let Size = Form.create()(SizePage);
export default Size;