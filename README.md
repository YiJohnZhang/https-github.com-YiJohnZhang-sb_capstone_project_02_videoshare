# ShortCollabs
*The purpose of this project is to be a **prototype content-sharing web application** that focuses on a "Contracts" feature that encourages content creators to collaborate with another by allowing a pre-agreement of monetization distribution allowing the content algorithm to solely focus on featuring a piece of content and ignore considerations to non-randomly select a user's profile. The intention of this feature is to encourage collaboration between creatives that are not necessarily at the same popularity and potentially allow fans entry onto the platform.*

**Live Link `as of 2023-01-0`**: []() (`todo:inserlink`)
**NOTE**: This project is hosted on the **free-tier plan** on **[surge.sh](https://surge.sh/)**, a frontend hosting service; from experience, projects hosted on the free-tier has unreliable performance compared to being hosted locally. **Consider [downloading and building this project locally](`todo`:GITHUBlinkforRUNNINGandTESTINGinstructions)**: the default backend port is `:3000` and the default frontend port `:3001`.

## Special Thanks
I like to thank the following two individuals for the respective reasons:
- **Christoks Gkoros**: *Course Mentor and Project Advisor*. Provided guidance, experience, feedback, and industry insight throughout the course.
- **Anh Mai**: *Course On-Demand Mentor*. Resolved a bug that has bogged down progress for the majority of the project's development.

# Table of Contents (`todo:inserthyperlinks`)
- [01. Project Features]()
- [02. Project Details]()
	- [02.01. Running & Testing Instructions](GITHUB:RUNNING AND TESTING INSTRUCTIONS)
	- [02.02. Frontend Userflow]()
	- [02.03. Backend Routes]()
	- [02.04. Resources & Data Source]()
- [03. Misecllaneous Notes & Dump]()
	- [03.01. Further Study]()
	- [03.02. Debugging Notes]()

# 01. Project Features (`todo`)
- 
- 
- 


USER FLOWS

# 02. Project Specifications
This web application uses the **PERN** stack:
- `react` Frontend w/ Client-Side Routing using `react-router`
- `express` Backend, using `node-pg` query builder
- PostgreSQL RDBMS
- Follows RESTful Routing specifications.

Project Schema:
**`TODO: INSERT SCHEMA`**
The project proposes the following additional attributes to a `content` relation and a `content_user_join` relation to achieve the intended goals of the project's purpose:
|Attribute Name|Data Type|Example|Description|
|-|-|-|-|
|`status`|`ENUM`sql ('created', 'standby', 'published', 'legacy')|`'standby'`|This attribute is used to filter content for searching, modifying, and monetization. `standby` is for content where `participants` have all agreed to the content monetization contract, `published` is when a file has been uploaded, `legacy` content has a reduced monetization rate.|
|`owner`|`VARCHAR(USERNAME_max_len)`sql `FK`|`'user1'`|The owner of the content piece; ideally, it could be passable to another participant. This could be further expanded to which participants have permissions to edit the content details and/or invite users.|
|`contract_type`|`ENUM`sql ('solo', 'byview', 'presplit')|`'solo'`|Is the content monetization for a single user (`solo`), free-for-all to collaborators based on view and engagement due to the algorithm (`byview`), or pre-allocated such that the pre-allocated split is offered (`presplit`)?|
|`participants`|`TEXT`sql|`'["user1","user2","user3"]'`|A stringified array of usernames involved. It is `'["user1"]` if `contract_type` = `solo`.|
|`contract_details`|`TEXT`sql|`'{"views":[{"username":"user1","share":0.25}, {"username":"user2","share":0.25},{"username":"user3","share":0.5}],"engagement":[{"username":"user1","share":0.74}, {"username":"user2","share":0.21},{"username":"user3","share":0.05}]}'`|A stringified JSON object of usernames and monetization fractions in respective monetization categories. It is `'{"views":[{"username":"user1","share":1}, ],"engagement":[{"username":"user1","share":1}]}'` if `contract_type` = `solo`.|
|`contract_signed`|`TEXT`sql|Similar to `contract_details`.|A stringified array of usernames that have agreed to the contract. Used to check whether or not the content `status` may be set to `standby`.  Behaves similarly to `contract_details`.|

**Note**: This project was designed to exceed Springboard Bootcamp's final capstone project requirements.

## 02.01. Running & Testing Instructions (`todo`: finish test numbering and file renaming)
**To run the application**,
- Backend:
```sh
# go to `backend` directory
cd backend
# run `server.js`
node server.js	# by default, this starts on port 3000, the default port number is located in `config.js`
	# by default, listens on: localhost://127.0.0.1:3000
```
- Frontend:
```sh
# go to `frontend` directory
cd frontend
# start react app
npm start
	# default resource location: localhost://127.0.0.1:3001
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

```sh
# Test Tree
Tests	DIR
=====	====
		/backend
		├──	__tests__/	
29		│	├── helpers.*.js
10		│	├── router.authentication.test.js
32		│	├── router.users.test.js
15U1I	│	├── router.contents.test.js
11		│	├── router.content_user_join.test.js	# rename to "contentsusersjoin"
--		│	├── router._testCommons.test.js			# 01 but doesn't count
06		│	├── model.ContentUserJoin.test.js
--		│	├── model._testCommons.test.js			# 01 but doesn't count
--		│	└── commonTestObject._Test_Contents		# 01 but doesn't count			
			add e2e tests after submitting app, add
		├──	... 
		/frontend
		└──	src/__tests__/
			├── 
			├── 
			├── 
			├── 
			├── 
			└── 
# rename files
routerContentsUserJoin => routerContentsUsersJoin
# models
Content => Contents
Content_U... => Contents_Users_...
User => Users
```

## 02.02. Frontend Userflow (`todo`)
```sh
/										# integrates search
├──	signin/								# logout required
├──	register/							# logout required
├──	user/
│	├── [username]
│	└── [username]/[contentid]/edit		# login required, check reference user.
├──	account/							# login required
├── upload/								# login required
├── edit/[contentid]					# login required, check if participant.
├──	error/[errorCode]					# basically, show an error code and go home.
└──	logout								# login required
```
|Page|Path|Page Component|Notes|Authentication|
|-|-|-|-|-|
|Home|`/`|`HomePage`|Home page. Displays content. **Integrated Search**|None|
|Onboarding|`/login` or `/signup`|`OnboardingPage`|Use this as a common page|notLoggedIn|
|Profile|`/user/:userHandle`[1]|`ProfilePage`|Either the reference user or public.|None|
||`/account`|`EditUserPage`|loggedIn|
|Logout|`/logout`|`LogoutComponent`|A component that doesn't render anything|loggedIn|
|Error|`/error`|`ErrorPage`|Some error thrown.|None|
|EditContentPage|`/upload`|`EditContentPage`|Create a piece of content. Backend Notes: keep as is. once the create button is hit, redirect to edit content page.|loggedIn|
|EditContentPage|`/edit/:contentID`[2]|`EditContentPage`|A form to edit a piece of content.|loggedIn & check participant (push to `404` o.w.). **block request** if content status is not `open` or `standby` (last auth check).|
|EditJoinContent|`/user/:userHandle/:contentId/edit`|`EditJoinContent`|A form to edit a join content|logged in, reference user, join content exists|
- `params` aliases:
	1. `userHandle` is an alias for `username`
	2. `contentId` is an alias for `contentID`

|Page|Page Component|API Call|
|-|-|-|
|Home|`HomePage`|`searchUsers`, `searchContent`, `getAllContents`|
|Login|`OnboardingPage`|`authenticateUser`|
|Signup|`OnboardingPage`|`registerUser`|
|Logout|`LogoutComponent`|None|
|Error|`ErrorPage`|None|
|Profile|`ProfilePage`|`getUserData` (public or neq ref user) / `getFullUserData` (if reference user)|
|Profile, Edit|`EditUserPage`|`getFullUserData` / `patchUserData`|
|Content, Create|`EditContentPage`|`createContent`|
|Content, Edit|`EditContentPage`|`getFullContentData` / `patchContent`|
|Content, Publish|`EditContentPage`|`getFullContentData` / `publishContent`|
|Join Content, Edit|`EditJoinContent`|`getJoinContentData` / `patchJoinContent`|

|##|API Method Signature|Model/Method|Backend Route|
|-|-|-|-|
||`Authorization`|||
|01|`register(reqBody)`|`Authentication`/`POST`|`/authentication/register`|
|02|`login(reqBody)`|`Authentication`/`POST`|`/authentication/login`|
||`Users`|||
|03|`searchUsers(reqQuery)`|`Users`/`GET`|`/users/`|
|04|`returnUser(username)`|`Users`/`GET`|`/users/:username/`|
|05|`returnFullUserData(username)`|`Users`/`GET`|`/users/:username/edit`|
|06|`patchUser(username, reqBody)`|`Users`/`PATCH`|`/users/:username/edit`|
||`Contents`|||
|--|`returnAllPublicContents()`|`Contents`/`GET`|`/contents/`|
|07|(searchContents, doubles as #7) `searchPublicContents(reqQuery)`|`Contents`/`GET`|`/contents/`|
|08|`createContent(reqBody)`|`Contents`/`POST`|`/contents/:contentID/`|
|09|`getFullContentData(contentID)`|`Contents`/`GET`|`/contents/:contentID/edit`|
|10|`patchContent(contentID, reqBody)`|`Contents`/`PATCH` (update)|`/contents/:contentID/edit`|
|11|`publishContent(contentID, reqBody)`|`Contents`/`PATCH` (updatePublish)|`/contents/:contentID/publish`|
||`cuJoin`|||
|12|`viewPublicContent(contentID)` (username randomly generated)|`Contents_Users_Join`/`GET`|`/cujoin/:contentID/:username`|
|13|`getJoinContentData(contentID, username)`|`Contents_Users_Join`/`GET`|`/contents/:contentID/:username/`|
|14|`patchJoinContent(contentID, username, reqBody)`|`Contents_Users_Join`/`PATCH`|`/contents/:contentID/:username/edit`|
||**Unused Methods**|||
||`Users`|||
|03|`returnAllUsers()`: DISABLED|`Users`/`GET`|`/users/`|
|08|`deleteUser(username)`: DISABLED|`Users`/`DELETE`|`/users/:username`|
||`Contents`|||
|09|`returnContent(contentID)`|`Contents`/`GET`|`/contents/:contentID/`|
|10|`returnAllContents()`|`Contents`/`GET`|`/contents/`|
|12|`returnContent()`|`Contents`/`GET`|`/contents/:contentID/`|
|17|`deleteContent(contentID)`: DISABLED|`Contents`/`DELETE`|`/contents/:contentID/`|
||`cuJoin`|||
|20|`deleteJoinContent(contentID, username)`: DISABLED|`Contents_Users_Join`/`DELETE`|`/contents/:contentID/:username/`|

## 02.03. Backend Routes (`todo`)
```sh
/
├──	authorization
│	├── `POST`		/token/					# login
│	└── `POST`		/register/				# register
├──	users
│	├── `GET`		/						# return users (w/ filter)
│	├── `GET`		/[username]/			# return user by id, public info
│	├── `GET`		/[username]/edit		# return user by id, private info
│	└── `PATCH`		/[username]/edit		# update user by id, private info
│	└──	`DELETE`	/[username]/			# delete user by id
├── cujoin
|	├──	`GET`		/[username]/[contentID]			# return cujoin, public info
|	├──	`GET`		/[username]/[contentID]/edit	# return cujoin, content private information
|	├──	`PATCH`		/[username]/[contentID]/edit	# update cujoin
|	└──	`DELETE`	/[username]/[contentID]/		# delete cujoin by pk
└── contents/
	├──	`POST`		/						# create content
	├──	`GET`		/						# return contents (w/ filter)
	├──	`GET`		/[contentID]/			# return content by id, public info 
	├──	`GET`		/[contentID]/edit		# return content by id, private info
	├──	`PATCH`		/[contentID]/edit		# update content by id, default update
	├──	`PATCH`		/[contentID]/publish	# update content by id, publish it
	└──	`DELETE`	/[contentID]/			# delete content by id
```

|##|Method, Rel. Path|Model, Method|Returns|Purpose|
|-|-|-|-|-|
||`/authenticate`|**Authentication**|||
|01|`POST`, `/token`|`User`, `login()`|user auth. properties|Authenticates user credentials.|
|02|`POST`, `/register`|`User`, `register()`|user auth. properties|Creates a user.|
||`/users`|**User**|||
|03|`GET`, `/`|`User`, `getAll()`|user public properties|User search feature.|
|04|`GET`, `/:username`|`User`, `getByPK()`|user public properties|User profile page.|
|`04A`|`GET`, `-`|`CU_Join`*, `getAllUserPublicContent()`|user public content|**Supports `04`**|
|05|`GET`, `/:username/edit`|`User`, `getByPKPrivate()`|user private properties|Edit user profile page.|
|`05A`|`GET`, `-`|`CU_Join`*, `getAllUserContent()`|**`todo`**|**Supports `05`**|
|06|`PATCH`, `/:username/edit`|`User`, `update()`|user private properties|Front-end user edit.|
||`/contents`|**Content**|||
|07|`GET`, `/`|`Content`, `getAllPublic()`|arr contents (public)|**`todo`: test**Content search feature.|
|08|`POST`, `/`|`Content`, `create()`|Returns created content id|Create a new piece of content; automatically create N joins based on participants.|
|09|`GET`, ,`/:contentID/edit`|`Content`, `getByPKPrivate(contentID)`|content private properties|Get private data for editing master content template. **`todo?`**|
|10|`PATCH`, `/:contentID/edit`|`Content`, `update()`|content private properites|**`todo`** Used to update master content record before publishing.|
|11|`PATCH`, `/:contentID/publish`|`Content`, `publishUpdate()`|**`todo: test`**|Used to set the content record `status` from `standby` to `published`.|
||`/cujoin`|**Content-User `Join`**|||
|12|`GET`, `/:username/:contentID/`|`CU_Join`*, `getByPK()`|content public properties|get `participants` first then get a `random join` (for **both** `byview` and `presplit` for now).|
|13|`GET`, `/:username/:contentID/edit`|`CU_Join`*, `getByPKPrivate()`|content private properties|Edit the publicly viewable description.|
|14|`PATCH`, `/:username/:contentID/edit`|`CU_Join`*, `update()`|content private properties|**`todo`: `headersSent` error**. Edit the publicly viewable description.|
|||**Existing but not used/deprecated Routes**|||
|--|`DELETE`, `/:username`|`User`, `delete()`|Deleted record's `username`.|**Limited testing but not used concerning practices**.|
|--|`DELETE`, `/:contentID`|`Content`, `delete()`|Deleted record's `id` and `title`.|Tested but not used concerning practices.|
|--|`DELETE`, `/:username/:contentID`|`CU_Join`*, `delete()`|Deleted record's `user_id` and `content_id`|Tested but not used concerning practices (what if a user wants to restore? How?)|
||`/contents`|**Content**|||
|15A|`GET`, `/`|`Content`, `getAll()`|**deprecated**|**deprecated**|
|16|`GET`, `/:contentID`|`Content`, `getByPK(contentID)`|content public properties|**not used for this project?**|
|19|`PATCH`, `/:contentID/sign`|`Content`, `signUpdate()`|**skipped**|**skipped**. Allow a user to toggle whether or not they are signed.|
|21|`PATCH`, `/:contentID/update`|`Content`, `...`|**skipped**|**skipped**. Used by the admin to set a content record `status` from `published` to `legacy`.|
||`/cujoin`|**Content-User `Join`**|||

## 02.04. Resources & Data Source
- The sample data is dummy data.
- The user profile pictures are pulled from [xsgames.com/randomusers](https://xsgames.co/randomusers/).
- The logo is sourced from [LogoIpsum](https://logoipsum.com/). It is [logo #247](https://logoipsum.com/artwork/247).
- Content used features *That Mitchell and Webb Look*, a [British comedy duo](https://www.comedy.co.uk/tv/that_mitchell_and_webb_look/). I do not have explicit permission to feature their content.
- **Considered Resources (Notes Dump)**:
	- [Generate realistic user data](https://www.npmjs.com/package/@faker-js/faker)
	- **Material-UI / Formik/Material-UI Library** (30 minutes). `material-ui-formik` is deprecated and `@material-ui/core` has been deprecated for `React > 16.8`.
	- **TikTok Content** is difficult to use. It seems that one is **only** able to [embed TikTok](https://developers.tiktok.com/doc/embed-videos/) videos either through HTML embedding or through its [API]() .______.
- TikTok API Instructions:
- `POST` request, details:
- request `header` requires: the application to provide `authorization` token and `content-type` fields:
	- `authorization`: obtained through `/oauth/access_token/`
	- `content-type`: `application/json`
- request `body` requires: `filters` obj (self-explanatory)
	- I only care about a pre-determined video id.
```js
// curl
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

// loose axios equiv req template
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

# 03. Project Conclusions
`todo` inser text??

## 03.01. Further Study (`todo`: organize)
Some suggested improvements to this concept are:
1. **admin dashboard**. admin dashboard to demonstrate potential of the present database schema design, specifically the `ENUM`sql types
2. **realistic schema**. implement "hidden" status for suspended users/content?
3. **user qol and privacy**. do an invitation-based "participants" system so that the invited user has to confirm before added to a content page; allow users to fully block or restrict invites.
4. **real-time editing**. use a websockets connection for editing a `byview` or `presplit` collab to quickly negotiate an agreement 
5. **intergrated communication**. maybe an integrated chat system, i.e. 3rd party or built-in integrated with the application to facilitate communication between users to organize collabs.
6. **user safety**. given that social media connects many users, implement a "parental controls" or "guardian" feature to protect underage users that may want to use the collabs feature. this could be a "guardian account" acting as an "agent" for the underage user where any invitations to an underage user must be accepted by the respective "guardian account".
7. **MORE TIME SPENT ON DOCUMENTATION BEFOREHAND**.
- **Technical**
	- **Use Flask Backend**: Since this is a prototype application, form validation w/ wtforms is much more straightforward and less time-consuming to use.
	- 
- Concerning the Contracts ("SetAgreement") feature UI to set contract & sign:
	- Considering decimal slider input or relative input (send to a `PUT`/`PATCH`-called function that ).
	- **Front-End**: "make it even button", Math.floor(first"Repeated"Digits(1/[number of participants]))/[number of participants])
