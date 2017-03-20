/**
 * Created by jilion.chen on 3/12/2017.
 */
import React from 'react';
import {  Pagination } from 'antd';

class InnerPagination extends React.Component {
    constructor(props) {
        super(props);
    }

    showTotal(total) {
        return `共 ${total} 个`;
    }

    onShowSizeChange(current,pageSize) {
        this.props.onShowSizeChange(current,pageSize);
    }

    onPageNumberChange(page, pageSize){
        this.props.onShowSizeChange(page,pageSize);
    }

    render() {
        return <Pagination
                    showTotal={this.showTotal.bind(this)}
                    showSizeChanger
                    onShowSizeChange={this.onShowSizeChange.bind(this)}
                    showQuickJumper
                    defaultCurrent={1}
                    total={this.props.total}
                    onChange={this.onPageNumberChange.bind(this)}
                />
    }
}

export default InnerPagination;
