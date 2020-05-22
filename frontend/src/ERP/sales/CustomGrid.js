import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data } from "react-data-grid-addons";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const selectors = Data.Selectors;

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

function CustomGrid({columns = [], rows = [], ... props}) {

  function getCellActions(column, row) {
    const cellActions = {
      select:  [{ icon: <AddBoxOutlinedIcon/>, callback: () => { props.handleClick(row); }}]
    };
    return cellActions[column.key];
  }

  const defaultColumnProperties = {
    filterable: true,
  };
  
  columns = columns.map(c => ({ ...c, ...defaultColumnProperties }));

  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);
  
  return (<ReactDataGrid
  columns={columns}
  rowGetter={i => filteredRows[i]}
  rowsCount={rows.length}
  onAddFilter={filter => setFilters(handleFilterChange(filter))}
  onClearFilters={() => setFilters({})}
  toolbar={<Toolbar enableFilter={true} />}
  enableCellAutoFocus={false}
  getCellActions={getCellActions}
  minHeight={250} />);
}

export default CustomGrid;