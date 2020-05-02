import React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';


class CustomDropDownList extends React.Component {

    state = {
        data: this.props.data.slice(),
        loading: false
    };

    filterChange = (event) => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({
                data: this.filterData(event.filter),
                loading: false
            });
        }, 500);

        this.setState({
            loading: true
        });
    }

    filterData(filter) {
        const data = this.props.data.slice();
        return filterBy(data, filter);
    }

    render() {
        return (
            <DropDownList  style={{width: "50%"}}
                data={this.state.data}
                dataItemKey={this.props.dataKey}
                textField={this.props.dataText}
                filterable={true}
                defaultValue={this.props.defaultValue}
                onFilterChange={this.filterChange}
                loading={this.state.loading}
                onChange={this.props.callback}
            />
        );
    }
}

export default CustomDropDownList;
