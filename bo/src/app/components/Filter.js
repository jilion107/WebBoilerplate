/**
 * Created by Jilion on 2017/3/11.
 */
import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import EditableTable from '../common/EditableTable';
import FilterStore from '../stores/FilterStore';
import FilterActions from '../actions/FilterActions';

const FormItem = Form.Item;

class FilterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = FilterStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        FilterStore.listen(this.onChange);
        FilterActions.getAllFilters();
    }

    componentWillUnmount() {
        FilterStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd() {
        let { filters, filterName } = this.state;
        let filter = FilterActions.addFilter({ name: filterName });
        let newFilter = {
            key: filters.length,
            id: {
                editable: false,
                value: filter.id,
                changeable: false
            },
            filterName: {
                editable: false,
                value: filter.name,
                changeable: true
            },
            createTime: {
                editable: false,
                value: filter.createTime,
                changeable: false
            }
        };
        this.setState({
            filters: [...filters, newFilter]
        });
    }

    handleUpdate(data) {
        let filter = this.state.filters.find((item) => {
            return item.id === data.id.value;
        });
        filter.name = data.filterName.value
        FilterActions.updateFilter(filter);
    }

    handleAdd() {

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
                    value: item.category.name,
                    changeable: true
                },
                colourName: {
                    editable: false,
                    value: item.colour.name,
                    changeable: true
                },
                sizeName: {
                    editable: false,
                    value: item.size.name,
                    changeable: true
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let filters = this.state.filters;
        let dataSource = this.createDataSource(filters);
        let columns = [
            {
                title: '序号',
                dataIndex: 'id',
                width: '10%'
            }, {
                title: '类别',
                dataIndex: 'categoryName',
                width: '20%'
            }, {
                title: '尺寸',
                dataIndex: 'sizeName',
                width: '20%'
            }, {
                title: '颜色',
                dataIndex: 'colourName',
                width: '20%'
            }, {
                title: '操作',
                dataIndex: 'operation'
            }
        ];

        return ( this.state.isLoad ?
                <div>
                    <Form layout="inline" onSubmit={this.handleUpdate.bind(this)}>
                        <FormItem label="搜索分类：">
                            {getFieldDecorator('searchName', {
                                rules: []
                            })(
                                <Input size="large"  onChange={FilterActions.onUpdateSearchName}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)}>搜索</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" onClick={this.handleAdd.bind(this)}>新建</Button>
                        </FormItem>
                    </Form>
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } callback={this.handleUpdate.bind(this)} fields={ 4 }/>
                </div> : null
        );
    }

}

let Filter = Form.create()(FilterPage);
export default Filter;