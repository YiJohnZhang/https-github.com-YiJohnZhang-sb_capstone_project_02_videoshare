# ShortCollabs
*The purpose of this project is to be a **prototype content-sharing web application** that focuses on a "Contracts" feature that encourages content creators to collaborate with another by allowing a pre-agreement of monetization distribution allowing the content algorithm to solely focus on featuring a piece of content and ignore considerations to non-randomly select a user's profile. The intention of this feature is to encourage collaboration between creatives that are not necessarily at the same popularity and potentially allow fans entry onto the platform.*

See how much I can finish in 2 weeks time, eh?

**Live Link `as of 2022-12-3/2023-01-0`**: []() (`todo:inserlink`)
Note: **This project is hosted on a free front-end host so the performance is worse and may be more buggy than if used locally. Consider downloading and hosting it locally. The back-end is by default set to port `3000` and the front-end is by default set to port `3001`.**

# Table of Contents (`todo:inserthyperlinks`)
- [01. Project Features]()
- [02. Project Specifications]()
	- [02.01. Running & Testing Instructions]()
	- [02.02. Back-end Routes]()
	- [02.03. Front-end Routes]()
	- [02.04. Data Source]()
	- [02.05. Further Study]()
- [03. Misecllaneous Notes & Dump]()
	- [03.01. Time Tracker]()
	- [Other Dump Notes (to delete)]()

# 01. Project Features
The project implements a:
- User base with authorization routes.
- Implements a 

# 02. Project Specifications
This project was developed to exceed Springboard Bootcamp's project requirements: instead of focusing on the front-end, and using a readily available backend API, I built my own API.

This web application uses the **PERN** stack:
- `react` Front-end w/ Client-Side Routing using `react-router`
- `express` Back-end, using `node-pg`
- PostgreSQL RDBMS

Project Schema:
**`TODO: INSERT SCHEMA`**
The project proposes the following attributes to a relation to achieve the intended goals of the project's purpose:
|Attribute Name|Data Type|Example|Description|
|-|-|-|-|
|`status`|`ENUM`sql ('created', 'standby', 'published', 'legacy')|`'standby'`|This attribute is used to filter content for searching, modifying, and monetization. `standby` is for content where `participants` have all agreed to the content monetization contract, `published` is when a file has been uploaded, `legacy` content has a reduced monetization rate.|
|`owner`|`VARCHAR(USERNAME_max_len)`sql `FK`|`'user1'`|The owner of the content piece; ideally, it could be passable to another participant. This could be further expanded to which participants have permissions to edit the content details and/or invite users.|
|`contract_type`|`ENUM`sql ('solo', 'byview', 'presplit')|`'solo'`|Is the content monetization for a single user (`solo`), free-for-all to collaborators based on view and engagement due to the algorithm (`byview`), or pre-allocated such that the pre-allocated split is offered (`presplit`)?|
|`participants`|`TEXT`sql|`'["user1","user2","user3"]'`|A stringified array of usernames involved. It is `'["user1"]` if `contract_type` = `solo`.|
|`contract_details`|`TEXT`sql|`'{"views":[{"username":"user1","share":0.25}, {"username":"user2","share":0.25},{"username":"user3","share":0.5}],"engagement":[{"username":"user1","share":0.74}, {"username":"user2","share":0.21},{"username":"user3","share":0.05}]}'`|A stringified JSON object of usernames and monetization fractions in respective monetization categories. It is `'{"views":[{"username":"user1","share":1}, ],"engagement":[{"username":"user1","share":1}]}'` if `contract_type` = `solo`.|
|`contract_signed`|`TEXT`sql|Similar to `contract_details`.|A stringified array of usernames that have agreed to the contract. Used to check whether or not the content `status` may be set to `standby`.  Behaves similarly to `contract_details`.|

