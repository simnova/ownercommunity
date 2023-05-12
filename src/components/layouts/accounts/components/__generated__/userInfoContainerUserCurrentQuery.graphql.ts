/**
 * @generated SignedSource<<b727e3eb6947e61b01df3115a75085b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ClientRequest, ClientQuery } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userInfoContainerUserCurrentQuery$variables = {};
export type userInfoContainerUserCurrentQuery$data = {
  readonly userCurrent: {
    readonly " $fragmentSpreads": FragmentRefs<"userInfoCurrentUserFields">;
  } | null;
};
export type userInfoContainerUserCurrentQuery = {
  response: userInfoContainerUserCurrentQuery$data;
  variables: userInfoContainerUserCurrentQuery$variables;
};

const node: ClientRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "userInfoContainerUserCurrentQuery",
    "selections": [
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CurrentUser",
            "kind": "LinkedField",
            "name": "userCurrent",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "userInfoCurrentUserFields"
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "userInfoContainerUserCurrentQuery",
    "selections": [
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CurrentUser",
            "kind": "LinkedField",
            "name": "userCurrent",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "629aa5a2f7c28c3e975d259436e2eef7",
    "id": null,
    "metadata": {},
    "name": "userInfoContainerUserCurrentQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "ee19a3b84e77a930c13b2512f4c9f390";

export default node;
