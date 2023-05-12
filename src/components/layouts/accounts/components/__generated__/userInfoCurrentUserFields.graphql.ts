/**
 * @generated SignedSource<<1c7ec3442d4f0ce520d9f2337c909af4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userInfoCurrentUserFields$data = {
  readonly id: string;
  readonly " $fragmentType": "userInfoCurrentUserFields";
};
export type userInfoCurrentUserFields$key = {
  readonly " $data"?: userInfoCurrentUserFields$data;
  readonly " $fragmentSpreads": FragmentRefs<"userInfoCurrentUserFields">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userInfoCurrentUserFields",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "CurrentUser",
  "abstractKey": null
};

(node as any).hash = "5e0faf21b5fc208af38a305d0e85a9e0";

export default node;