## 02.01. Use Instructions
**To run the application**,
- Backend:
```sh
# go to `backend` directory
cd backend
# run `server.js`
node server.js	# by default, this starts on port 3000, the default port number is located in `config.js`
```
- Frontend:
```sh
# go to `frontend` directory
cd frontend
# 
npm start
```

**To run the tests**,
- Backend tests are located on `./backend/__tests__`:
```sh
jest
```
- Frontend tests are located on `./frontend/src/__tests__`:
```sh
npm test	# alias for `react-scripts test` in `package.json`
```

## 02.02. Back-end Routes (`todo`)
```sh
/
├──	authorization/
│	├── token/			# login
│	└── register/		# register
├──	users
│	├── `GET`	/				# return users w/ filter
│	├── `GET`	/[username]		# return user by id, public information only
│	├── `DELETE`/[username]		# delete user by id
│	├── `GET`	/[username]		# return user by id, private information
│	└── `PATCH`	/[username]		# update user by id, private information
└── contents/
	├──	
	|	├──	
	│	└── 
	└──	
```

## 02.03. Front-end Userflow (`todo`)
```sh
/
├──	?search
├──	signin/					# logout required
├──	register/				# logout required
├──	users/
│	├── [username]
│	└── [username]/edit		# login required
├──	contents/
│	├── [contentid]			# 2022-12-30: redirects to a random [contentid]/[username] if multiple individuals?
│	├── new					# login required
│	└── [contentid]/edit	# login required (multiple types depending on authentication)
└── logout					# login required
# Idea: if 403, return to home.
```

## 02.04. Data Source
- The sample data is dummy data.
- Content used is by *ThatMitchellAndWebbLook*, a British comedy duo. I do not have explicit permission to feature their content; it is sample content.

## 02.05. Further Study
Some suggested improvements to this concept are:
1. **admin dashboard**. admin dashboard to demonstrate potential of the present database schema design, specifically the `ENUM`sql types
2. **realistic schema**. implement "hidden" status for suspended users/content?
3. **user qol and privacy**. do an invitation-based "participants" system so that the invited user has to confirm before added to a content page; allow users to fully block or restrict invites.
4. **real-time editing**. use a websockets connection for editing a `byview` or `presplit` collab to quickly negotiate an agreement 
5. **intergrated communication**. maybe an integrated chat system, i.e. 3rd party or built-in integrated with the application to facilitate communication between users to organize collabs.
6. **user safety**. given that social media connects many users, implement a "parental controls" or "guardian" feature to protect underage users that may want to use the collabs feature. this could be a "guardian account" acting as an "agent" for the underage user where any invitations to an underage user must be accepted by the respective "guardian account".


## Routes
-	Ok, so `/` for auth, `contents/` and `users/` for respective models.
	- `users/` focuses on returning the users content
	- `contents/` focuses on returning the contract and content with user(s) involved

# 03. Misecllaneous Notes & Dump
## `Todo`
- finish `contents` & `cu_join`: routing/model
- `contents`/`cu_join` plan dump
- 

