# CSGO's Dune Analytics
This is a [Next.js](https://nextjs.org/) project bootstrapped with ReactJS. Additionally, MongoDB and an EC2 instance are used.

Current: A simple malleable dashboard with a Items Search, Price Chart and Item Detail

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
2. AWS **EC2** Instance running a NodeJS script periodically (10 days) to update Mongo Database (due to the api rate limit)

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


# Process in making this project

## The Backend : Creating the script and setting up MongoDB & AWS
Notes: Install Node.js

To have a meaningful dashboard, I needed data. So I used someone else's items data [SteamAPI](https://steamapis.com/) (don't roast me for this, need to learn how to make a scraper)

### Query Script

So I made a script to query the api, take the csgo item data, and shove it into MongoDB. (`data_scripts.js`)

In `data_scripts.js` I combined the functionality of updating and getting data together, meaning that this script works to initially get data, and then update data periodically on the EC2 instance. 

The driver function `async function fetchData()` loops through through  each item name stored locally in `items_list.json`:

* If item alreaddy exists -> checks if item prices are old* <br /> (yes) -> updates item prices via a new query to SteamAPI <br/>
(no) -> doesn't do anything
* If Item doesn't alreay exist -> Add the obj to MongoDB

MongoDB Notes:
* Initial DB Connection in NodeJS needs to be setup according to [this](https://www.mongodb.com/docs/drivers/node/current/quick-start/connect-to-mongodb/) (`async function setup()`)
* [insertOne({...})](https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/), [replaceOne({...})](https://www.mongodb.com/docs/drivers/node/v4.0/usage-examples/replaceOne/#:~:text=replaceOne()%20accepts%20a%20query,with%20the%20provided%20replacement%20document.), [findOne({...})](https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/)

##### Personal Notable Learnings (script)

I learned the most about handling rate limits while creating this script. Here's a list of all possible [status codes](https://www.webfx.com/web-development/glossary/http-status-codes/)

Full disclaimer here, as I have only encountered a 429 error while running the script (assuming that I do have a correct API key), I wrote the script to handle such a scenario only: via delays.
* 429 is the api rate exceeded error

This was handled by the `function delay(ms)` that would initialize a new promise that contained a `setTimeout(() => resolve, ms)` to artificially delay the entire NodeJS program. This works because by design of `fetchData()` and other functions that interact with MongoDB being `async`, it's effectively a synchronous program that waits for execution of `delay(some ms)`. 
<br />
<br />

### Setting up AWS 

EC2 SSH
1. Log on to AWS and have a credit card (charged 1 dollar to make an account)
2. Create an Linux/Ubuntu EC2 instance through their interface 
    * In the key pair I chose to get a RSA .pem key
    * Also a security group that aallowed SSH traffic from the anywhere
3. In terminal, navigate to the .pem key directory (probably downloads) and type `chmod 400 <filename.pem>`
4. Open AWS EC2 instances list and click connect at the top, it should give an example link for use via SSH (I didn't use putty)
5. Paste that into the same terminal session on 4
6. You should see signs of success in terminal (Credits to this [tutorial](https://asf.alaska.edu/how-to/data-recipes/connect-to-ec2-with-ssh-mac-os-x/#:~:text=Connect%20to%20an%20EC2%20Instance,your%20Mac%20Terminal%20window%20later.))

Github Setup
1. In the SSH, follow this [tutorial](https://medium.com/@rajani103/deploying-nodejs-app-on-aws-ec2-instance-step-by-step-1b00f807cdce) from step 3 to step 4 to setup
2. In the root directory, if there's no /home, `mkdir` one 
3. Execute `ssh-keygen -t ed25519 -a 100 -C "<your GitHub account email>"`
4. Navigate to the `/.ssh` directory in the ec2 instance where the key pairs are stored 
5. `cat <your-key-name.pub>` to display the key
6. Add a deploy key in github settings and paste the output of the previous step into the key field
7. Test connection to github: ssh -T git@github.comd
8. After success, git clone the actual repository link.git
9. [Credit](https://medium.com/@qylong2021/clone-organization-owned-private-repository-on-aws-ec2-instances-fb712dbf03ad)



## Learn More about NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
