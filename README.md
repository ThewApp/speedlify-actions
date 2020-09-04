# speedlify + GitHub Actions

This repository demonstrates how you can configure GitHub Actions `workflow` to **continuously measure your website Lighthouse score** by using speedlify + GitHub actions for free. Then you can deploy to any _static hosting_.

## Motivations

[@zachleat](https://www.zachleat.com/) has an instruction on [how to deploy speedlify to Netlify](https://github.com/zachleat/speedlify#deploy-to-netlify) in [speedlify repository](https://github.com/zachleat/speedlify). However, Netlify free plan has only 300 minutes build time per month with a maximum of 15 minutes for each build.

By using the [workflow](blob/main/.github/workflows/test-pages.yml) in this repository, you will have an **unlimited** build time in public repository or a **2000**
minutes build time per month in private repository for free. Thanks to [GitHub Actions](https://github.com/features/actions).

## Usage

1. Clone/Fork this repository
2. Delete or skip the initial `_data/sites/*.js` files and create your own file with a list of your own site URLs
3. Commit and push

## Deploy to GitHub Pages

There is [another workflow file](blob/main/.github/workflows/deploy-ghpages.yml) in this repository that automatically deploy speedlify to GitHub Pages. [Demo site](https://thewapp.github.io/speedlify-actions) only have data on _default site_ and _Static Site Generator_.

## About speedlify

After you make a fast web site, keep it fast by measuring it over time. Read [Use Speedlify to Continuously Measure Site Performance](https://www.zachleat.com/web/speedlify/). Created by [@zachleat](https://www.zachleat.com/).
