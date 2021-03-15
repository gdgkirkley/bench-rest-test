import * as React from "react";
import { client } from "../utils/apiClient";

type APIResponse = {
  page: number;
  totalCount: number;
  transactions: Transaction[];
};

type useTransactionDataProps = {
  initialState?: useTransactionReducerState;
};

type useTransactionReducerState = {
  status: keyof typeof actionTypes;
  data?: APIResponse | null;
  error?: Error | null;
};

type useTransactionReducerAction = {
  type: keyof typeof actionTypes;
  data?: APIResponse | null;
  error?: Error | null;
};

const actionTypes = {
  idle: "idle",
  loading: "loading",
  resolved: "resolved",
  rejected: "rejected",
};

const maxTransactionsPerPage = 10;

function reducer(
  state: useTransactionReducerState,
  action: useTransactionReducerAction
): useTransactionReducerState {
  switch (action.type) {
    case actionTypes.loading: {
      return { status: "loading", data: state.data, error: null };
    }
    case actionTypes.resolved: {
      if (!action.data) {
        throw new Error("Must pass data to resolved action type");
      }

      return {
        status: "resolved",
        data: {
          ...action.data,
          transactions: getUpdatedTransactions(state, action),
        },
        error: null,
      };
    }
    case actionTypes.rejected: {
      return { status: "rejected", data: state.data, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function getUpdatedTransactions(
  state: useTransactionReducerState,
  action: useTransactionReducerAction
) {
  let transactions = new Map<String, Transaction>();

  if (state.data?.transactions) {
    for (let transaction of state.data.transactions) {
      transactions.set(JSON.stringify(transaction), transaction);
    }
  }

  if (action.data?.transactions) {
    for (let transaction of action.data.transactions) {
      transactions.set(JSON.stringify(transaction), transaction);
    }
  }

  return Array.from(transactions.values());
}

function useTransactionData({ initialState }: useTransactionDataProps = {}) {
  const [state, dispatch] = React.useReducer(reducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });

  React.useEffect(() => {
    let totalPages = 0;

    function getData(page: number) {
      dispatch({ type: "loading" });
      client(page).then(
        (data) => {
          dispatch({ type: "resolved", data });

          totalPages = Math.round(data.totalCount / maxTransactionsPerPage);

          if (page < totalPages) {
            getData(page + 1);
          }
        },
        (error) => {
          dispatch({ type: "rejected", error });
        }
      );
    }

    getData(1);
  }, [dispatch]);

  return { ...state };
}

export default useTransactionData;
