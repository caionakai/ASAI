<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React from "react";
>>>>>>> Initial commit.
=======
import React, { useEffect, useState } from "react";
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TableExportButton from "./TableExportButton";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
import TableWithFilter from "./Table";
import TopicCard from "./TopicCard";
import Swal from "sweetalert2";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import BarGraph from "./Graphs";
<<<<<<< HEAD
=======
import CustomTable from "./CustomTable";
>>>>>>> Initial commit.
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
=======
import { BarGraph, LineGraph } from "./Graphs";
=======
import { BarGraph, LineGraph, DoughnutGraph } from "./Graphs";
>>>>>>> Add categories chart.
=======
import { BarGraph, LineGraph, DoughnutGraph, LineBarGraph } from "./Graphs";
>>>>>>> Final Table and Chart tweaks.
import moment from "moment";
import "moment-timezone";
<<<<<<< HEAD
>>>>>>> Progress on generating Charts [incomplete].
=======
import LoadingSpinner from 'loading-spinner';
>>>>>>> Still trying to Fix Stuff.

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

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
<<<<<<< HEAD

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

=======

const fixedJoinedTables = [
  {
    idSalesItem: 1,
    quantity: 1,
    price: 5.0,
    sale: {
      // um salesItem guarda informações de um 'sale'
      idSale: 1,
      purchaseDate: "16-02-2019",
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
];

// const joinedTables = [
//   {
//     idSalesItem: 1,
//     quantity: 1,
//     price: 5.0,
//     sale: {
//       // um salesItem guarda informações de um 'sale'
//       idSale: 1,
//       purchaseDate: "16-02-2019",
//       discountPercentage: 20,
//       client: {},
//       seller: {},
//     },
//     product: [
//       {
//         idProduct: 1,
//         name: "Cornflakes",
//         price: 5.0,
//         brand: {
//           idBrand: 1,
//           name: "Kellogs",
//         },
//         category: {
//           idCategory: 1,
//           name: "Food",
//         }, // supplier: {}, // not needed
//       },
//     ],
//   },
//   {
//     idSalesItem: 2,
//     quantity: 1,
//     price: 6.6,
//     sale: {
//       // um salesItem guarda informações de um 'sale'
//       idSale: 2,
//       purchaseDate: "20-12-2019",
//       discountPercentage: 10,
//       client: {},
//       seller: {},
//     },
//     product: [
//       {
//         idProduct: 22,
//         name: "Shirt",
//         price: 100.0,
//         brand: {
//           idBrand: 2,
//           name: "Nike",
//         },
//         category: {
//           idCategory: 2,
//           name: "Clothing",
//         }, // supplier: {}, // not needed
//       },
//     ],
//   },
//   {
//     idSalesItem: 3,
//     quantity: 1,
//     price: 16.0,
//     sale: {
//       // um salesItem guarda informações de um 'sale'
//       idSale: 3,
//       purchaseDate: "19-12-2019",
//       discountPercentage: 10,
//       client: {},
//       seller: {},
//     },
//     product: [
//       {
//         idProduct: 23,
//         name: "Jacket",
//         price: 200.0,
//         brand: {
//           idBrand: 3,
//           name: "Nike",
//         },
//         category: {
//           idCategory: 3,
//           name: "Clothing",
//         }, // supplier: {}, // not needed
//       },
//     ],
//   },
//   {
//     idSalesItem: 4,
//     quantity: 2,
//     price: 200,
//     sale: {
//       // um salesItem guarda informações de um 'sale'
//       idSale: 3,
//       purchaseDate: "03-05-2020",
//       discountPercentage: 10,
//       client: {},
//       seller: {},
//     },
//     product: [
//       {
//         idProduct: 23,
//         name: "Jacket",
//         price: 200.0,
//         brand: {
//           idBrand: 3,
//           name: "Adidas",
//         },
//         category: {
//           idCategory: 3,
//           name: "Clothing",
//         }, // supplier: {}, // not needed
//       },
//       {
//         idProduct: 23,
//         name: "Jacket",
//         price: 200.0,
//         brand: {
//           idBrand: 3,
//           name: "Nike",
//         },
//         category: {
//           idCategory: 3,
//           name: "Clothing",
//         }, // supplier: {}, // not needed
//       },
//     ],
//   },
// ];

// which brand or category generated the most income or
// most quantities sold

export default function Reports() {
  const classes = useStyles();

<<<<<<< HEAD
>>>>>>> Initial commit.
=======
  const [brandsChart, setBrandsChart] = useState("");
  const [salesChart, setSalesChart] = useState("");
  const [categoriesChart, setCategoriesChart] = useState("");
  const [dataForTable, setDataForTable] = useState([]);
  const [joinedTables, setJoinedTables] = useState([]);
  // perspectiveMode isnt very important
  const [perspectiveMode, setPerspectiveMode] = useState("");
  // contains columns required for material-table
  const [tableColumns, setTableColumns] = useState([]);
  const [detailPanelColumns, setDetailPanelColumns] = useState([]);
  // contains all data without table filters
  const [tableData, setTableData] = useState([]);
  const [detailPanelData, setDetailPanelData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // filteredTableData is used to generate PDF or to update graph
  const [filteredTableData, setFilteredTableData] = useState([]);

  const [today, setToday] = useState("");
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
    // console.log('isempty', joinedTables)
    joinedTables.forEach((saleItem) => {
      let newRow = {
        index: idx,
        price: saleItem.price,
        quantity: saleItem.quantity,
        purchaseDate: saleItem.sale.purchaseDate,
      };
      idx++;
      data.push(newRow);
    });
    return data;
  };

  // const builtChart = () => {
  //   if (categoriesChart !== "") {
  //     return categoriesChart;
  //   } else if (brandsChart !== "") {
  //     return brandsChart;
  //   } else if (salesChart !== "") {
  //     return salesChart;
  //   }
  // };

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

  const getDataCategoryItems = () => {
    let data = [];
    let index = 0;
    joinedTables.forEach((saleItem) => {
      const product = saleItem.product;
      product.forEach((item) => {
        data.push({
          index: index,
          category: item.category.name,
          product: item.name,
          brand: item.brand.name,
          purchaseDate: saleItem.sale.purchaseDate,
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
      case "categories": {
        const columns = [
          { title: "Index", field: "index", type: "numeric" },
          { title: "Category", field: "category" },
          { title: "Product", field: "product" },
          { title: "Brand", field: "brand" },
          { title: "Purchase Date", field: "purchaseDate" },
        ];
        setTableColumns(columns);
        const data = getDataCategoryItems();
        setTableData(data);
        setDataForTable(data);
        setFilteredTableData(data);
        setDetailPanelColumns([]);
        setDetailPanelData([]);
        break;
      }
      case "brands": {
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
        setDataForTable(data);
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
        setDataForTable(data);
        setTableData(data);
        const detailData = getDetailDataSaleItems();
        setDetailPanelData(detailData);
        setFilteredTableData(data);
      }
    }
  };

  //when changing perspective, also reset filteredTableData for PDF

  useEffect(() => {
    let data = [];
    try {
      api.get("crm/reports", {}).then((response) => {
        if (response.data !== "") {
          data = response.data;
          // console.log(data)
          setJoinedTables(data);
        }
      });
    } catch (err) {
      console.log("Error fetching reports data.");
    }
    setToday(moment());
    setPerspectiveMode("sales");
    chewDataAndSetTable("sales");
  }, []);

  const filterTableData = (filteredData) => {
    setFilteredTableData(filteredData);
  };

  const resetAllCharts = () => {
    setBrandsChart("");
    setSalesChart("");
    setCategoriesChart("");
  };

  // returns filtered data with period
  // data is filteredTableData
  // period is week, month, year, allTime
  const filterDataByPeriod = (period, data) => {
    let momentData = [];
    // let currentDate = moment().startOf("day").hour(12);
    let currentDate = moment(today);
    let processedData = [];
    data.forEach((d) => {
      momentData.push(moment(d.purchaseDate, "DD-MM-YYYY"));
    });
    switch (period) {
      case "week": {
        for (let i = 0; i < momentData.length; i++) {
          if (currentDate.diff(momentData[i], "days") < 7) {
            processedData.push(data[i]);
          }
        }
        break;
      }
      case "month": {
        for (let i = 0; i < momentData.length; i++) {
          if (currentDate.diff(momentData[i], "days") < 30) {
            processedData.push(data[i]);
          }
        }
        break;
      }
      case "year": {
        for (let i = 0; i < momentData.length; i++) {
          if (currentDate.diff(momentData[i], "days") < 365) {
            processedData.push(data[i]);
          }
        }
        break;
      }
      default: {
        processedData = data;
        // all time is default
      }
    }
    setDataForTable(processedData); // this was modified
    return processedData;
  };

  const changePerspective = (persp) => {
    if (persp !== perspectiveMode) {
      chewDataAndSetTable(persp);
      setPerspectiveMode(persp);
      resetAllCharts();
    }
  };

  // essa função gera os gráficos do Brands
  // period pode ser week, month, year, allTimes
  // should use filteredDataTable probably
  const generateBrandsGraph = (period) => {
    if (perspectiveMode !== "brands") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Change perspective to Brands before generating Chart!",
      });
    } else {
      const processedData = filterDataByPeriod(period, filteredTableData);
      let xData = [];
      let yData = [];
      processedData.forEach((el) => {
        let brand = el["brand"];
        if (!xData.includes(brand)) {
          xData.push(brand);
          yData.push(1);
        } else {
          const index = xData.findIndex((d) => d === brand);
          yData[index] = yData[index] + 1;
        }
      });
      setBrandsChart(<BarGraph xData={xData} yData={yData} period={period} />);
    }
  };

  const getDays = (days) => {
    let keys = [];
    let currentDate = moment(today);
    for (let i = 0; i < days; i++) {
      keys.push(currentDate.format("DD-MM"));
      currentDate = currentDate.subtract(1, "days");
    }
    keys.reverse();
    return keys;
  };

  const getMonths = (months) => {
    let keys = [];
    let currentDate = moment(today);
    for (let i = 0; i < months; i++) {
      keys.push(currentDate.format("MM-YYYY"));
      currentDate = currentDate.subtract(1, "months");
    }
    keys.reverse();
    return keys;
  };

  const getMonthsBetweenTwoDates = (data) => {
    let momentData = [];
    data.forEach((d) => {
      momentData.push(moment(d.purchaseDate, "DD-MM-YYYY"));
    });
    let keys = [];
    let currentDate = moment(today);
    let minDate = moment.min(momentData);
    while (minDate.isBefore(currentDate)) {
      keys.push(minDate.format("MM-YYYY"));
      minDate = minDate.add(1, "months");
    }
    if (!keys.includes(moment(today).format("MM-YYYY"))) {
      keys.push(moment(today).format("MM-YYYY"));
    }
    return keys;
  };

  const generateSalesGraph = (period) => {
    if (perspectiveMode !== "sales") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Change perspective to Sales before generating Chart!",
      });
    } else {
      const processedData = filterDataByPeriod(period, filteredTableData);
      let xData = [];
      let yData = [];
      let moneyData = [];
      switch (period) {
        case "week": {
          const keys = getDays(7);
          yData = keys;
          moneyData = new Array(yData.length).fill(0);
          xData = new Array(yData.length).fill(0);
          processedData.forEach((data) => {
            const index = keys.indexOf(data.purchaseDate.substring(0, 5));
            moneyData[index] += data.price;
            xData[index]++;
          });
          break;
        }
        case "month": {
          const keys = getDays(30);
          yData = keys;
          moneyData = new Array(yData.length).fill(0);
          xData = new Array(yData.length).fill(0);
          processedData.forEach((data) => {
            const index = keys.indexOf(data.purchaseDate.substring(0, 5));
            moneyData[index] += data.price;
            xData[index]++;
          });
          break;
        }
        case "year": {
          const keys = getMonths(12);
          yData = keys;
          moneyData = new Array(yData.length).fill(0);
          xData = new Array(yData.length).fill(0);
          processedData.forEach((data) => {
            const index = keys.indexOf(data.purchaseDate.substring(3, 10));
            moneyData[index] += data.price;
            xData[index]++;
          });
          break;
        }
        default: {
          const keys = getMonthsBetweenTwoDates(processedData);
          yData = keys;
          moneyData = new Array(yData.length).fill(0);
          xData = new Array(yData.length).fill(0);
          //all time this is gonna be a little harder
          processedData.forEach((data) => {
            const index = keys.indexOf(data.purchaseDate.substring(3, 10));
            moneyData[index] += data.price;
            xData[index]++;
          });
          break;
        }
      }
      setSalesChart(
        <LineBarGraph
          xData={xData}
          yData={yData}
          period={period}
          moneyData={moneyData}
        />
      );
    }
  };

  const generateCategoriesGraph = (period) => {
    if (perspectiveMode !== "categories") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Change perspective to Categories before generating Chart!",
      });
    } else {
      const processedData = filterDataByPeriod(period, filteredTableData);
      let xData = [];
      let yData = [];
      processedData.forEach((el) => {
        let category = el["category"];
        if (!xData.includes(category)) {
          xData.push(category);
          yData.push(1);
        } else {
          const index = xData.findIndex((c) => c === category);
          yData[index] = yData[index] + 1;
        }
      });
      // console.log(xData);
      setCategoriesChart(
        <DoughnutGraph xData={xData} yData={yData} period={period} />
      );
    }
  };

