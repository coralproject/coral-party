# coral-party

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run build
npm run start
```

If you want to specify the specific Coral instance to target, you can add a `.env` file with the following:

```bash
NEXT_PUBLIC_CORAL_DOMAIN=localhost:3000
# Or the domain to have all the URL's based off of
NEXT_PUBLIC_BASE_URL=http://localhost:4000
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Making code changes

If you modify articles, content, or the code, be sure to re-perform the following steps.

```
npm run build
npm run start
```

This is because our build target is a static asset deploy on Netlify. This differs from the usual interactive, live server that you commonly see with Next.js.

To avoid inconsistencies between Netlify and our local dev environment, we have also set up our local build scripts to export out static site content and then host those static files with `http-server` to emulate Netlify's hosting as closely as possible.

## Adding Content

All content is stored under the `content/` directory as markdown files. These markdown files require the following frontmatter:

```yaml
---
title: "Title for your new story"
date: "2021-01-13T08:57:48-07:00"
author: Coral Project Team
# set to "COMMENTS", "QA", or "RATINGS_AND_REVIEWS" (passed directly as `storyMode` in stream embed)
mode: "QA"
---

Your awesome lorem-ipsum.
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
