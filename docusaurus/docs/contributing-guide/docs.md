---
sidebar_position: 1
---

# Contributing to the Docs

**Contributing to Owner Community's developer documentation**

Contributions to the documentation are always appreciated! Thank you for making
an effort to improve the developer experience of contributing to the OwnerCommunity
project.

# Running the documentation locally

Like OwnerCommunity, this site is open source and the code is [hosted on GitHub][docs].
If you find any incorrect information, or a even a typo, we'd love to see a pull
request. Follow these steps to get the documentation site running locally.

OwnerCommunity's documentation is built with [Docusaurus][docusaurus].

Once installed, you should run `npm run start` in the root of the `/docusaurus`.

```shell
npm run start
```

This will start a server where you can browse the documentation:
`http://localhost:3000`.

If you add new pages or rename existing pages, those changes will be to take
effect shortly, so you don't need to restart the server.

Make a PR with your changes and we'll review it as soon as possible.

# Useful links

The docs are a collection of [Markdown files][markdown] that also utilize
[FrontMatter][frontmatter].

For more information on how to use Docusaurus, read the [Docusaurus
docs][docusaurusdocs].

# Regarding language & style

We ask that you avoid trivializing terms when contributing to documentation.
This includes words like "just", "simply", "easy", "obvious", and
"straightforward". You can learn more about why we want to avoid this kind of
language in [this blog post](https://jessitron.com/2020/06/26/just-dont).

Generally speaking, the documentation hosted on this site is informal. There is
no need to make things more complicated by writing these articles like a
textbook.

However, it's expected that contributions to these documents are reasonably
structured and mostly free of spelling and grammar errors. For this reason, if
you submit a PR you might be asked to make changes before your PR is merged.

Prettier is used to autowrap lines in these files to 80 characters. Using 80
characters per line allows us to retain a more specific git history over time.
If lines are not wrapped, changing a comma in a paragraph would attribute the
entire paragraph to one commit. By line wrapping we are helping git to correctly
attribute smaller changes to their commits. This keeps information from getting
lost over time.

For more information on effective technical writing, check out
[writethedocs.org][writethedocs].

[docs]: https://github.com/simnova/ownercommunity/tree/main/docusaurus
[docusaurus]: https://docusaurus.io/
[markdown]: https://en.wikipedia.org/wiki/Markdown
[frontmatter]: https://jekyllrb.com/docs/front-matter/
[docusaurusdocs]: https://docusaurus.io/docs
[writethedocs]: https://www.writethedocs.org/guide/