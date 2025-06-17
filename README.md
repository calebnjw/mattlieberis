This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Todos

1. Current problem: Page is static. random number is generated once at build, and served to github pages:

- Necessary Change 1: rewrite page to use useEffect to generate random number on each load.
- Possible Option 1: store .json in local storage, and read from there.
- Possible Option 2: create static pages of every single quote using generateStaticParams (which enables page linking from the all page).

2. Need to put the quote in the middle of the page.
3. Make the accordion with description expand upwards.
4. Make the about page one big accordion??? is that even good UX?
5. Add the (scramble in)[https://www.fancycomponents.dev/docs/components/text/scramble-in] effect for the quote.
6. Add a github link in nav bar.
7. Do up the about page!

- About the podcast.
- About why I created this project! Why though?
