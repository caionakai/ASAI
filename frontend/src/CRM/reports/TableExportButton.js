import React from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";

import Button from "@material-ui/core/Button";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import { makeStyles } from "@material-ui/core/styles";

import html2canvas from "html2canvas";

const useStyles = makeStyles((theme) => ({
  pdfIcon: {
    color: "red",
  },
  exportButton: {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    marginTop: "1rem",
=======
    marginTop: "2rem",
>>>>>>> Initial commit.
=======
    marginTop: "1rem",
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
=======
    marginTop: "1rem",
>>>>>>> 81b8ff1017f2973de647d0624f937799d49bafb3
    float: "right",
  },
}));

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const TableExportButton = ({ header, tableData, pdfTitle="Sales Report" }) => {
=======
const TableExportButton = ({ tableData }) => {
>>>>>>> Initial commit.
=======
const TableExportButton = ({ header, tableData, pdfTitle="Sales Report" }) => {
<<<<<<< HEAD
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setData(tableData);
  }, []);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
=======
=======
=======
>>>>>>> 81b8ff1017f2973de647d0624f937799d49bafb3
const TableExportButton = ({
  header,
  tableData,
  pdfTitle = "Sales Report",
  graphComponent,
}) => {
<<<<<<< HEAD
>>>>>>> Add categories chart.
  const classes = useStyles();

>>>>>>> Update Branch crocodilo/reports.
=======
  const classes = useStyles();

>>>>>>> 81b8ff1017f2973de647d0624f937799d49bafb3
  const getHeaders = () => {
    let th = [];
    header.forEach((h) => {
      th.push(h.title);
    });
    return th;
  };

  // const printDocument = () => {
  //   const input = document.getElementById('graphToPrint');
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     return imgData;
  //   });
  // };

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Initial commit.
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
=======
>>>>>>> 81b8ff1017f2973de647d0624f937799d49bafb3
  const exportToPDF = () => {
    const marginLeft = 40;
    const doc = new jsPDF("portrait", "px", "A4");
    doc.setFontSize(12);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
    const title = pdfTitle;
=======
    const title = pdfTitle.toUpperCase();
>>>>>>> Update Branch crocodilo/reports.
=======
    const title = pdfTitle.toUpperCase();
>>>>>>> 81b8ff1017f2973de647d0624f937799d49bafb3
    const headers = [getHeaders()];
    const tableCells = tableData.map((elt) => {
      let row = [];
      for (var key in elt) {
        row.push(elt[key]);
      }
      return row;
    });
<<<<<<< HEAD
<<<<<<< HEAD
=======
    const title = "Report Title";
    const headers = [["NAME", "PROFESSION"]];
    const tableCells = data.map((elt) => [elt.name, elt.profession]);
>>>>>>> Initial commit.
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
=======
>>>>>>> 81b8ff1017f2973de647d0624f937799d49bafb3
    let content = {
      startY: 50,
      head: headers,
      body: tableCells,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    // const input = document.getElementById("graphToPrint");
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF("p", "px", "a4");
    //   var width = doc.internal.pageSize.getWidth();
    //   var height = doc.internal.pageSize.getHeight();
    //   doc.addImage(imgData, "JPEG", 0, 0, 200, 200);
    // });
    // doc.addImage(() => printDocument(), 'PNG', 10, 10, 200, 200);
    // doc.add
    doc.save("report.pdf");
  };

  return (
    <Button
      onClick={() => exportToPDF()}
      endIcon={<PictureAsPdf className={classes.pdfIcon} />}
      variant="outlined"
      color="primary"
      className={classes.exportButton}
    >
      Generate Report
    </Button>
  );
};

export default TableExportButton;
