/**
 * @generated SignedSource<<d288692d0918e68dfe5b95bf9ae15349>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AppFragment$data = {
  readonly _empty: string | null;
  readonly " $fragmentType": "AppFragment";
};
export type AppFragment$key = {
  readonly " $data"?: AppFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AppFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AppFragment",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "_empty",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "4c902f694ea7a78664077267d9590f2c";

export default node;
