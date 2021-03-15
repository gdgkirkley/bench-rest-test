import React from "react";
import Table from "./Table";
import useTransactionData from "../hooks/useTransationData";
import { formatDate } from "../utils/date";
import { formatMoney } from "../utils/money";

const AccountInfo = () => {
  const { data, status, error } = useTransactionData();

  const transactions = data?.transactions ? data.transactions : [];
  const total = transactions.reduce(
    (acc, value) => (acc += Number(value.Amount)),
    0
  );

  const columns = [
    {
      name: "Date",
      property: "Date",
      formatter: formatDate,
    },
    {
      name: "Company",
      property: "Company",
      highlighted: true,
    },
    {
      name: "Account",
      property: "Ledger",
    },
    {
      name: formatMoney(total.toString()),
      property: "Amount",
      formatter: formatMoney,
      highlighted: true,
    },
  ];

  switch (status) {
    case "resolved": {
      return (
        <Table
          data={transactions}
          columns={columns}
          accessibleDescription="Transaction data for the Bench Test account"
        />
      );
    }
    case "loading": {
      return <p>Loading...</p>;
    }
    case "rejected": {
      return <p>There was an error loading transaction data.</p>;
    }
    case "idle": {
      return <p>Waiting to get data</p>;
    }
    default: {
      return <p>Something went wrong...</p>;
    }
  }
};

export default AccountInfo;
