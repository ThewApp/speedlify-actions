# Speedlify + GitHub Actions

This repository demonstrates how you can configure GitHub Actions `workflow` to **continuously measure your website Lighthouse score** by using speedlify + GitHub actions for free. Then you can deploy to any _static hosting_. Read more in my [blog post](https://www.thewdhanat.com/blog/monitor-lighthouse-score-with-speedlify-+-github-actions/).

## Motivations

[@zachleat](https://www.zachleat.com/) has an instruction on [how to deploy speedlify to Netlify](https://github.com/zachleat/speedlify#deploy-to-netlify) in [speedlify repository](https://github.com/zachleat/speedlify). However, Netlify free plan has only 300 minutes build time per month with a maximum of 15 minutes for each build. These can become a limit on the number of websites and frequency that you can monitor.

By using the [workflow](.github/workflows/test-pages.yml) in this repository, you will have an **unlimited** build time in public repository or a **2000**
minutes build time per month in private repository for free. Thanks to [GitHub Actions](https://github.com/features/actions).

## Usage

1. Get this workflow by one of these:
   * Clone this repository
   * [Import repository](https://github.com/new/import) to your account by enter `https://github.com/ThewApp/speedlify-actions`
   * [Use this repository as a template](https://github.com/ThewApp/speedlify-actions/generate)
   * Put [workflow file](.github/workflows/test-pages.yml) in your existing speedlify repository.

   Do **not** fork as GitHub Actions will not run on a forked repository.
1. Delete or skip the initial `_data/sites/*.js` files
1. Create your own file with a list of your own site URLs
1. Commit and push to your repository

## Deploy to GitHub Pages

There is [another workflow file](.github/workflows/deploy-ghpages.yml) in this repository that automatically deploy speedlify to GitHub Pages. [Demo site](https://thewapp.github.io/speedlify-actions) only have data on _default site_ and _Static Site Generator_.

Would like to deploy to other hosting providers? Have a look at [an example that deploys to Vercel](https://github.com/ThewApp/speedlify-actions-vercel).

## About speedlify

After you make a fast web site, keep it fast by measuring it over time. Read [Use Speedlify to Continuously Measure Site Performance](https://www.zachleat.com/web/speedlify/). Created by [@zachleat](https://www.zachleat.com/).