- Concerning the Contracts ("SetAgreement") feature UI to invite users:
	- Users will receive an "invite" before being listed as a participant; Users may set their invite settings to (`Anyone`, `No One`), (`Followers & Following`, `Followers`, `Following`), (`Friends / Mutal Friends`?)
	- Real-time backend validation user search (make the search bar in the frontend a Component and import it into the Content creation page).
	- Complimentary backend validation of submitted participants users (I am guessing `SELECT username FROM users WHERE username = $1 OR ... = $n` and check against the results).
	- Hide users < 18 to be found unless linked parent/guardian account that can act as an intemediatary?
- Concerning Elevated Users
	- **Schema**: change `isElevated` to `isAdmin` 
	- **More Routes**: admin/moderator dashboard to demonstrate full potential of the database schema design.
	- admin delete content ()
- Concerning Users & Contents
	- Best practices for implementing `DELETE` routes
- do an invitation-based `participants` invite system so that the invited user has to confirm before added to a content page
- add an additional "social aspect" (chatting, messaging?) to organize collabs; use the `verified`/`parental_controls`/`birthdate` to 
- had difficulty giving access to "invited" users to edit the main content.
- content creation: when adding a username, on the frontend, validate it.
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

## 03.02. Debugging Notes
1. Express Middleware has a a bias for falsey i.e. (`middlewareAAE.js: isReferenceUserOrAdmin`):
```js
//	works correctly (only throws error if `notRefUserOrAdmin` is true, otherwise `nxt()`):
{

//	...
	// if(!req.params.username === res.locals.user.username && !await checkAdminHelper(res.locals.user))
	if(notRefUserOrAdmin)
		nxt(new UnauthorizedError(`Neither the user, ${req.params.username}, and/or admin`));

	nxt();

}

// works incorrectly (throws error even if `isRefUserOrAdmin` is true)

{
	//	...
	// if(req.params.username === res.locals.user.username || await checkAdminHelper(res.locals.user))
	if(isRefUserOrAdmin)
			nxt();

	nxt(new UnauthorizedError(`Neither the user, ${req.params.username}, and/or admin`));

}
```
2. `supertest` request throws `ECONNREFUSED 127.0.0.1:80` if there is no `/` prefix: https://stackoverflow.com/a/58919202
3. 

