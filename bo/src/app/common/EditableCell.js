/**
 * Created by jilion.chen on 3/9/2017.
 */

import React from 'react';
import { Input, Select } from 'antd';
const Option = Select.Option;

class EditableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editable: this.props.editable || false,
            changeable: this.props.changeable || false,
            groups: this.props.groups,
            selectedOption: this.props.selectedOption
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({ editable: nextProps.editable });
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue });
                this.props.onChange(this.cacheValue);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }

    handleChange(e) {
        let value;
        if(this.state.groups) {
            value = e;
            this.setState({
                value: value,
                selectedOption: value
            });
        } else {
            value = e.target.value;
            this.setState({ value });
        }
    }

    render() {
        let { value, editable, changeable, groups, selectedOption } = this.state;
        let options = groups && groups.map(group => <Option key={group.key} value={group.key}>{group.value}</Option>);
        if(groups) {
            value = groups.filter(group => { return group.key == selectedOption})[0].value;
        }
        return (
            <div>
                {
                    (editable && changeable ) ?
                        (groups ?
                                <div>
                                    <Select placeholder="选择权限" defaultValue={selectedOption} onChange={e => this.handleChange(e)}>
                                        {options}
                                    </Select>
                                </div>
                                :
                                <div>
                                    <Input
                                        value={value}
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                        )
                    :
                        <div className="editable-row-text">
                            {value && value.toString() || ' '}
                        </div>
                }
            </div>
        );
    }
}

export default EditableCell;