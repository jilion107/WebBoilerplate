/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import ColorStore from '../stores/ColorStore';
import ColorActions from '../actions/ColorActions';

const FormItem = Form.Item;

class ColorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = ColorStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ColorStore.listen(this.onChange);
        ColorActions.getAllColors();
    }

    componentWillUnmount() {
        ColorStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd() {
        let { colors, colorName } = this.state;
        let color = ColorActions.addColor({ name: colorName });
        let newColor = {
            key: colors.length,
            id: {
                editable: false,
                value: color.id,
                changeable: false
            },
            colorName: {
                editable: false,
                value: color.name,
                changeable: true
            },
            createTime: {
                editable: false,
                value: color.createTime,
                changeable: false
            }
        };
        this.setState({
            colors: [...colors, newColor]
        });
    }

    handleUpdate(data) {
        let color = this.state.colors.find((item) => {
            return item.id === data.id.value;
        });
        color.name = data.colorName.value
        ColorActions.updateColor(color);
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
                colorName: {
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
        let colors = this.state.colors;
        let dataSource = this.createDataSource(colors);
        let columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: '10%'
            }, {
                title: '颜色',
                dataIndex: 'colorName',
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
                        <FormItem label="颜 色:">
                            {getFieldDecorator('colorName', {
                                rules: [{ required: true, message: '请输入颜色！'}]
                            })(
                                <Input size="large"  onChange={ColorActions.onUpdateColorName}/>
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

let Color = Form.create()(ColorPage);
export default Color;