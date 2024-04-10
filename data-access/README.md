
Overview:

Architecture:
- React Embed UI -> Vercel (allows for white labelling custom domains)
-- allows unlimited custom domains $20/mo (azure CDN has a limit of 25, cloudflare pages 500)

- React UI -> Cloudflare Pages (unlimited bandwidth, azure cdn = $$$)

- AzureBlob -> custom website [craftjs](https://github.com/prevwong/craft.js/)


Blob Structure:
- /\<\<community-id>>/
  - public-files/* (public files)
  - pageLayouts.json (craftjs page layouts)
- /<\<community-id>>
  - private-files/* (private files for community)
- /community-domains/
  - <\<domain>> (symlink to community-id)
  - <\<whiteLabelDomain>>.owner.community (symlink to community-id)



Development Environment Setup:


 //There is a problem with VSCode Authentication as of 2022-12-07 
    // https://github.com/Azure/azure-sdk-for-js/issues/22904

Ensure you have the AzureCLI Installed

https://learn.microsoft.com/en-us/cli/azure/

once installed 

az login --tenant <tenant id>
