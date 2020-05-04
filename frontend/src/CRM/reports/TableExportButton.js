import React from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";

import Button from "@material-ui/core/Button";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pdfIcon: {
    color: "red",
  },
  exportButton: {
<<<<<<< HEAD
<<<<<<< HEAD
    marginTop: "1rem",
=======
    marginTop: "2rem",
>>>>>>> Initial commit.
=======
    marginTop: "1rem",
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
    float: "right",
  },
}));

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
  const classes = useStyles();

>>>>>>> Update Branch crocodilo/reports.
  const getHeaders = () => {
    let th = [];
    header.forEach(h => {
      th.push(h.title);
    });
    return th;
  }

<<<<<<< HEAD
=======
>>>>>>> Initial commit.
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
  const exportToPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(12);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
    const title = pdfTitle;
=======
    const title = pdfTitle.toUpperCase();
>>>>>>> Update Branch crocodilo/reports.
    const headers = [getHeaders()];
    const tableCells = tableData.map((elt) => {
      let row = [];
      for (var key in elt) {
        row.push(elt[key]);
      }
      return row;
    });
<<<<<<< HEAD
=======
    const title = "Report Title";
    const headers = [["NAME", "PROFESSION"]];
    const tableCells = data.map((elt) => [elt.name, elt.profession]);
>>>>>>> Initial commit.
=======
>>>>>>> Add custom table and Sales plus Brands cards for generating Charts [incomplete]
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
