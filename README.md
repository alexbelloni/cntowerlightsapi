[![Heroku CI Status](https://tower-lights.herokuapp.com/last.svg)](https://dashboard.heroku.com/pipelines/bb30db2b-05b2-4704-b66c-9743cfb06309/tests)

<!--![Logo](./public/assets/img/icon-long.png)-->

# Welcome to CN Tower Lights API - An open API

This API shows the current CN Tower's color agenda according to the official webpage.  
  

## Current Version

Deployed into Heroku and available [here](https://tower-lights.herokuapp.com/).

<!-- ## Recommended by Postman
[![Run in Postman](https://run-beta.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/) -->

## Documentation

<!-- Documentation can be found [here](https://) -->

Created using: Nodejs, Express, Scrape-it   
  
Tested using: Jest  

### Methods

All methods must be called using HTTPS.

```javascript
Request:
    GET https://tower-lights.herokuapp.com/scheduleComplete  

    Response:

    [{
        "month": "June",
        "dates": [
            {
                "day": 1,
                "configs": [{
                    "occasions": "National Deafblind Awareness Month",
                    "colourCaption": "Blue",
                    "colours": ["blue"]
                }]
            },
            {
                "day": 30,
                "configs": [{
                    "occasions": "Arthrogryposis Multiplex Congenita Awareness Day",
                    "colourCaption": "Blue",
                    "colours": ["blue"]
                }]
            }
        ]
    }, 
    {
        "month": "July",
        "dates": [
            {
                "day": 1,
                "configs": [{
                    "occasions": "JULY National Deafblind Awareness Month",
                    "colourCaption": "Yellow",
                    "colours": ["yellow"]
                }]
            }
        ]
    }]

Request:
    GET https://tower-lights.herokuapp.com/scheduleColours 

    Response:

    ["blue","green","orange","pink","purple","red","white","yellow"]
```

<!--
ErrorsErrors are always returned as an array of error objects, keyed by errors in the top level of a JSON object:

Rate limiting
To ensure a fast and predictable experience for everyone, all our API endpoints have a rate limit of 100 calls per minute for each integration.

Common used status codes:
200 - OK
201 - Created, when resources are created
204 - No Content, on resource updates or actions
400 - Bad Request, the request contains invalid data or references non-existing resources
401 - Unauthorized, invalid or missing access token
403 - Forbidden, not allowed to access this resource
404 - Not Found, resource not found
429 - Too Many Requests, your client has reached the API rate limit
500 - Internal Server Error, something went wrong on our end
 -->
<!--
| Field       | Description                                                                        |
|-------------|------------------------------------------------------------------------------------|
| **id**      | The item's unique id.                                                              |
| deleted     | `true` if the item is deleted.                                                     |
| type        | The type of item. One of "job", "story", "comment", "poll", or "pollopt".          |
| by          | The username of the item's author.                                                 |
                     |
-->

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

Thanks goes to these wonderful people

<table>
  <tr>
    <td align="center"><a href="https://github.com/alexbelloni"><img src="https://avatars0.githubusercontent.com/u/10518847?v=4" width="100px;" alt=""/><br /><sub><b>alexbelloni</b></sub></a></td>
  </tr> 
</table>

