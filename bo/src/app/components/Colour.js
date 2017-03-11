/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import ColourStore from '../stores/ColourStore';
import ColourActions from '../actions/ColourActions';

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

    handleAdd() {
        let { colours, colourName } = this.state;
        let colour = ColourActions.addColour({ name: colourName });
        let newColour = {
            key: colours.length,
            id: {
                editable: false,
                value: colour.id,
                changeable: false
            },
            colourName: {
                editable: false,
                value: colour.name,
                changeable: true
            },
            createTime: {
                editable: false,
                value: colour.createTime,
                changeable: false
            }
        };
        this.setState({
            colours: [...colours, newColour]
        });
    }

    handleUpdate(data) {
        let colour = this.state.colours.find((item) => {
            return item.id === data.id.value;
        });
        colour.name = data.colourName.value
        ColourActions.updateColour(colour);
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
                colourName: {
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
        let colours = this.state.colours;
        let dataSource = this.createDataSource(colours);
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
                    <Form layout="inline" onSubmit={this.handleAdd.bind(this)}>
                        <FormItem label="颜 色:">
                            {getFieldDecorator('colourName', {
                                rules: [{ required: true, message: '请输入颜色！'}]
                            })(
                                <Input size="large"  onChange={ColourActions.onUpdateColourName}/>
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

let Colour = Form.create()(ColourPage);
export default Colour;