import React, { useState, useEffect } from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";

import Button from "@material-ui/core/Button";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import { makeStyles } from "@material-ui/core/styles";
import "./TableExportButton.css";

const useStyles = makeStyles((theme) => ({
  pdfIcon: {
    color: "red",
  },
  exportButton: {
    marginTop: "2rem",
    float: "right",
  },
}));

const TableExportButton = ({ tableData }) => {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setData(tableData);
  }, []);

  const exportToPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(12);
    const title = "Report Title";
    const headers = [["NAME", "PROFESSION"]];
    const tableCells = data.map((elt) => [elt.name, elt.profession]);
    let content = {
      startY: 50,
      head: headers,
      body: tableCells,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
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
