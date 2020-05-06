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
    marginTop: "1rem",
    float: "right",
  },
}));

const TableExportButton = ({
  header,
  tableData,
  pdfTitle = "Sales Report",
  graphComponent,
}) => {
  const classes = useStyles();

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

  const exportToPDF = () => {
    const marginLeft = 40;
    const doc = new jsPDF("portrait", "px", "A4");
    doc.setFontSize(12);
    const title = pdfTitle.toUpperCase();
    const headers = [getHeaders()];
    const tableCells = tableData.map((elt) => {
      let row = [];
      for (var key in elt) {
        row.push(elt[key]);
      }
      return row;
    });
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
