/**
 * Created by Jilion on 2017/3/11.
 */
import React from 'react';
import { Form, Icon, Input, Button, Modal} from 'antd';
import EditableTable from '../common/EditableTable';
import FilterStore from '../stores/FilterStore';
import FilterActions from '../actions/FilterActions';
import Search from '../common/Search';
import CategoryStore from '../stores/CategoryStore';
import CategoryActions from '../actions/CategoryActions';
import ColourStore from '../stores/ColourStore';
import ColourActions from '../actions/ColourActions';
import SizeStore from '../stores/SizeStore';
import SizeActions from '../actions/SizeActions';
import FilterModal from './FilterModal';


const FormItem = Form.Item;

class FilterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = FilterStore.getState();
        //this.state = CategoryStore.getState();
        //this.state = ColourStore.getState();
        //this.state = SizeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        FilterStore.listen(this.onChange);
        //CategoryStore.listen(this.onChange);
       //ColourStore.listen(this.onChange);
        //SizeStore.listen(this.onChange);

       //ColourActions.getAllColours();
        //SizeActions.getAllSizes();
        //CategoryActions.getAllCategories();
        FilterActions.getAllFilters();
    }

    componentWillUnmount() {
        FilterStore.unlisten(this.onChange);
        //CategoryStore.unlisten(this.onChange);
        //ColourStore.unlisten(this.onChange);
        //SizeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleAdd() {
        this.props.form.validateFields((err, values) => {
            if(err) {
                return;
            } else {
                this.setState({ values});
                FilterActions.addFilter(values);
            }
        });
    }

    handleUpdate(data, index) {
        let rawFilter = data[index];
        let newFilter = {};
        let isCancel = false;
        Object.keys(rawFilter).forEach((prop) => {
            if(prop !== "key") {
                newFilter[prop] = rawFilter[prop].value
                if(rawFilter[prop].status === "cancel") {
                    isCancel = true;
                }
            }
        });
        FilterActions.updateFilter(newFilter, data, isCancel);
    }

    handleSearch() {
        const search = new Search();
        // to do more filter
        let data = search.onSearch(this.state.filters, this.state.searchName, 'categoryName');
        this.setState({
            dataSource: data
        });
    }

    handleDelete(index){
        let filterId = this.state.dataSource[index]["id"].value;
        FilterActions.deleteFilter(index, filterId);
    }

    onAdd() {
        this.setState({
            modalType: 'create',
            modalVisible: true
        });
    }

    onUpdate() {
        this.setState({
            modalType: 'update',
            modalVisible: true
        });
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
        const categoryOptions = this.state.categories && this.state.categories.map(category => <Option key={category.id} value={category.id}>{category.categoryName}</Option>);
        const colourOptions = this.state.colours && this.state.colours.map(colour => <Option key={colour.id} value={colour.id}>{colour.colourName}</Option>);
        const sizeOptions = this.state.sizes && this.state.sizes.map(size => <Option key={size.id} value={size.id}>{size.sizeName}</Option>);

        const selectOptions = {
            categories: categoryOptions,
            colours: colourOptions,
            sizes: sizeOptions
        }

        const modalOpts = {
            title: this.state.modalType == "create" ? '添加过滤器' : '修改过滤器',
            visible: this.state.modalVisible,
            onOk: this.state.modalType == "create" ? '添加' : '修改',
            onCancel: null,
            maskClosable: true,
            width: "300"
        }

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
                            <Button type="primary" htmlType="submit" onClick={this.onAdd.bind(this)}>新建</Button>
                        </FormItem>
                    </Form>
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } updateHandler={this.onUpdate.bind(this)} deleteHandler={this.handleDelete.bind(this)} fields={ 4 }/>
                    <FilterModal modalOpts= {modalOpts} selectOptions= {selectOptions}/>
                </div> : null
        );
    }

}

let Filter = Form.create()(FilterPage);
export default Filter;