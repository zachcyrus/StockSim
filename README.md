# Stock Simulator

Stock Simulator is a full stack project of mine, meant to introduce users to the stock market.
Users will be able to search for stocks, buy and sell stocks, add those stocks to their own portfolios, and able to see visualizations of their portfolios.

One important note is that the prices of stocks are not accurate due to IEX cloud API being used currently
is meant for testing, and not production use. Sometime in the future I will change it to production use, then values will be accurate.

## Features

1. Users will be able to login with Google, Facebook, or guest login. (More login strategies will be introduced in the future)

2. Users will be able to create portfolios where they can add stocks. 

3. Users will be able to search for stocks using the search bar located in the header.

4. Users will be able to purchase and sell searchable stocks. Users will be able to see the last year worth of prices for a stock.

5. Users will be able to see a pie chart which represents the total value of their portfolio.

6. Users will be able to logout and have their portfolios with stocks saved. 

## Technologies Used

- React
- Javascript
- PostGRE SQL
- Express Node
- NextJS
- Material UI
- Recharts (For graphs)
- Passport
- Sass


## Running App with Docker

### Backend Installation

#### Setting up postgres database with schema

0. Create a docker network, this network will be the network our applications run on.

    ```
    docker network create stock_sim_network
    ```

1. Change directory to the backend of this repo.
    ```
    cd backend
    ```
2. Run docker build of the database image with the Dockerfile.database file

    ```
    docker build -t stocksim_db -f ./Dockerfile.database .
    ```

3. Once the image is built use docker run in order to run a container based on the image that was just built.

    ```
    docker run --name stocksim_database_container -e POSTGRES_PASSWORD={your_password} \
    -e POSTGRES_USER=stockAdmin -d  stocksim_db

    # the --name flag names our container 
    # -e sets our environment variables required to make a user and password for our database
    # -d flag allows us to run our container in the background
    ```

4. Now that the container is running, we have to access our container through the command line.

    ```
    docker exec -it stocksim_database_container bash
    ```


5. Once in the shell of your database container run the following command to login to your database.

    ```
    psql --username=stockAdmin --dbname=stocksim_database
    ```

6. While in the psql shell use the \dt command to list our tables and verify that they are correct. 

    ```
    \dt
    ```
7. Should see this 

    ```
    stocksim_database=# \dt
             List of relations
    Schema |     Name     | Type  |   Owner
    --------+--------------+-------+------------
    public | fb_users     | table | stockAdmin
    public | google_users | table | stockAdmin
    public | portfolios   | table | stockAdmin
    public | stock_users  | table | stockAdmin
    public | transactions | table | stockAdmin
    (5 rows)
    ```

8. Lastly connect our running container to the docker network we made. At step 0.

    ```
    docker network connect stock_sim_network stocksim_database_container
    ```


## Road map

 - Implement backend testing with Jest. 
 - Visualize user portfolio with a line chart, which will show the value of their portfolio on different days. 
 - Perhaps utilize Sequelize to improve pg sql queries. 
 - Intuitive variable naming
 - Remove all uses of Yahoo Finance API. 
 - Remove tickers that are not up to date.
 - Add custom error page.
 - Change placeholders for company logos from a white box to actual logo. 
 - Reset guest on a set interval.
 - Create a logo for the site.
 - Verify application on Google and FaceBook for sign in.
 - Fix error where selling share affects percentage