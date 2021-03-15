import * as React from "react";
import { TableStyled, TableRowStyled, TableCellStyled } from "./styles";

interface Columns {
  [key: string]: {
    name: string;
    property: string;
    formatter?: (value: string) => string;
  };
}

interface TableProps {
  data: Transaction[];
  columns: Columns;
}

const Table = ({ data, columns }: TableProps) => {
  return (
    <TableStyled role="table" aria-rowcount={data.length}>
      <TableRow header={true} columns={columns} />
      {data.length
        ? data.map((item) => <TableRow columns={columns} item={item} />)
        : null}
    </TableStyled>
  );
};

interface TableRowProps {
  header?: boolean;
  columns: Columns;
  item?: any;
}

const TableRow = ({ header = false, columns, item }: TableRowProps) => {
  return (
    <TableRowStyled role="row">
      {Object.values(columns).map((column) => (
        <TableCell
          role={header ? "columnheader" : "cell"}
          header={header}
          formatter={column.formatter}
        >
          {header ? column.name : item[column.property]}
        </TableCell>
      ))}
    </TableRowStyled>
  );
};

const TableCell = ({
  formatter,
  header,
  children,
  ...props
}: React.PropsWithChildren<any>) => {
  const format = () => {
    if (formatter && !header) {
      return formatter(children);
    } else {
      return children;
    }
  };

  return <TableCellStyled {...props}>{format()}</TableCellStyled>;
};

export default Table;
