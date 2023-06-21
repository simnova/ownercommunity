import {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
} from "relay-runtime";
import type { FetchFunction, IEnvironment } from "relay-runtime";

const HTTP_ENDPOINT = import.meta.env.VITE_FUNCTION_ENDPOINT ?? "/api/graphql"

const fetchFn: FetchFunction = (params, variables) => {
  console.log("fetching")
  const response = fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["Authorization", "Bearer"]
    ],
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return Observable.from(response.then((data) => data.json()));
};

const network = Network.create(fetchFn);
const store = new Store(new RecordSource());
export const RelayEnvironment = new Environment({ store, network });