/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import ColourStore from '../stores/ColourStore';
import ColourActions from '../actions/ColourActions';
import { message } from 'antd';

const FormItem = Form.Item;

class ColourPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = ColourStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ColourStore.listen(this.onChange);
        ColourActions.getAllColours();
    }

    componentWillUnmount() {
        ColourStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd(e) {
        this.props.form.validateFields((err, values) => {
            if (err) {
                message.error('颜色名称不能为空！');
                e.preventDefault();
            } else {
                ColourActions.addColour({ colourName: this.state.colourName });
            }
        });
    }

    handleUpdate(data, index) {
        let rawColour = data[index];
        let newColour = {};
        let isCancel = false;
        Object.keys(rawColour).forEach((prop) => {
            if(prop !== "key") {
                newColour[prop] = rawColour[prop].value
                if(rawColour[prop].status === "cancel") {
                    isCancel = true;
                }
            }
        });
        ColourActions.updateColour(newColour, data, isCancel);
    }

    handleDelete(index){
        let colourId = this.state.dataSource[index]["id"].value;
        ColourActions.deleteColour(index, colourId);
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
                title: '颜色',
                dataIndex: 'colourName',
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
                        <FormItem label="颜 色:">
                            {getFieldDecorator('colourName', {
                                rules: [{ required: true, message: '请输入颜色！'}]
                            })(
                                <Input size="large"  onChange={ColourActions.onUpdateColourName}/>
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

let Colour = Form.create()(ColourPage);
export default Colour;