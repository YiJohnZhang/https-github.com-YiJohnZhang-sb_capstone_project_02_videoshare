# ShortCollabs
*description*
See how much I can finish in 2 weeks time, eh?

## Table of Contents
- [01. Project Overview]()
- [02. Project Specifications]()
  - [02.01. Data Source]()
  - [02.02. Routes]()
  - []()
- [03. Notes]()

# Project Overview


# Project Specifications
- 
- 
- 
- 

## Data Source


## Routes

# Notes
- [Generate realistic user data](https://www.npmjs.com/package/@faker-js/faker)
- [Logo Generator](https://logoipsum.com/)

## Time Tracker
|Session|Task(s)|Date|Time|Time Elapsed (min)|
|-|-|-|-|-|
|01|db design, seed|2022-12-12|18:25 - 22:19|234|
|02|db seeding, continued (content)|2022-12-14|13:36 - 15:58|142|
|03|db seeding script and fixing typo|2022-12-14|19:47 - 22:29|162|
|04|fix db seeding|2022-12-15|18:45 - :||
||**50.01.03**. Data Sourcing||**Net Total Time**|538|
|05||2022-12-1|: - :||
|06||2022-12-1|: - :||
|07||2022-12-1|: - :||
|08||2022-12-1|: - :||
|09||2022-12-1|: - :||
|10||2022-12-1|: - :||
||||**Total Time**|_ minutes|

to do:
update database schema for the following variables (AND DOUBle check `seed_contents.csv`)
```sql
-- users: password->pwd; description->bio
-- contents: status -> video_status, owner -> content_owner
-- contents_users_join: description->content_description
```


## User Data Notes
- **Do the FOLLOWING *AFTER* finished building routing**:
	- `seed_contents.csv`: Any cell with "2022-12-14: TODO" value
	- `seed_users.csv`: Any cell with "2022-12-14: TODO" value (**passwords**)
Ok so there two ways to request a TikTok Video: 1) [embedding videos](https://developers.tiktok.com/doc/embed-videos/) or 2) its API, apparently a `POST`, request to retrieve a video. Apparently the latter method doesn't seem to return a video: **rip a select few for content and save it locally...** .__________________________________.

`POST` request, details:
- request `header` requires: the application to provide `authorization` token and `content-type` fields:
	- `authorization`: obtained through `/oauth/access_token/`
	- `content-type`: `application/json`
- request `body` requires: `filters` obj (self-explanatory)
	- I only care about a pre-determined video id.

Example:
- `curl`
```js
curl -L -X POST 'https://open.tiktokapis.com/v2/video/query/?fields=id,title' \
-H 'Authorization: Bearer act.1d1021d2aee3d41fee2d2add43456badMFZnrhFhfWotu3Ecuiuka27L56lr!2323' \
-H 'Content-Type: application/json' \
--data-raw '{
    "filters": {
        "video_ids": [
            "7077642457847991554",
            "7080217258529737986"
        ]
    }
}
```
- `axios`(rough equivalent)
```js
// tiktok axios request template
import {BEARER_TOKEN} from './config';	// get from a secret file or server env.
const BASE_URL = "https://open.tiktokapis.com/v2/video/query/?fields=id,title";
const config = {

	"Authorization": `Bearer ${BEARER_TOKEN}`,
	"Content-Type": 'application/json'

}

let requestData = {filters: video_ids};

	// set `video_ids` = [...];

	const response = await axios.post(BASE_URL, requestData, config)
	// if it were a `GET` request: axios.get(`${BASE_URL}/${videoID}`, config);

// parse the response
response.data.videos[INDEX];
```
