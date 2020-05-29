import React from 'react';
import './card.styles.css';
import { Button } from 'react-bootstrap';


export const Card = props => (
    <div className='card-container'>
      <img alt="lead" src="../../images/lead.jpg"/>
      <h6> {props.leadname.lead} </h6>
      <h7> {props.leadname.company} </h7>
      <Button bsStyle="info" onClick={ () => 
      alert(
        'Lead name:            ' + props.leadname.lead + '\n' +
        'Company name:    ' + props.leadname.company + '\n' +
        'Person name:         ' + props.leadname.person + '\n' +
        'Age:                       ' + props.leadname.age + '\n' +
        'Gender:                  ' + props.leadname.gender + '\n' +
        'Phone number:      ' + props.leadname.phone + '\n' +
        'Description:           ' + props.leadname.description
        ) }
      >More Info >>> </Button>
    </div>
);
