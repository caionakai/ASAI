import React from "react";
import MaterialTable from "material-table";

const TableWithFilter = ({
  tableTitle="Sales Preview",
  tableColumns,
  tableData,
  updateFilteredDataFunction,
  detailPanelColumns,
  detailPanelData,
}) => {
    
  //

  return (
    <MaterialTable
      title={tableTitle}
      columns={tableColumns}
      data={tableData}
      detailPanel={(rowData) => {
        const products = detailPanelData[rowData.index];
        if (products !== undefined) {
          return (
            <MaterialTable
              title={"Products Sold"}
              columns={detailPanelColumns}
              data={products}
              options={{
                filtering: false,
                headerStyle: {
                  backgroundColor: "black",
                  color: "#FFF",
                },
              }}
            />
          );
        } else {
          return false;
        }
      }}
      options={{
        filtering: true,
      }}
    />
  );
};

export default TableWithFilter;
