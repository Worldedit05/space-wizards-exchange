import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

const CardList = (props) => (
  <Table>
    <TableHeader
      adjustForCheckbox={props.showCheckboxes}
      displaySelectAll={props.showCheckboxes}
    >
      <TableRow>
        <TableHeaderColumn>Card Name</TableHeaderColumn>
        <TableHeaderColumn>Quantity</TableHeaderColumn>
        <TableHeaderColumn>Number | Set | Rarity</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={props.showCheckboxes}>
      {props.getListItems()}
    </TableBody>
  </Table>
);

export default CardList;
