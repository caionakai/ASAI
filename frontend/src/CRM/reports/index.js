import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TableExportButton from "./TableExportButton";
import TableWithFilter from "./Table";
import TopicCard from "./TopicCard";
import Swal from "sweetalert2";
import BarGraph from "./Graphs";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const joinedTables = [
  {
    idSalesItem: 1,
    quantity: 1,
    price: 5.0,
    sale: {
      // um salesItem guarda informações de um 'sale'
      idSale: 1,
      purchaseDate: "16-05-2019",
      discountPercentage: 20,
      client: {},
      seller: {},
    },
    product: [
      {
        idProduct: 1,
        name: "Cornflakes",
        price: 5.0,
        brand: {
          idBrand: 1,
          name: "Kellogs",
        },
        category: {
          idCategory: 1,
          name: "Food",
        }, // supplier: {}, // not needed
      },
    ],
  },
  {
    idSalesItem: 2,
    quantity: 1,
    price: 6.6,
    sale: {
      // um salesItem guarda informações de um 'sale'
      idSale: 2,
      purchaseDate: "20-12-2019",
      discountPercentage: 10,
      client: {},
      seller: {},
    },
    product: [
      {
        idProduct: 22,
        name: "Shirt",
        price: 100.0,
        brand: {
          idBrand: 2,
          name: "Nike",
        },
        category: {
          idCategory: 2,
          name: "Clothing",
        }, // supplier: {}, // not needed
      },
    ],
  },
  {
    idSalesItem: 3,
    quantity: 1,
    price: 16.0,
    sale: {
      // um salesItem guarda informações de um 'sale'
      idSale: 3,
      purchaseDate: "19-12-2019",
      discountPercentage: 10,
      client: {},
      seller: {},
    },
    product: [
      {
        idProduct: 23,
        name: "Jacket",
        price: 200.0,
        brand: {
          idBrand: 3,
          name: "Nike",
        },
        category: {
          idCategory: 3,
          name: "Clothing",
        }, // supplier: {}, // not needed
      },
    ],
  },
];

// which brand or category generated the most income or
// most quantities sold

