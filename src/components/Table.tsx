import * as React from "react";

interface Columns {
  [key: string]: {
    name: string;
    property: string;
  };
}

interface TableProps {
  data: Transaction[];
  columns: Columns;
}

const Table = ({ data, columns }: TableProps) => {
  return (
    <div role="table" aria-rowcount={data.length}>
      <TableRow header={true} columns={columns} />
      {data.length
        ? data.map((item) => <TableRow columns={columns} item={item} />)
        : null}
    </div>
  );
};

interface TableRowProps {
  header?: boolean;
  columns: Columns;
  item?: any;
}

const TableRow = ({ header = false, columns, item }: TableRowProps) => {
  return (
    <div role="row">
      {Object.values(columns).map((column) => (
        <TableCell role={header ? "columnheader" : "cell"}>
          {header ? column.name : item[column.property]}
        </TableCell>
      ))}
    </div>
  );
};

const TableCell = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return <span {...props}>{children}</span>;
};

export default Table;