## 03.01. Time Tracker
|Session|Task(s)|Date|Time|Time Elapsed (min)|
|-|-|-|-|-|
|01|db design, seed|2022-12-12|18:25 - 22:19|234|
|02|db seeding, continued (content)|2022-12-14|13:36 - 15:58|142|
|03|db seeding script and fixing typo|2022-12-14|19:47 - 22:29|162|
|04|fix db seeding|2022-12-15|18:45 - 18:55|10|
||**50.01.03**. Data Sourcing||**Net Total Time**|548 (09h08m)|
|05|starting TDD of `backend`|2022-12-19 - 2022-12-20|21:43 - 00:31|168|
|06||2022-12-20|10:54 - 12:26|92|
|07||2022-12-20|15:09 - 19:41|512|
|08||2022-12-21 - 2022-12-22|22:23 - 00:43|140|
|09||2022-12-22|12:33 - 13:40|67|
|10||2022-12-22|19:50 - 23:16|206|
|11|`frontend` work||||
|12||2022-12-27|11:11 - 12:17|66|
|13|finished models|2022-12-27 - 2022-12-28|21:51 - 01:03|192|
|14|router templating|2022-12-28|09:58 - 12:21|143|
|15|routers|2022-12-28|13:37 - 15:43|126|
|17|db work|2022-12-28|19:50 - 21:50|120|
|18|routers|2022-12-28|22:38 - 23:55|77|
|19|db revision (added `is_active` to `contents_user_join`), added the inevitable `Content_User_Join` model. need to reprint a schema|2022-12-29|09:52 - 11:06|74|
|20|salvaging current project...; database redesign: done; roles/ru_join: done;|2022-12-29|13:04 - 16:19|95|
|21|finish contents?|2022-12-29|17:16 - 18:22|66|
|22|finish contents?|2022-12-29|18:59 - 22:16|197|
|23|pathing users....|2022-12-29 - 2022-12-30|22:32 - 00:31|119|
|24|`auth`, and some `content`|2022-12-30|02:29 - 03:27|58|
|25|contents work; reinstalled github; crashed|2022-12-30|09:59 - 11:45|106|
|26|`contents` `model` based on `router`|2022-12-30|13:58 - 15:16|78|
|27|`frontend` work||||
|28|`frontend` work||||
|29|`README.md` work|||2702|
|30|update users; `contents`|2022-12-31|00:55 - 02:38||
|31|`contents` work|2022-12-31|10:48 - :||
|32|`contents` |2022-12-31|: - :||
|33|`contents` |2022-12-31|: - :||
29(26)	30
2702		

||**50.01.04**. Routes (Backend)||**Net Total Time**| (--h--m)|
|11|application setup and skeleton; need to work on `./src/helpers/api.js`|2022-12-26 - 2022-12-27|22:15 - 00:47|152|
|16|`formik` for front-end, attempted `material-ui`; db work|2022-12-28|16:01 - 18:24|143|
|27|onboarding and frontend styling|2022-12-30|17:02 - 18:03|61|
|28|frontend styling + API|2022-12-30|18:24 - 20:34|130|
|3||2022-12-31|: - :||
|3||2022-12-31|: - :||
|3||2022-12-31|: - :||
|3||2022-12-31|: - :||
||**50.01.05**. Application (Front-End)||**Net Total Time**| (--h--m)|
|29|`README.md` work|2022-12-30|20:54 - 22:05|71|
|3||2022-12-31|: - :||
||||**Total Time**|_ minutes (--h--m)|

## More Time Wishlist
- use Python Flask/React: form validation is much more straightforward and it is good for prototyping
- better UI to set contract & signed
- hide in progress 
- admin dashboard to demonstrate full potential of the database schema design.
- admin delete content ()
- more time: delete content joins individually (`./models/Content.js`); remove master delete by owner (from database schema design)
- do an invitation-based `participants` invite system so that the invited user has to confirm before added to a content page
- add an additional "social aspect" (chatting, messaging?) to organize collabs; use the `verified`/`parental_controls`/`birthdate` to 
- had difficulty giving access to "invited" users to edit the main content.
- content creation: when adding a username, on the frontend, validate it.

- `Content_User_JOIN.js: update` 2022-12-29 Note: generalize for composite PK by passing in pk as object and do a parameterizedWHERE query builder on it

## `express.js` Notes
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

## Resource Notes
- [Generate realistic user data](https://www.npmjs.com/package/@faker-js/faker)
- [Logo Generator](https://logoipsum.com/)

## Resource Notes (Material-UI? Formik/Material-UI?)
30 minutes: Note: `material-ui-formik` is deprecated and `@material-ui/core` has been deprecated to support `React > 16.8`

## Resource Notes (Content)
Ok so there two ways to request a TikTok Video: 1) [embedding videos](https://developers.tiktok.com/doc/embed-videos/) or 2) its API, apparently a `POST`, request to retrieve a video. Apparently the latter method doesn't seem to return a video: .________.

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