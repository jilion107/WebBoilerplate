/**
 * Created by Jilion on 2017/3/11.
 */
import React from 'react';
import { Form, Select, Input, Button, Modal, message} from 'antd';
import EditableTable from '../common/EditableTable';
import FilterStore from '../stores/FilterStore';
import FilterActions from '../actions/FilterActions';
import Search from '../common/Search';


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
        this.props.form.validateFields((err, values) => {
            if(err) {
                return;
            } else {
                if(values.categoryId === "" && values.colourId === "" && values.sizeId === "") {
                    message.error('分类，尺寸，颜色不能同时为空！');
                } else {
                    let filterInfo = {
                        productCategoryId: values.categoryId,
                        productColourId: values.colourId,
                        productSizeId: values.sizeId
                    };
                    this.setState({ filterInfo: filterInfo });
                    FilterActions.addFilter(filterInfo);
                }
            }
        });
    }

    handleUpdate() {
        let filterId = this.state.filterInfo.id;
        this.props.form.validateFields((err, values) => {
            if(err) {
                return;
            } else {
                let filterInfo = {
                    id: filterId,
                    productCategoryId: values.categoryId,
                    productColourId: values.colourId,
                    productSizeId: values.sizeId
                };
                this.setState({ filterInfo: filterInfo });
                FilterActions.updateFilter(filterInfo);
            }
        });
    }

    handleSearch() {
        //const search = new Search();
        // to do more filter
        //let data = search.onSearch(this.state.categories, this.state.searchName, 'categoryName');
        //this.setState({
           // dataSource: data
        //});
    }

    handleDelete(index){
        let filterId = this.state.dataSource[index]["id"].value;
        FilterActions.deleteFilter(index, filterId);
    }

    onClose(e) {
        this.setState({
            modalVisible: false
        });
        e.preventDefault();
    }

    onAdd(e) {
        this.setState({
            modalType: 'create',
            modalVisible: true
        });
        e.preventDefault();
    }

    onUpdate(data, index) {
        let rawFilter = data[index];
        let filterInfo = {
            id: data[index]["id"].value,
            productCategoryId: rawFilter.categoryName.value && this.findIdByOptionName(this.state.categories, 'categoryName', rawFilter.categoryName.value)[0].id,
            productColourId: rawFilter.colourName.value && this.findIdByOptionName(this.state.colours, 'colourName', rawFilter.colourName.value)[0].id,
            productSizeId: rawFilter.sizeName.value && this.findIdByOptionName(this.state.sizes, 'sizeName', rawFilter.sizeName.value)[0].id,
        };
        this.setState({
            modalType: 'update',
            modalVisible: true,
            filterInfo: filterInfo
        });
    }

    findIdByOptionName(obj, prop ,name) {
        return obj.filter((item) => {
            return item[prop] == name;
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { dataSource, filterInfo } = this.state;
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

        const modalOpts = {
            title: this.state.modalType == "create" ? '新建过滤器' : '修改过滤器',
            visible: this.state.modalVisible,
            onOk: this.state.modalType == "create" ? this.handleAdd.bind(this) : this.handleUpdate.bind(this),
            onCancel: this.onClose.bind(this),
            maskClosable: true
        }

        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            }
        }

        return ( this.state.isLoad ?
                <div>
                    <Form layout="inline">
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
                    <EditableTable data= { dataSource } columns= { columns } tableWidth= { "30%" } updateHandler={this.onUpdate.bind(this)} deleteHandler={this.handleDelete.bind(this)} fields={ 4 } modalUpdate={true}/>
                    <Modal {...modalOpts}>
                        <Form layout="horizontal">
                            <FormItem {...formItemLayout} label="类别：">
                                {getFieldDecorator('categoryId', {
                                    initialValue: filterInfo ? filterInfo.productCategoryId : ''
                                })(
                                    <Select placeholder="选择类别">
                                        {categoryOptions}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="尺寸：">
                                {getFieldDecorator('sizeId', {
                                    initialValue: filterInfo ? filterInfo.productSizeId : ''
                                })(
                                    <Select placeholder="选择尺寸">
                                        {sizeOptions}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="颜色：">
                                {getFieldDecorator('colourId', {
                                    initialValue: filterInfo ? filterInfo.productColourId : ''
                                })(
                                    <Select placeholder="选择颜色">
                                        {colourOptions}
                                    </Select>
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                </div> : null
        );
    }

}

let Filter = Form.create()(FilterPage);
export default Filter;