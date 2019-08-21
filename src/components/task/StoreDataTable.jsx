import React from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

const StoreDataTable = props => (
  <Card>
    <CardContent>
      <Typography>
        <b>Store Data</b>
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(props.data[0]).map((key, i) => (
              <TableCell key={`heading_${i}`}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data.map((data, ind) => (
            <TableRow key={`exampleRow_${ind}`}>
              {Object.values(data).map((d, i) => (
                <TableCell key={`exampleCell_${i}`}>
                  {d === true || d === false ? (d === true ? "Yes" : "No") : d}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default StoreDataTable;
