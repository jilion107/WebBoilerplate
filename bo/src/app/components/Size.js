/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import SizeStore from '../stores/SizeStore';
import SizeActions from '../actions/SizeActions';
import { message } from 'antd';

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
        this.props.form.validateFields((err, values) => {
            if (err) {
                message.error('尺寸名称不能为空！');
                e.preventDefault();
            } else {
                SizeActions.addSize({ sizeName: this.state.sizeName });
            }
        });
    }

    handleUpdate(data, index) {
        let rawSize = data[index];
        let newSize = {};
        let isCancel = false;
        Object.keys(rawSize).forEach((prop) => {
            if(prop !== "key") {
                newSize[prop] = rawSize[prop].value
                if(rawSize[prop].status === "cancel") {
                    isCancel = true;
                }
            }
        });
        SizeActions.updateSize(newSize, data, isCancel);
    }

    handleDelete(index){
        let sizeId = this.state.dataSource[index]["id"].value;
        SizeActions.deleteSize(index, sizeId);
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
                    <Form layout="inline">
                        <FormItem label="尺 寸:">
                            {getFieldDecorator('sizeName', {
                                rules: [{ required: true, message: '请输入尺寸！'}]
                            })(
                                <Input size="large"  onChange={SizeActions.onUpdateSizeName}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={this.handleAdd.bind(this)}>添加</Button>
                        </FormItem>
                    </Form>
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } updateHandler={this.handleUpdate.bind(this)} deleteHandler={this.handleDelete.bind(this)} fields={ 3 }/>
                </div> : null
        );
    }

}

let Size = Form.create()(SizePage);
export default Size;