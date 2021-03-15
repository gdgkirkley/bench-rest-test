import * as React from "react";
import { TableStyled, TableRowStyled, TableCellStyled } from "./styles";

interface Column {
  name: string;
  property: string;
  highlight?: boolean;
  formatter?: (value: string) => string;
}

interface TableProps {
  data: Transaction[];
  columns: Array<Column>;
  accessibleDescription: string;
}

interface TableRowProps {
  header?: boolean;
  columns: Array<Column>;
  item?: any;
}

const Table = ({ data, columns, accessibleDescription }: TableProps) => {
  return (
    <TableStyled
      role="table"
      aria-label={accessibleDescription}
      aria-rowcount={data.length}
    >
      <TableRow header={true} columns={columns} />
      {data.length
        ? data.map((item, index) => (
            <TableRow
              key={`${index}-${item.Company}-${item.Date}-${item.Amount}`}
              columns={columns}
              item={item}
            />
          ))
        : null}
    </TableStyled>
  );
};

const TableRow = ({ header = false, columns, item }: TableRowProps) => {
  return (
    <TableRowStyled role="row">
      {columns.map((column) => (
        <TableCell
          key={column.name}
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
