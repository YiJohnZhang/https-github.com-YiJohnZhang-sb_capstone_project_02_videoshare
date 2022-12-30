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
- Manually generated.

## Routes
-	Ok, so `/` for auth, `contents/` and `users/` for respective models.
	- `users/` focuses on returning the users content
	- `contents/` focuses on returning the contract and content with user(s) involved

# Notes
- [Generate realistic user data](https://www.npmjs.com/package/@faker-js/faker)
- [Logo Generator](https://logoipsum.com/)

## Time Tracker
|Session|Task(s)|Date|Time|Time Elapsed (min)|
|-|-|-|-|-|
|01|db design, seed|2022-12-12|18:25 - 22:19|234|
|02|db seeding, continued (content)|2022-12-14|13:36 - 15:58|142|
|03|db seeding script and fixing typo|2022-12-14|19:47 - 22:29|162|
|04|fix db seeding|2022-12-15|18:45 - 18:55|10|
||**50.01.03**. Data Sourcing||**Net Total Time**|548|
|05|starting TDD of `backend`|2022-12-19 - 2022-12-20|21:43 - 00:31|168|
|06||2022-12-20|10:54 - 12:26|92|
|07||2022-12-20|15:09 - 19:41|512|
|08||2022-12-21 - 2022-12-22|22:23 - 00:43|140|
|09||2022-12-22|12:33 - 13:40|67|
|10||2022-12-22|19:50 - 23:16|206|
|12||2022-12-27|11:11 - 12:17|66|
|13|finished models|2022-12-27 - 2022-12-28|21:51 - 01:03|192|
|14|router templating|2022-12-28|09:58 - 12:21|143|
|15|routers|2022-12-28|13:37 - 15:43|126|
|16|`formik` for front-end, attempted `material-ui`; db work|2022-12-28|16:01 - 18:24|143|
|17|db work|2022-12-28|19:50 - 21:50|120|
|18|routers|2022-12-28|22:38 - 23:55|77|
|19|db revision (added `is_active` to `contents_user_join`), added the inevitable `Content_User_Join` model. need to reprint a schema|2022-12-29|09:52 - 11:06|74|
|20|salvaging current project...; database redesign: done; roles/ru_join: done;|2022-12-29|13:04 - 16:19|180+15=195|
|21|finish contents?|2022-12-29|17:16 - 18:22||
|22|finish contents?|2022-12-29|18:59 - 22:16||
|23|finish contents?|2022-12-29|22:32 - :||
|24|finish contents?|2022-12-29|: - :||
|25|finish contents?|2022-12-29|: - :||
|26|finish contents?|2022-12-29|: - :||
19		20
2052	

||**50.01.04**. Routes (Backend)||**Net Total Time**||
|11|application setup and skeleton; need to work on `./src/helpers/api.js`|2022-12-26 - 2022-12-27|22:15 - 00:47|152|
|2||2022-12-29|: - :||
|2||2022-12-29|: - :||
||**50.01.05**. Application (Front-End)||**Net Total Time**||
||||**Total Time**|_ minutes|

## Back-end Todo
- add Comments on schema
- update shcema img
- 

## More-Time Wishlist
- admin dashboard to demonstrate full potential of the database schema design.
- admin delete content ()
- more time: delete content joins individually (`./models/Content.js`); remove master delete by owner (from database schema design)
- do an invitation-based `participants` invite system so that the invited user has to confirm before added to a content page
- add an additional "social aspect" (chatting, messaging?) to organize collabs; use the `verified`/`parental_controls`/`birthdate` to 
- had difficulty giving access to "invited" users to edit the main content.

- `Content_User_JOIN.js: update` 2022-12-29 Note: generalize for composite PK by passing in pk as object and do a parameterizedWHERE query builder on it

## exp
- there is a bias for falsey for express middleware, i.e. (`middlewareAAE.js: isReferenceUserOrAdmin`):
```js
//	works correctly (only throws error if `notRefUserOrAdmin` is true, otherwise `nxt()`):

// if(!req.params.username === res.locals.user.username && !await checkAdminHelper(res.locals.user))
if(notRefUserOrAdmin)
	nxt(new UnauthorizedError(`Neither the user, ${req.params.username}, and/or admin`));

nxt();

// works incorrectly (throws error even if `isRefUserOrAdmin` is true)
// if(req.params.username === res.locals.user.username || await checkAdminHelper(res.locals.user))
if(isRefUserOrAdmin)
		nxt();

nxt(new UnauthorizedError(`Neither the user, ${req.params.username}, and/or admin`));
```

## Material-UI
30 minutes: Note: `material-ui-formik` is deprecated and `@material-ui/core` has been deprecated to support `React > 16.8`

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