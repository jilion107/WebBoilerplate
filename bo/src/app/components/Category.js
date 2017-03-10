/**
 * Created by Jilion on 2017/3/10.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import CategoryStore from '../stores/CategoryStore';
import CategoryActions from '../actions/CategoryActions';

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
        let { categories, categoryName } = this.state;
        let category = CategoryActions.addCategory({ name: categoryName });
        let newCategory = {
            key: categories.length,
            id: {
                editable: false,
                value: category.id,
                changeable: false
            },
            categoryName: {
                editable: false,
                value: category.name,
                changeable: true
            },
            createTime: {
                editable: false,
                value: category.createTime,
                changeable: false
            }
        };
        this.setState({
            categories: [...categories, newCategory]
        });
    }

    handleUpdate(data) {
        let category = this.state.category.find((item) => {
            return item.id === data.id.value;
        });
        category.name = data.categoryName.value
        CategoryActions.updateCategory(category);
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
                categoryName: {
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
        let categories = this.state.categories;
        let dataSource = this.createDataSource(categories);
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
                    <Form layout="inline" onSubmit={this.handleAdd.bind(this)}>
                        <FormItem label="类 别:">
                            {getFieldDecorator('categoryName', {
                                rules: [{ required: true, message: '请输入类别！'}]
                            })(
                                <Input size="large"  onChange={CategoryActions.onUpdateCategoryName}/>
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

let Category = Form.create()(CategoryPage);
export default Category;