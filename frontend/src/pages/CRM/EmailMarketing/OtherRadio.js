import React, { Component } from "react";
import { TextField } from "@material-ui/core";

export default class OtherRadio extends Component {
   render() {
      const {
         label,
      } = this.props;

      return (
         <div>
            <TextField
               style={{ margin: 1, minWidth: '300px', maxWidth:'500',}}
               placeholder="Other"               
               margin="normal"
               size="small"
            />
         </div>
      );
   }
}
