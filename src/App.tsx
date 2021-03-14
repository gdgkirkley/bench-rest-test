import * as React from "react";
import Layout from "./components/Layout";
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

  return <Layout>{state.data?.totalCount}</Layout>;
}

export default App;
