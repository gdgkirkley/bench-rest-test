import * as React from "react";
import Layout from "./components/Layout";
import Table from "./components/Table";
import useTransactionData from "./hooks/useTransationData";

function App() {
  const { state, fetchMore } = useTransactionData();

  React.useEffect(() => {
    let page = 1;

    fetchMore(page);
  }, [fetchMore]);

  if (state.status === "loading") {
    return <p>Loading...</p>;
  }

  if (state.status === "resolved") {
    const transactions = state.data?.transactions
      ? state.data?.transactions
      : [];
    const columns = {
      Date: {
        name: "Date",
        property: "Date",
      },
      Company: {
        name: "Company",
        property: "Company",
      },
      Account: {
        name: "Account",
        property: "Ledger",
      },
      Total: {
        // TODO make dynamic amount
        name: "$39,664.53",
        property: "Amount",
      },
    };

    return (
      <Layout>
        <Table data={transactions} columns={columns} />
      </Layout>
    );
  }

  return <p>Idle</p>;
}

export default App;
