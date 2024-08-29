import crypto from "crypto";
import { CognitiveSearchDomain } from "../../infrastructure/cognitive-search/interfaces";
import retry from "async-retry";
import { SearchIndex } from "@azure/search-documents";

export const generateHash = (indexDoc: Partial<any>) => {
  const docCopy = JSON.parse(JSON.stringify(indexDoc));
  delete docCopy.updatedAt;
  const hash = crypto.createHash("sha256").update(JSON.stringify(docCopy)).digest("base64");
  return hash;
};

const updateSearchIndex = async (cognitiveSearch: CognitiveSearchDomain, indexDefinition: SearchIndex, indexDoc: Partial<any>) => {
  // for the first time, create the index
  await cognitiveSearch.createIndexIfNotExists(indexDefinition.name, indexDefinition);
  await cognitiveSearch.indexDocument(indexDefinition.name, indexDoc);
  console.log(`ID Case Updated - Index Updated: ${JSON.stringify(indexDoc)}`);
};

export const updateSearchIndexWithRetry = async (cognitiveSearch, indexDefinition: SearchIndex,  indexDoc: Partial<any>, maxAttempts: number): Promise<Date> => {
  return retry(
    async (_, currentAttempt) => {
      if (currentAttempt > maxAttempts) {
        throw new Error("Max attempts reached");
      }
      await updateSearchIndex(cognitiveSearch, indexDefinition, indexDoc);
      return new Date();
    },
    { retries: maxAttempts }
  );
};
