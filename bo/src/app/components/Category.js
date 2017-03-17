/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import CategoryStore from '../stores/CategoryStore';
import CategoryActions from '../actions/CategoryActions';
import { message } from 'antd';

const FormItem = Form.Item;

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = CategoryStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        CategoryStore.listen(this.onChange);
        CategoryActions.getAllCategories();
    }

    componentWillUnmount() {
        CategoryStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd() {
        this.props.form.validateFields((err, values) => {
            if (err) {
                message.error('类别名称不能为空！');
                e.preventDefault();
            } else {
                CategoryActions.addCategory({ categoryName: this.state.categoryName });
            }
        });
    }

    handleUpdate(data, index) {
        let rawCategory = data[index];
        let newCategory = {};
        let isCancel = false;
        Object.keys(rawCategory).forEach((prop) => {
            if(prop !== "key") {
                newCategory[prop] = rawCategory[prop].value
                if(rawCategory[prop].status === "cancel") {
                    isCancel = true;
                }
            }
        });
        CategoryActions.updateCategory(newCategory, data, isCancel);
    }

    handleDelete(index){
        let categoryId = this.state.dataSource[index]["id"].value;
        CategoryActions.deleteCategory(index, categoryId);
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
                title: '类别',
                dataIndex: 'categoryName',
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
                        <FormItem label="类 别:">
                            {getFieldDecorator('categoryName', {
                                rules: [{ required: true, message: '请输入类别！'}]
                            })(
                                <Input size="large"  onChange={CategoryActions.onUpdateCategoryName}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit"onClick={this.handleAdd.bind(this)}>添加</Button>
                        </FormItem>
                    </Form>
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } updateHandler={this.handleUpdate.bind(this)} deleteHandler={this.handleDelete.bind(this)} fields={ 3 }/>
                </div> : null
        );
    }

}

let Category = Form.create()(CategoryPage);
export default Category;