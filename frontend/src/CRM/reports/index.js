import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TableExportButton from "./TableExportButton";
import TableWithFilter from "./Table";
import TopicCard from "./TopicCard";
import Swal from "sweetalert2";
import { BarGraph, DoughnutGraph, LineBarGraph } from "./Graphs";
import moment from "moment";
import "moment-timezone";
import "./index.css";
import Loader from "react-loader-spinner";

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

// which brand or category generated the most income or
// most quantities sold

export default function Reports() {
  const classes = useStyles();

  const [brandsChart, setBrandsChart] = useState("");
  const [salesChart, setSalesChart] = useState("");
  const [categoriesChart, setCategoriesChart] = useState("");
  const [dataForTable, setDataForTable] = useState([]);
  const [joinedTables, setJoinedTables] = useState([]);
  const [categoryDataMissing, setCategoryDataMissing] = useState(true);
  const [brandDataMissing, setBrandDataMissing] = useState(true);
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
        // setTableData(data);
        setDataForTable(data);
        setFilteredTableData(data);
        setDetailPanelColumns([]);
        setDetailPanelData([]);
        break;
      }
      case "brands": {
        const columns = [
          { title: "Index", field: "index", type: "numeric" },
          { title: "Brand", field: "brand" },
          { title: "Purchase Date", field: "purchaseDate" },
          { title: "Category", field: "category" },
          { title: "Name", field: "name" },
        ];
        setTableColumns(columns);
        const data = getDataBrandItems();
        // setTableData(data);
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
          { title: "Index", field: "index" },
          { title: "Price", field: "price" },
          { title: "Quantity", field: "quantity" },
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
        // setTableData(data);
        const detailData = getDetailDataSaleItems();
        setDetailPanelData(detailData);
        setFilteredTableData(data);
      }
    }
  };

  //when changing perspective, also reset filteredTableData for PDF
  // {
  //   idSalesItem: 1,
  //   quantity: 1,
  //   price: 1000.0,
  //   sale: {
  //     idSale: 1,
  //     purchaseDate: "16-01-2019",
  //     discountPercentage: 20,
  //     client: {},
  //     seller: {},
  //   },
  //   product: [
  //     {
  //       idProduct: 1,
  //       name: "Watch",
  //       price: 1000.0,
  //       brand: {
  //         idBrand: 1,
  //         name: "Rolex",
  //       },
  //       category: {
  //         idCategory: 1,
  //         name: "Jewellery",
  //       },
  //     },
  //   ],
  // },

  function isEmpty(ob) {
    for (var i in ob) {
      return false;
    }
    return true;
  }

  const processData = (data) => {

    const theData = data;
    const brandPlaceholder = {
      name: "undefined",
    };
    const categoryPlaceholder = {
      name: "undefined",
    };
    const salePlacehoder = {
      purchaseDate: "undefined",
      discountPercentage: 100,
    };
    theData.map((el) => {
      el.product.map((p) => {
        let prod = p;
        if (isEmpty(prod.category)) {
          prod.category = categoryPlaceholder;
        } else {
          setCategoryDataMissing(false);
        }
        if (isEmpty(prod.brand)) {
          prod.brand = brandPlaceholder;
        } else {
          setBrandDataMissing(false);
        }
        return prod;
      });
      if (el.sale.length === 0) {
        el.sale = salePlacehoder;
      } else {
        el.sale = el.sale[0];
        let date = moment(el.sale.purchaseDate, "YYYY-MM-DD");
        el.sale.purchaseDate = date.format("DD-MM-YYYY");
      }
      return el;
    });
    return theData;
  };

  const fetchData = () => {};
  useEffect(() => {
    try {
      api
        .get("crm/reports", {})
        .then((response) => {
          if (response.data !== "") {
            const pData = processData(response.data);
            setJoinedTables(pData); // qndo isso ficar pronto executar setIsDataLoaded(true)
            setTableData(pData);
          }
        })
        .then(() => {
          setIsDataLoaded(true);
          setToday(moment());
          setPerspectiveMode("sales");
          chewDataAndSetTable("sales");
        });
    } catch (err) {
      console.log("Error fetching reports data.");
    }
  }, [isDataLoaded]);

  // useEffect(() => {
  //   const data = fetchData();
  //   setJoinedTables(data); // qndo isso ficar pronto executar setIsDataLoaded(true)
  //   setTableData(data);
  //   setIsDataLoaded(true);
  //   setToday(moment());
  //   setPerspectiveMode("sales");
  //   chewDataAndSetTable("sales");
  // }, [isDataLoaded]);

  // const fetchData = () => {
  //   try {
  //     api.get("crm/reports", {}).then((response) => {
  //       if (response.data !== "") {
  //         const pData = processData(response.data);
  //         return pData;
  //       }
  //     });
  //   } catch (err) {
  //     console.log("Error fetching reports data.");
  //   }
  // };

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
    let prunedData = [];
    data.forEach((d) => {
      if (d.purchaseDate !== "undefined") {
        momentData.push(moment(d.purchaseDate, "DD-MM-YYYY"));
        prunedData.push(d);
      }
    });
    switch (period) {
      case "week": {
        for (let i = 0; i < momentData.length; i++) {
          if (currentDate.diff(momentData[i], "days") < 7) {
            processedData.push(prunedData[i]);
          }
        }
        break;
      }
      case "month": {
        for (let i = 0; i < momentData.length; i++) {
          if (currentDate.diff(momentData[i], "days") < 30) {
            processedData.push(prunedData[i]);
          }
        }
        break;
      }
      case "year": {
        for (let i = 0; i < momentData.length; i++) {
          if (currentDate.diff(momentData[i], "days") < 365) {
            processedData.push(prunedData[i]);
          }
        }
        break;
      }
      default: {
        processedData = prunedData;
        // all time is default
      }
    }
    setDataForTable(processedData); // this was modified
    return processedData;
  };

  const changePerspective = (persp) => {
    if (persp !== perspectiveMode) {
      setBrandDataMissing(false);
      setCategoryDataMissing(false);
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
      if (brandDataMissing) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            "Category data is empty. Probably caused by malformed database.",
        });
      } else {
        const processedData = filterDataByPeriod(period, filteredTableData);
        if (processedData.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
              "Category data is empty. Probably caused by malformed database: brand || sale are empty.",
          });
        } else {
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
          setBrandsChart(
            <BarGraph xData={xData} yData={yData} period={period} />
          );
        }
      }
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
      if (d.purchaseDate !== "undefined") {
        momentData.push(moment(d.purchaseDate, "DD-MM-YYYY"));
      }
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
      if (processedData.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            "Category data is empty. Probably caused by malformed database: sale is empty.",
        });
      } else {
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
      if (categoryDataMissing) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            "Category data is empty. Probably caused by malformed database.",
        });
      } else {
        const processedData = filterDataByPeriod(period, filteredTableData);
        if (processedData.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
              "Category data is empty. Probably caused by malformed database: category || sale are empty.",
          });
        } else {
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
      }
    }
  };

  return (
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
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={"Reports"} />
          <Sidebar currentPage={16} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={7000} //3 secs
              className={"spinner"}
            />
          </main>
        </div>
      )}
    </div>
  );
}
