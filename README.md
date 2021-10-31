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

#### Node Server API set up

1. Build the node api server image based off the Dockerfile in the backend folder.

    ```
    docker build -t stock_sim_api -f ./Dockerfile .
    ```

2. The backend of this application uses a lot of environment variables. Therefore we shall create .env.docker file to put all our   secrets in and apply during run time. The application will not work without an IEX cloud token!!!!

    ```
    PGUSER=stockAdmin
    PGHOST=localhost
    PGPASSWORD={password_used_earlier}
    PGDATABASE=stocksim_database
    PGPORT=5432

    FACEBOOK_CLIENT_ID={obtained from facebook}
    FACEBOOK_CLIENT_SECRET={obtained from facebook}
    FACEBOOK_CALLBACK_URL=http://localhost:8000/auth/facebook/callback


    GOOGLE_CLIENT_ID={obtained from google}
    GOOGLE_CLIENT_SECRET={obtained from google}
    GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback


    JWT_SECRET={use a random set of characters or something more secure}
    IEX_TOKEN={this is the token of the api I used from IEX cloud}

    DATABASE_URL={this will be the database url of our docker container}

    ```

##### The following instructions are for experimenting with the node application locally so we will map the port to our machine's localhost. For a production environment skip this, and follow the instructions not in this section. 

3. Start a container based on the image that we just built


    ``` 
    docker run --name stock_api_container --network=stock_sim_network -dp 8080:8000 --env-file .env.docker stock_sim_api
    ```

4. Enter localhost:8080/test in your browser (Make sure nothing else is take up port 8080 on your system) to see if you get a response.

5. Congrats the backend is correctly configured.

##### Instructions without port mapping

3. Run the container without port mapping

    ``` 
    docker run --name stock_api_container --network=stock_sim_network -d --env-file .env.docker stock_sim_api
    ```

4. Exec into the container to see if it is running.

    ```
    docker exec -it stock_sim_api_container bash
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