# 04. Time Tracker
- **Seeding User Database + Schema Design**: 09h08m
- **Backend**: 
	- Being Generally Confused What Does What because of lack of Documentation and Schema Revisions: 50h52m
	- Being Less Confused about the Backend (post-Frontend Work): 1_h__m
- **Frontend**: 20h__m

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
|30|update users; `contents`|2022-12-31|00:55 - 02:38|103|
|31|`contents` work|2022-12-31|10:48 - 12:06|78|
|32|`contents` and `cu_join` work|2022-12-31|15:34 - 18:23|169|
||**DEPRECATED: 50.01.04**. Routes (Backend)||**Net Total Time**|3052 min (50h52m)|
|38|**salvaging backend #2**...|2023-01-02|10:51 - 11:29|38|
|39|finish backend?|2023-01-02|13:41 - 14:24|43|
|40|finished sql query helper method|2023-01-02|15:10 - 16:25|75|
|41|beckned...ok querying thing works, now to patch it up :)|2023-01-02|17:20 - 17:53|33|
|42|fin `content.js`?|2023-01-02|18:38 - 20:30|112|
|43|.-. backend work. finished `Users`|2023-01-02|22:02 - 23:54|112|
|44|more cursed "Cannot set headers after they are sent to the client. in `Content_User_Join.js`|2023-01-03|09:17 - 11:04|107|
|45|renamed `router._testCommons` to `router._testCommons.test`; updated documentation for project clarity .___.|2023-01-03|14:00 - 15:52|112|
|46|documentation for project clarity; start `ContentUserJoin` model test|2023-01-03|17:56 - 18:42|46|
|48|`cujoin` tests|2023-01-04|08:53 - 10:03|70|
|49|resolved `headersSet` error|2023-01-05|18:59 - 19:18|19|
|50|`contents` and `cujoin` work|2022-01-06|15:11 - 17:43|152|
|52|fin `user` (again)|2022-01-07|10:22 - 11:42|80|
|53|`contents` & ...|2022-01-07|12:28 - 1:||
|54||2022-01-07|: - :||
52	53
999	---
||**50.01.04**. Routes (Backend)||**Net Total Time**| (--h--m)|
|11|application setup and skeleton; need to work on `./src/helpers/api.js`|2022-12-26 - 2022-12-27|22:15 - 00:47|152|
|16|exploring `formik` for frontend, attempted `material-ui`, alongside other express form validation and/or styling libraries; db work|2022-12-28|16:01 - 18:24|143|
|27|onboarding and frontend styling|2022-12-30|17:02 - 18:03|61|
|28|frontend styling + API|2022-12-30|18:24 - 20:34|130|
|33|bulk of `HomePage`, styling and documentation|2022-12-31|21:43 - 23:36|113|
|34|`ProfilePage`|2023-01-01|08:16 - 09:16|60|
|35|Finished all of `EditUserPage`, `EditContentPage`, `OnboardingPage`, `HomePage`. awaiting API.|2023-01-01|13:37 - 17:22|225|
|36|Updated styling (Home, Onboarding, EditContent, EditUser); `UserCard`, `ContentCard`, `ErrorPage`, `ProfilePage` layout (await API), tests.|2023-01-01|20:03 - 22:58|175|
|37|logo, styling, `api.js` work, and documentation|2023-01-02|08:19 - 10:30|131|
|5||2023-01-07|: - :||
37		38
1190	
||**50.01.05**. Application (Front-End)||**Net Total Time**| (--h--m)|
|29|`README.md` work|2022-12-30|20:54 - 22:05|71|
|47|update documentation.|2022-01-03|21:55 - 22:18|23|
|51|build to-do list|2022-01-06|20:15 - 21:10|55|
149

||||**Total Time**|_ minutes (--h--m)|