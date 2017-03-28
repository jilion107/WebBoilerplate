/**
 * Created by jilion.chen on 3/12/2017.
 */
import React from 'react';
import { Pagination } from 'antd';
import { PAGESIZEOPTIONS, DEFAULTPAGESIZE } from './Config';

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
		let defaultPageSize = this.props.defaultPageSize || DEFAULTPAGESIZE;
		let pageSizeOptions = this.props.pageSizeOptions || PAGESIZEOPTIONS;
        return <Pagination
                    showTotal={this.showTotal.bind(this)}
                    showSizeChanger
                    onShowSizeChange={this.onShowSizeChange.bind(this)}
					pageSizeOptions={pageSizeOptions}
					defaultPageSize={defaultPageSize}
                    showQuickJumper
                    defaultCurrent={1}
                    total={this.props.total}
                    onChange={this.onPageNumberChange.bind(this)}
                />
    }
}

export default InnerPagination;
