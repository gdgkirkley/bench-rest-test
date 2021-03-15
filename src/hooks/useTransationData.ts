import * as React from "react";
import { client } from "../utils/apiClient";

type APIResponse = {
  page: number;
  totalCount: number;
  transactions: Transaction[];
};

interface APIResponsePages extends APIResponse {
  totalPages?: number;
}

type useTransactionDataProps = {
  initialState?: useTransactionReducerState;
};

type useTransactionReducerState = {
  status: keyof typeof actionTypes;
  data?: APIResponsePages | null;
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

function reducer(
  state: useTransactionReducerState,
  action: useTransactionReducerAction
): useTransactionReducerState {
  switch (action.type) {
    case actionTypes.loading: {
      return { status: "loading", data: null, error: null };
    }
    case actionTypes.resolved: {
      return {
        status: "resolved",
        data: action.data
          ? {
              ...action.data,
              totalPages: getTotalPages(state, action),
              transactions: getUpdatedTransactions(state, action),
            }
          : null,
        error: null,
      };
    }
    case actionTypes.rejected: {
      return { status: "rejected", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function getTotalPages(
  state: useTransactionReducerState,
  action: useTransactionReducerAction
) {
  let totalPages;

  if (state.data?.totalPages) {
    totalPages = state.data.totalPages;
  }

  if (
    !totalPages &&
    action.data?.totalCount &&
    action.data?.transactions.length
  ) {
    totalPages = Math.round(
      action.data.totalCount / action.data.transactions.length
    );
  }

  return totalPages;
}

function getUpdatedTransactions(
  state: useTransactionReducerState,
  action: useTransactionReducerAction
) {
  let prevTransactions: Transaction[] = [];
  let transactions: Transaction[] = [];

  if (state.data?.transactions) {
    prevTransactions = [...state.data?.transactions];
  }

  if (action.data?.transactions) {
    transactions = [...prevTransactions, ...action.data.transactions];
  }
  return transactions;
}

function useTransactionData({ initialState }: useTransactionDataProps = {}) {
  const [state, dispatch] = React.useReducer(reducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });

  const getTransactions = React.useCallback(
    (page: number) => {
      dispatch({ type: "loading" });
      client(page).then(
        (data) => {
          dispatch({ type: "resolved", data });
        },
        (error) => {
          dispatch({ type: "rejected", error });
        }
      );
    },
    [dispatch]
  );

  React.useEffect(() => {
    getTransactions(1);
    getTransactions(2);
    getTransactions(3);
    getTransactions(4);
  }, [getTransactions]);

  return { ...state };
}

export default useTransactionData;
