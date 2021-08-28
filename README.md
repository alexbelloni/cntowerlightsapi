[![Deploy](https://www.herokucdn.com/deploy/button.svg)]((https://dashboard.heroku.com/pipelines/bb30db2b-05b2-4704-b66c-9743cfb06309/tests))

<!--![Logo](./public/assets/img/icon-long.png)-->

# Welcome to CN Tower Lights API

This API shows the current CN Tower's color agenda (📍 Toronto, Canada) according to its official webpage.  
  
## Motivation
I wondered what the reasons were to CN Tower shows distinct colors every night. Then I found the official agenda and its appointments to celebrate notable events and dates. As a nerd web developer, I created this API when didn't discover the official one.  

## How it works

After user calls the API requesting the schedule:  
If the current date is on the database, it returns the agenda  
If else, it scrapes the official schedule and saves on the database. Then the method returns the agenda to the user. 

## Documentation

Created using: Nodejs, Express, Scrape-it, Airtable   
  
Tested using: Jest  

Swagger doc can be found, [here](https://tower-lights.herokuapp.com/api-docs/)

## Current Version

Deployed into Heroku and available [here](https://tower-lights.herokuapp.com/).

<!-- ## Recommended by Postman
[![Run in Postman](https://run-beta.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/) -->



## Build Setup

```bash
# install dependencies
npm install

# serve at localhost:5000
npm start

npm test
```
## Deploy

Manual deploy the GitHub branch via Heroku

## Sources:

> https://www.cntower.ca

# Contributors ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/alexbelloni"><img src="https://avatars0.githubusercontent.com/u/10518847?v=4" width="100px;" alt=""/><br /><sub><b>alexbelloni</b></sub></a></td>
  </tr> 
</table>