>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
  return (
<<<<<<< HEAD
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={"Reports"} />
      <Sidebar currentPage={16} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
        <TableWithFilter
          tableTitle={perspectiveMode.toUpperCase()}
          tableData={dataForTable}
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
          changePerspectiveFunction={() => changePerspective("brands")}
          generateChart={generateBrandsGraph}
          chart={brandsChart}
        />
        <TopicCard
          perspective="Categories"
          changePerspectiveFunction={() => changePerspective("categories")}
          generateChart={generateCategoriesGraph}
          chart={categoriesChart}
        />
        <TableExportButton
          pdfTitle={perspectiveMode}
          header={tableColumns}
          tableData={filteredTableData}
          // graphComponent={() => builtChart()}
        />
        {/* <BarGraph></BarGraph> */}
<<<<<<< HEAD
=======
        <CustomTable tableData={data} />
        <TableExportButton tableData={data} />
        {/* PUT YOUR CONTENT HERE -> RECOMMEND: GRID AND PAPERS MATERIAL UI */}
>>>>>>> Initial commit.
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
      </main>
=======
    <div>
      {isDataLoaded ? (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={"Reports"} />
          <Sidebar currentPage={16} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <TableWithFilter
              tableTitle={perspectiveMode.toUpperCase()}
              tableData={dataForTable}
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
              changePerspectiveFunction={() => changePerspective("brands")}
              generateChart={generateBrandsGraph}
              chart={brandsChart}
            />
            <TopicCard
              perspective="Categories"
              changePerspectiveFunction={() => changePerspective("categories")}
              generateChart={generateCategoriesGraph}
              chart={categoriesChart}
            />
            <TableExportButton
              pdfTitle={perspectiveMode}
              header={tableColumns}
              tableData={filteredTableData}
              // graphComponent={() => builtChart()}
            />
            {/* <BarGraph></BarGraph> */}
          </main>
        </div>
      ) : (
        <LoadingSpinner />
      )}
>>>>>>> Still trying to Fix Stuff.
    </div>
  );
}
