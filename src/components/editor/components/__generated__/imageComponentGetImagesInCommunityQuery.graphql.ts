/**
 * @generated SignedSource<<a5b0e12afddc7dbb5274081e98c3877e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ClientRequest, ClientQuery } from 'relay-runtime';
export type imageComponentGetImagesInCommunityQuery$variables = {
  communityId: string;
};
export type imageComponentGetImagesInCommunityQuery$data = {
  readonly communityById: {
    readonly filesByType: ReadonlyArray<{
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null> | null;
  } | null;
};
export type imageComponentGetImagesInCommunityQuery = {
  response: imageComponentGetImagesInCommunityQuery$data;
  variables: imageComponentGetImagesInCommunityQuery$variables;
};

const node: ClientRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "communityId"
  }
],
v1 = [
  {
    "kind": "ClientExtension",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "communityId"
          }
        ],
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "communityById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "type",
                "value": "image"
              }
            ],
            "concreteType": "FileInfo",
            "kind": "LinkedField",
            "name": "filesByType",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "size",
                "storageKey": null
              }
            ],
            "storageKey": "filesByType(type:\"image\")"
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "imageComponentGetImagesInCommunityQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "imageComponentGetImagesInCommunityQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "74418a8637b35ab28873412641e85e68",
    "id": null,
    "metadata": {},
    "name": "imageComponentGetImagesInCommunityQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "a963ef9a969206c93d0a32bf63773893";

export default node;
