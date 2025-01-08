This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Server side Rerendering , Static site Generation and Incremental Site Generation 

In Page Routing Nextjs Default GetServerSideProps and getStaticProps not working 

For A Server Side Rerendering 
Instead using GetServerSideProps using async Server Components  Removed getServerSideProps
Data fetching happens directly in the component
No need for props drilling as the data is fetched server-side


For a Static Site Generation   
Remove  getStaticProps and Use generateStaticParams  
inside Dynamic page Remove getStaticProps and also Remove getStaticPaths and Use Only generateStaticParams

## generateStaticParams:

This function replaces the need for getStaticPaths. It will run at build time and generate static paths for each dynamic route.
It fetches the list of users from the API, and for each user, it returns an object with the dynamic parameter (id).

## next: { revalidate: 60 }:

This option ensures that the static page will be re-generated every 60 seconds (this is optional, you can omit it or adjust the revalidation time).

## Benefits of This Approach:
Static Site Generation: Pages are generated at build time and served statically.
Improved SEO: Static pages are pre-rendered, improving search engine indexing.
No Need for getStaticProps or getStaticPaths: You don't have to use the traditional Next.js data-fetching methods like getStaticProps in the app directory, as this is now handled via generateStaticParams.
Automatic Static Regeneration: The page can be revalidated at a set interval (e.g., every 60 seconds).
