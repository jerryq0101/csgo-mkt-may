# CSGO's Dune Analytics
This is a [Next.js](https://nextjs.org/) project bootstrapped with ReactJS. Additionally, MongoDB and an EC2 instance are used.

<details>
<summary>Seeing data presented in an aesthetically pleasing manner on dashboards is satisfying.</summary>
<br>

Similar to why financial management dashboards like MercuryOS has risen successful, I believe dashboards molded with good design can become powerful operating systems for doing anything within some domain.

Despite this project being risen out of simple love for CSGO, I believe that the concept of a *malleable* dashboard is applicable to any scenario where a user has to navigate to multiple sites to complete some action. Or, to manually copy and paste data into some spread sheet to perform analysis. 

(Web3 especially, maybe a portfolio/broker/swap/lp/yieldfarm would be a good idea...)

So many cool things can just be fucking dashboards. Maybe our OS can be a dashboard...
</details>

## Running the Application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Demo

[Insert a screen recorded thing of the app here, screen.studio] or visit the actual link on github

## App Structure 

**Backend** 
1. **Mongo** Database containing a collection of items-data, and their {name, price_history} specifically
2. AWS **EC2** Instance running a NodeJS script periodically (10 days) to update Mongo Database

**Frontend**
1. NextJS, Tailwindcss, React Grid Layout: MongoDB processes price history queries from each query of dynamic api request from next server


```
└── csgo-mkt-may/
    ├── misc
    ├── scripts
    └── src/
        ├── app/
        │   ├── api
        │   ├── lib
        │   ├── GlobalContext.js
        │   ├── Suggestions.js
        │   ├── globals.css
        │   └── page.tsx
        └── components/
            ├── icons
            ├── sub-components
            └── InterfaceGrid.js
```
Notes:
* `misc` has files that help with auto suggestions of the search (instead of querying mongodb every single time)
* `scripts` contains the test script and actual script running in the EC2 instance to load and update the MongoDB database 
* `src/` is all frontend code (which will be explained below)




## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
