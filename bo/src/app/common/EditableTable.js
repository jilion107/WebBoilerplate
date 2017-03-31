/**
 * Created by jilion.chen on 3/9/2017.
 */
import React from 'react';
import { Table, Popconfirm } from 'antd';
import EditableCell from './EditableCell';

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.sellsUpdated = 0;
        this.state = {
            data: this.props.data
        };
        this.columns = (this.props.columns).map((col) => {
            return {
                title: col.title,
                dataIndex: col.dataIndex,
                width: col.width || null,
                render: col.dataIndex != "operation" ?
                    (text, record, index) => this.renderColumns(this.state.data, index, col.dataIndex, text)
                    :
                    (text, record, index) => {
                        const { editable } = this.state.data[index].id;
                        return (
                            <div className="editable-row-operations">
                                {
                                    editable ?
                                        <span>
                                                        <a onClick={() => this.editDone(index, 'save')}>保存</a>
                                                        <Popconfirm title="确认取消修改?" onConfirm={() => this.editDone(index, 'cancel')}>
                                                            <a>取消</a>
                                                        </Popconfirm>
                                                    </span>
                                        :
                                        <span>
                                                        <a onClick={() => this.edit(index)}>修改</a>
                                                        <Popconfirm title="确认删除?" onConfirm={() => this.deleteDone(index, 'delete')}>
                                                            <a>删除</a>
                                                        </Popconfirm>
                                                    </span>
                                }
                            </div>
                        );
                    }
            };
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    }

    renderColumns(data, index, key, text) {
        const { editable, status, changeable, groups } = data[index][key];
        let selectedOption = text;
        if (typeof editable === 'undefined') {
            return text;
        }
        return (<EditableCell
            editable={editable}
            changeable={changeable}
            value={text}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
            groups={groups}
            selectedOption={selectedOption}
        />);
    }

    handleChange(key, index, value) {
        const { data } = this.state;
        data[index][key].value = value;
        this.sellsUpdated += 1;
        this.setState({
            data : data
        });
        if (this.sellsUpdated == this.props.fields) {
            this.sellsUpdated = 0;
            this.props.updateHandler && this.props.updateHandler(data, index);
        }
    }

    edit(index) {
        if(this.props.modalUpdate) {
            this.props.updateHandler && this.props.updateHandler(this.state.data, index);
        } else {
            const { data } = this.state;
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    data[index][item].editable = true;
                }
            });
            this.setState({ data });
        }
    }

    editDone(index, type) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }

    deleteDone(index) {
        this.props.deleteHandler && this.props.deleteHandler(index);
    }


    render() {
        let data = this.state.data || [];
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return <Table bordered={ true } dataSource={dataSource} columns={columns} />;
    }
}

export default EditableTable;