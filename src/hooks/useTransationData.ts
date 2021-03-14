import * as React from "react";
import { client } from "../utils/apiClient";

// TODO Move to a better file
type Transaction = {
  Date: string;
  Ledger: string;
  Amount: string;
  Company: string;
};

// TODO Move to a better file
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
        data: action.data,
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

// Example usage:
// const {state, fetchMore} = useTransactionData()
// React.useEffect(() => {
//    fetchMore(page)
// }, [page])
function useTransactionData({ initialState }: useTransactionDataProps = {}) {
  const [state, dispatch] = React.useReducer(reducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });

  const fetchMore = React.useCallback(
    (page: number = 1) => {
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

  return { state, fetchMore };
}

export default useTransactionData;