export default function Reports() {
  const classes = useStyles();

  const [brandsChart, setBrandsChart] = useState("");
  const [salesChart, setSalesChart] = useState("");

  // perspectiveMode isnt very important
  const [perspectiveMode, setPerspectiveMode] = useState("");
  // contains columns required for material-table
  const [tableColumns, setTableColumns] = useState([]);
  const [detailPanelColumns, setDetailPanelColumns] = useState([]);
  // contains all data without table filters
  const [tableData, setTableData] = useState([]);
  const [detailPanelData, setDetailPanelData] = useState([]);
  // filteredTableData is used to generate PDF or to update graph
  const [filteredTableData, setFilteredTableData] = useState([]);

  // perspectiva do sale items
  const getDetailDataSaleItems = () => {
    let data = [];
    let index = 0;
    joinedTables.forEach((saleItem) => {
      let dataRow = [];
      let product = saleItem.product;
      product.forEach((item) => {
        dataRow.push({
          index: index,
          name: item.name,
          brand: item.brand.name,
          price: item.price,
          category: item.category.name,
        });
        index++;
      });
      data.push(dataRow);
    });
    return data;
  };

  const getDataSalesItems = () => {
    let data = [];
    let idx = 0;
    joinedTables.forEach((saleItem) => {
      let newRow = {
        index: idx,
        price: saleItem.price,
        quantity: saleItem.quantity,
        purchaseDate: saleItem.sale.purchaseDate,
      };
      console.log(newRow);
      idx++;
      data.push(newRow);
    });
    return data;
  };

  const getDataBrandItems = () => {
    let data = [];
    let index = 0;
    joinedTables.forEach((saleItem) => {
      const product = saleItem.product;
      product.forEach((item) => {
        data.push({
          index: index,
          brand: item.brand.name,
          purchaseDate: saleItem.sale.purchaseDate,
          category: item.category.name,
          name: item.name,
        });
        index++;
      });
    });
    return data;
  };

  // essa função pega os dados joinedTables e seta os states
  // que a Tabela vai usar
  const chewDataAndSetTable = (perspective) => {
    switch (perspective) {
      case "brand": {
        // brand perspective
        const columns = [
          { title: "Index", field: "index", type: "numeric" },
          { title: "Brand", field: "brand" },
          { title: "Purchase Date", field: "purchaseDate" },
          { title: "Category", field: "category" },
          { title: "Name", field: "name" },
        ];
        setTableColumns(columns);
        const data = getDataBrandItems();
        setTableData(data);
        setFilteredTableData(data);
        setDetailPanelColumns([]);
        setDetailPanelData([]);
        break;
      }
      default: {
        // salesItems perspective default case "sales"
        // display saleItems perspective
        const columns = [
          { title: "Index", field: "index", type: "numeric" },
          { title: "Price", field: "price", type: "numeric" },
          { title: "Quantity", field: "quantity", type: "numeric" },
          { title: "Purchase Date", field: "purchaseDate" },
        ];
        setTableColumns(columns);
        const detailColumns = [
          { title: "Sub-index", field: "index", type: "numeric" },
          { title: "Name", field: "name" },
          { title: "Brand", field: "brand" },
          { title: "Price", field: "price", type: "numeric" },
          { title: "category", field: "category" },
        ];
        setDetailPanelColumns(detailColumns);
        const data = getDataSalesItems();
        setTableData(data);
        const detailData = getDetailDataSaleItems();
        setDetailPanelData(detailData);
        setFilteredTableData(data);
      }
    }
  };

  //when changing perspective, also reset filteredTableData for PDF

  useEffect(() => {
    chewDataAndSetTable("sales");
    setPerspectiveMode("sales");
  }, []);

  const filterTableData = (filteredData) => {
    setFilteredTableData(filteredData);
  };

  const resetAllCharts = () => {
    setBrandsChart("");
    setSalesChart("");
  };

  const changePerspective = (persp) => {
    chewDataAndSetTable(persp);
    setPerspectiveMode(persp);
    resetAllCharts();
  };

  // essa função gera os gráficos do Brands
  // period pode ser week, month, year, allTimes
  // should use filteredDataTable probably
  const generateBrandsGraph = (period) => {
    if (perspectiveMode !== "brand") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Change perspective to Brands before generating Chart!",
      });
    } else {
      switch (period) {
        case "year":
          break;
        case "month":
          break;
        case "week":
          break;
        default: {
          // allTime
          let xData = [];
          let yData = [];
          // console.log(filteredTableData)
          filteredTableData.forEach((el) => {
            let brand = el["brand"];
            if (!xData.includes(brand)) {
              xData.push(brand);
              yData.push(1);
            } else {
              const index = xData.findIndex((d) => d === brand);
              yData[index] = yData[index] + 1;
            }
          });
          setBrandsChart(<BarGraph xData={xData} yData={yData} />);
        }
      }
    }
  };

  const generateSalesGraph = (period) => {
    if (perspectiveMode !== "sales") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Change perspective to Sales before generating Chart!",
      });
    } else {
      switch (period) {
        case "year":
          break;
        case "month":
          break;
        case "week":
          break;
        default: {
          // allTime
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Reports"} />
      <Sidebar currentPage={16} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TableWithFilter
          tableData={tableData}
          tableColumns={tableColumns}
          detailPanelData={detailPanelData} // esse "detailPanel" é para os dados q aparecem
          detailPanelColumns={detailPanelColumns} //quando clica na flexinha para aparecer os produtos
          // então para o Brands nao precisa setar esses valores só o tableData e tableColumns
          updateFilteredDataFunction={filterTableData}
        />
        <TopicCard
          perspective="Sales"
          changePerspectiveFunction={() => changePerspective("sales")}
          generateChart={generateSalesGraph}
          chart={salesChart}
        />
        <TopicCard
          perspective="Brands"
          changePerspectiveFunction={() => changePerspective("brand")}
          generateChart={generateBrandsGraph}
          chart={brandsChart}
        />
        <TableExportButton
          pdfTitle={perspectiveMode}
          header={tableColumns}
          tableData={filteredTableData}
        />
        {/* <BarGraph></BarGraph> */}
      </main>
    </div>
  );
}
