/**
 * @generated SignedSource<<6ef004a4e85245372abe3e108fefcbab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type communityInfoCommunityFields$data = {
  readonly createdAt: any | null;
  readonly domain: string | null;
  readonly handle: string | null;
  readonly id: string;
  readonly name: string | null;
  readonly publicContentBlobUrl: string | null;
  readonly schemaVersion: string | null;
  readonly updatedAt: any | null;
  readonly userIsAdmin: boolean | null;
  readonly whiteLabelDomain: string | null;
  readonly " $fragmentType": "communityInfoCommunityFields";
};
export type communityInfoCommunityFields$key = {
  readonly " $data"?: communityInfoCommunityFields$data;
  readonly " $fragmentSpreads": FragmentRefs<"communityInfoCommunityFields">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "communityInfoCommunityFields",
  "selections": [
    {
      "kind": "ClientExtension",
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
          "name": "domain",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "whiteLabelDomain",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "handle",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "publicContentBlobUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "userIsAdmin",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "schemaVersion",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "createdAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "updatedAt",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "813c1ffc7bb3f8a52ad666a79c6c39e6";

export default node;
