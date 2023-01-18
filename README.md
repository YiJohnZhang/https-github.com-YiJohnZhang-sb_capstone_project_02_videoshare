# ShortCollabs
*The purpose of this project is to be a **prototype content-sharing web application** that focuses on a "Contracts" feature that encourages content creators to collaborate with another by allowing a pre-agreement of monetization distribution allowing the content algorithm to solely focus on featuring a piece of content and ignore considerations to non-randomly select a user's profile. The intention of this feature is to encourage collaboration between creatives that are not necessarily at the same popularity and potentially allow fans entry onto the platform.*

**Live Link, as of 2023-01-19**: []() (`todo:inserlink`)
**NOTE**: This project is hosted on the **free-tier plan** on **[surge.sh](https://surge.sh/)**, a frontend hosting service; from experience, projects hosted on the free-tier has unreliable performance compared to being hosted locally. **Consider [downloading and building this project locally](`todo`:GITHUBlinkforRUNNINGandTESTINGinstructions)**: the default backend port is `:3000` and the default frontend port `:3001`.

## Special Thanks
I like to thank the following two individuals for the respective reasons:
- **Christos Gkoros**: *Course Mentor and Project Advisor*. Provided guidance, experience, feedback, and industry insight throughout the course.
- **Anh Mai**: *Bootcamp On-Demand Mentor*. Resolved a bug that has bogged down progress for the majority of the project's early development (backend).

# Table of Contents
- [01. Project Features](#01-project-features)
	- [01.01. Sample Userflow](#0101-sample-userflow)
	- [01.02. High-Priority Features](#0102-high-priority)
	- [01.03. Develpoment Build Suggestions](#0103-develpoment-build-suggestions)
	- [01.04 Other Notes](#0104-other-notes)
- [02. Project Details](#02-project-specifications)
	- [02.01. Running & Testing Instructions](`todo`:GITHUBlinkforRUNNINGandTESTINGinstructions)	#0201-running--testing-instructions
	- [02.02. Frontend Documentation](#0202-frontend-documentation)
	- [02.03. Backend Documentation](#0203-backend-documentation)
	- [02.04. Resources & Data Source](#0204-resources--data-source)
- [03. Project Conclusions](#03-project-conclusions)
	- [03.01. Some Ideas Dump](#0301-some-ideas-dump)
	- [03.02. Debugging Notes](#0302-debugging-notes)

# 01. Project Features
- An editable User Model representing the userbase; user profiles are editable.
	- *`DELETE` is disabled from the frontend concerning the extent the database should maintain consistency (ACID)*.
- An editable Content Model representing contents [with **6 additional properties** to allow posted contents have multiple "participants" and "agree" on a monetization model before publishing the content. The monetization model, `contract_details`, is stringified JSON for a conceptual monetization API](#02-project-specifications).
	- *`DELETE` is disabled from the frontend concerning the extent the database should maintain consistency (ACID)*.
- An editable Content-User Join Model to allow multiple users to work together and write their own descriptions for a piece of content.
	- *`DELETE` is disabled from the frontend concerning the extent the database should maintain consistency (ACID)*.
- Built with PERN Stack.

## 01.01. Sample Userflow

[![public search api](todo: imageLink)](githublink.mp4)
**01.01.A. *The Search API (Public)***. One Searchbar for searching either Content or Users

[![user login & content publishing](todo: imageLink)](githublink.mp4)
**01.01.B. *User Login and Content Publishing***. Once content is published, it is publicly viewable. The join record has an independent description field than that of the master record. Content cards display participating users.

[![user editing & content creation](todo: imageLink)](githublink.mp4)
**01.01.C. *User Editing & Content Creation API***. Creating content with an added participant automatically creates a corresponding record to the participating user.

[![join records are dynamic](todo: imageLink)](githublink.mp4)
**01.01.D. *Join Records for a Piece of Content***. Join record(s) for a piece of content are updated automatically depending whether or not a user is invited or not.

[![publish is a single-purpose method](todo: imageLink)](githublink.mp4)
**01.01.E. *Publishing is a single-purpose method.***. The publish call is single-purpose, one must update it first (for now) then publish).

[![registering a user, `testuser`](todo: imageLink)](githublink.mp4)
**01.01.D. *Register User***. Registering `testuser`.


- Public: show video of searching and users
	1. video search:
	2. user search:
	3. user public profile "shawn89", "mitchellandwebb"
- user login
- user editing
- content creation (2 effectively implemented stages)

## 01.02. High-Priority
1. **Model, Critical**: Resolve the extent ACID is to be preserved for this database
2. **GUI, Critical**: GUI contract "detail" modification (share modification) & "signing" w/ client-side calculator to make sure proposed range is 0 < x < 1 && 0.9(5?) < \Sigma(x_i) < 1
3. **GUI, QOL**: For the `ContentCard`, display participants picture with participants username as tooltip to fit more before truncating the number of participants shown
4. **Model**: Searchable user field when adding participants, privacy settings to block being added, and server-side valid participant validation
5. **GUI, User Profile**: left-justify the contents.
6. **Content Hashing**: There now shouldn't be a reason for duplicate content. contents maybe get an un-watermarked "hash" to aid finding duplicate content.

## 01.03. Develpoment Build Suggestions
1. **An Open-Source Project for React (forms)**: A class-definable form-validation (i.e. formik + configurable class fields/input-label element patterns), [Flask-WTF!@#$]() with Jinja templating is an excellent example.
2. Schema Design / JSONSchema Notes
	- `user.updateTypeUser.schema.json` Note: since all content in this db is local, `picture` does NOT have to be a `uri` format string

## 01.04 Other Notes
- `user.updateTypeUser.schema.json` Note: since all content in this db is local (hosted on `/public`, rather than another backend where the img data is stored), `picture` does NOT have to be a `uri` format string

# 02. Project Specifications
This web application uses the **PERN** stack:
- `react` Frontend w/ Client-Side Routing using `react-router`
- `express` Backend, using `node-pg` query builder
- PostgreSQL RDBMS
- Follows RESTful Routing specifications **excluding the singular/plural resources pattern**.
- **Test Statistics**
	- **Backend**: **~150 Unit Tests** (take a few); **~5 Integration & E2E Tests** (give a few)
	- **Frontend**: **24 Simple Tests** (Component Smoke and Snapshot Tests); **0 Event Tests** (focused on backend tests)

Project Schema:
![todo: schema_img](imageLink)
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

## 02.01. Running & Testing Instructions
**Running the Application**
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

**Testing the Application**,
- Backend tests are located on `./backend/__tests__`:
```sh
jest --runInBand
# CAUTION: this must be runInBand
```
- Frontend tests are located on `./frontend/src/__tests__`:
```sh
npm test	# alias for `react-scripts test` in `package.json`
```

```sh
# Test Directory
/backend
├──	__tests__/
│	├── helpers.createTokeNHelper.test.js
│	├── helpers.sqlQueryingHelper.test.js
│	├── helpers.arrayEqualityHelper.test.js
│	├── helpers.objectStringifyAndParseHelper.test.js
│	├── router._testCommons.test.js
│	├── router.authentication.test.js
│	├── router.users.test.js
│	├── router.content.test.js
│	├── router.content.e2e.test.js
│	├── router.content_user_join.test.js
│	├── router._testCommons.test.js
│	├── model._testCommons.test.js
│	├── model.ContentUserJoin.test.js
│	└── commonTestObject._Test_Contents
├──	... 
/frontend
├──	...
└──	src/__tests__/
	├── App.test.js						# smoke & snapshot test, really went all out for the backend on this project
	├── NavBar.test.js					# smoke & snapshot test, really went all out for the backend on this project
	├── HomePage.test.js				# smoke & snapshot test, really went all out for the backend on this project
	├── ErrorPage.test.js				# smoke & snapshot test, really went all out for the backend on this project
	├── OnboardingPage.test.js			# smoke & snapshot test, really went all out for the backend on this project
	├── ProfilePage.test.js				# smoke & snapshot test, really went all out for the backend on this project
	├── EditUserPage.test.js			# smoke & snapshot test, really went all out for the backend on this project
	├── ContentPage.test.js				# smoke & snapshot test, really went all out for the backend on this project
	├── EditContentPage.test.js			# smoke & snapshot test, really went all out for the backend on this project
	├── EditJoinContentPage.test.js		# smoke & snapshot test, really went all out for the backend on this project
	├── ContentCard.test.js				# smoke & snapshot test, really went all out for the backend on this project
	└── UserCard.test.js				# smoke & snapshot test, really went all out for the backend on this project
```

## 02.02. Frontend Documentation
```sh
/
├──	signin/
├──	register/	
├──	user/
│	├── [username]
│	└── [username]/[contentid]/edit
├──	account/
├── create/
├── edit/[contentid]
├──	error/[errorCode]
└──	logout
```

|##|Page|Path|Page Component|Fe Router Auth.|Notes|API Call(s)|
|-|-|-|-|-|-|-|
|01|Home|`/`|`HomePage`|None|Home page, landing page. **Integrates search** w/out search history; right now displays master content description.|`searchUsers`, `searchPublicContent`, `getAllPublicContent`|
|02A|Login|`/login`|`OnboardingPage`|notLoggedIn|To login.|`authenticateUser`|
|02B|Signup|`/register`|`OnboardingPage`|""|To signup.|`registerUser`|
|03|Logout|`/logout`|`LogoutComponent`|loggedIn|To logout. Doesn't render anything. `/` if error|None|
|04|Error|`**??**`|`ErrorPage`|None|Error page. Hot link to home.|None|
|05|Profile|`/user/:userHandle`|`ProfilePage`|None|push to `/error` if error|`getUserData` (public or neq ref user), `getAllUserData` (ref user)|
|06|Profile, Edit|`/account`|`EditUserPage`|loggedIn|push to `/` if error|`getFullUserData`, `patchUserData`|
|07|Content|`/content/:contentID`|`ContentPage?`|None|displays content (displays a random join content for now)|`selectContent`, `getContentData`|
|08A|Content, Create|`/create`|`EditContentPage`|loggedIn|push to `/` if error|`createContent`|
|08B|Content, Edit|`/edit/:contentID`|`EditContentPage`|loggedIn|push to `/error` if error|`getFullContentData`, `patchContentData`, `publishContent`|
|09|Join Content, Edit|`/user/:userHandle/:contentId/edit`|`EditJoinContentPage`|loggedIn, referenceUser|push to `/error` if error|`getJoinContentData`, `patchJoinContent`|

|##|API Method Signature|`Route` / `Method`|`Backend Route`|
|-|-|-|-|
||`Authorization`|||
|01|`authenticateUser(reqBody)`|`Authentication` / `POST`|`/authentication/token`|
|02|`registerUser(reqBody)`|`Authentication` / `POST`|`/authentication/register`|
||`Users`|||
|03|`searchUser(reqQuery)`|`Users` / `GET`|`/users/`|
|04|`getUserData(reqParam)`|`Users` / `GET`|`/users/:username/public`|
|05|`getAllUserData(reqParam)`|`Users` / `GET`|`/users/:username/private`|
|06|`getFullUserData(reqParam)`|`Users` / `GET`|`/users/:username/edit`|
|07|`patchUser(reqParam, reqBody)`|`Users` / `PATCH`|`/users/:username/edit`|
||`Contents`|||
|08|`createContent(reqBody)`|`Contents` / `POST`|`/contents/`|
|09|`searchPublicContent(reqQuery)`|`Contents` / `GET`|`/contents/`|
|10|`getAllPublicContent()`|`Contents` / `GET`|`/contents/`|
|11|`selectContent(reqParam)`|`Contents` / `GET`|`/contents/:contentID/random`|
|12|`getFullContentData(reqParam)`|`Contents` / `GET`|`/contents/:contentID/edit`|
|13|`patchContent(reqBody)`|`Contents` / `PATCH`|`/contents/:contentID/edit`|
|14|`publishContent(reqParam)`|`Contents` / `PATCH`|`/contents/:contentID/publish`|
||`Contents-Users-Join`|||
|15|`getContentData(reqParams)`|`Contents-Users-Join` / `GET`|`/cujoin/:username/:contentID`|
|16|`getJoinContentData(reqParams)`|`Contents-Users-Join` / `GET`|`/cujoin/:username/:contentID/edit`|
|17|`patchJoinContent(reqParams, reqBody)`|`Contents-Users-Join` / `PATCH`|`/cujoin/:username/:contentID/edit`|
||`Unimplemented Routes, but Developed and Disabled`|||
|18|`returnAllUsers`|`DISABLED` / `GET`|`/users/`|
|19|`deleteUser`|`DISABLED` / `DELETE`|`/users/:username`|
|20|`returnAllContents`|`DISABLED` / `GET`|`/contents/`|
|21|`returnContent`|`DISABLED` / `GET`|`/contents/:contentID`|
|22|`signContent`|`DISABLED` / `PATCH`|`/contents/:contentID/:username/sign`|
|23|`updateContent`|`DISABLED` / `PATCH`|`/contents/:contentID/status`|
|24|`deleteContent`|`DISABLED` / `DELETE`|`/contents/:contentID`|
|25|`deleteJoinContent`|`DISABLED` / `DELETE`|`/cujoin/:username/:contentID`|

## 02.03. Backend Documentation
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
||`Authorization`, `/authorization`||||
|01|`POST`, `/token`|`Users`, `authenticateUser()`|user auth. properties|Authenticates a user.|
|02|`POST`, `/register`|`Users`, `registerUser()`|user auth. properties|Creates a user.|
||`Users`, `/users/`||||
|03|`GET`, `/`|`Users`, `getAll()`|arr, user public properties|User search feature.|
|04|`GET`, `/:username/public`|`Users`, `getByPK()`|user public properties|User profile page.|
|`04A`|`GET`, `-`|`CU_Join`, `getAllUserPublicContent()`||Supports 04|
|05|`GET`, `/:username/private`|`Users`, `getByPKPrivate()`|user private properties|User profile page.|
|`05A`|`GET`, `-`|`CU_Join`, `getAllUserContent()`||Supports 5|
|06|`GET`, `/:username/edit`|`Users`, `getByPKPrivate???()`|user private properties|Edit user page.|
|07|`PATCH`, `/:username/edit`|`Users`, `update()`|user private properties|Edit user page.|
||`Contents`, `/contents`||||
|08|`POST`, `/`|`Contents`, `create()`|content public properties|Create content.|
|09|`GET`, `/`|`Contents`, `getAll()`|arr, content public properties|Content search feature.|
|10|`GET`, `/`|`Contents`, `getAll()`|arr, content public properties|Content search feature.|
|11|`GET`, `/:contentID/random`|`Contents`, `--`|content public properties|Content page.|
|12|`GET`, `/:contentID/edit`|`Contents`, `getByPKPrivate()`|content private properties|Edit content page.|
|13|`PATCH`, `/:contentID/edit`|`Contents`, `update()`|content private properties|Edit content page.|
|14|`PATCH`, `/:contentID/publish`|`Contents`, `updatePublish()`|content id?|sets content status to `published`|
||`Content-User Join`, `/cujoin`||||
|15|`GET`, `/:username/:contentID/`|`CU_Join`, `getByPK()`|cujoin public properties|Content page.|
|16|`PATCH`, `/:username/:contentID/edit`|`CU_Join`, `getByPKPrivate()`|cujoin private properties|Edit content join page.|
|17|`PATCH`, `/:username/:contentID/edit`|`CU_Join`, `update()`|cujoin private properties|Edit content join page.|
||`Deprecated/Disabled`, `/`||||
|18|`GET`, `/users/`|`Users`, `()`|deprecated|deprecated|
|19|`DELETE`, `/users/:username`|`Users`, `()`|disabled|Delete user[1].|
|20|`GET`, `/contents/`|`Contents`, `()`|deprecated|deprecated|
|21|`GET`, `/content/:contentID`|`Contents`, `()`|deprecated|deprecated|
|22|`PATCH`, `/content/:contentID/user/:userHandle/sign`|`Contents`, `()`|disabled|Allow user to toggle signed status of a piece of content|
|23|`PATCH`, `/content/:contentID/status`|`Contents`, `()`|disabled|Admin to update content status from `published` to `legacy`|
|24|`DELETE`, `/content/:contentID`|`Contents`, `()`|disabled|Delete content[1].|
|25|`DELETE`, `/cujoin/:username/:contentID`|`CU_Join`, `()`|disabled|Delete content join[1].|
[1] Tested but not used concerning practices (what if a user wants to restore? How?)

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
- that backend nightmare

## 03.01. A Huge Further Study Dump (`todo`: organize)
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
- **Seeding User Database + Schema Design**: 11h07m
- **Backend**: 
	- Being Generally Confused What Does What because of lack of Documentation and Schema Revisions: 50h52m
	- Being Less Confused about the Backend (post-Frontend Work): 1_h__m
- **Frontend**: 41h40m
- **Documentation (Dedicated)**: 

|Session|Task(s)|Date|Time|Time Elapsed (min)|
|-|-|-|-|-|
|01|db design, seed|2022-12-12|18:25 - 22:19|234|
|02|db seeding, continued (content)|2022-12-14|13:36 - 15:58|142|
|03|db seeding script and fixing typo|2022-12-14|19:47 - 22:29|162|
|04|fix db seeding|2022-12-15|18:45 - 18:55|10|
|67|fix database seeder & add more content to the db|2023-01-16|12:36 - 14:35|119|
||**50.01.03**. Data Sourcing||**Net Total Time**|667 (11h07m)|
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
|53|`contents` & need to redefine schema, looking up `draft-04 to -07` documentation|2022-01-07|12:28 - 13:37|69|
|54|revise schemas, renamed schema schema, finish up `contents`; **power outage**|2022-01-07|14:40 - 15:41|61|
|55|rollback app|2022-01-08|16:58 - 18:01|63|
|56|updated schema, all that is left is `contents:publish`|2022-01-08|18:37 - 21:12|155|
|57|set `config`, finish `contents:publish`|2022-01-08|22:22 - 23:14|52|
|58|`contents` tests|2022-01-09|19:46 - 20:33|47|
|59|finished basic unit `contents` tests. some frontend work (test file)|2022-01-09|20:39 - 22:00|81|
|63|route patterns now reflect RESTful practices where it is easy to implement; however, plural base routes for single items are still in effect; `random` test|2023-01-14|19:14 - 20:00|46|
||**50.01.04**. Routes (Backend)||**Net Total Time**| 3052 + 1573 min (--h--m)|
|11|application setup and skeleton; need to work on `./src/helpers/api.js`|2022-12-26 - 2022-12-27|22:15 - 00:47|152|
|16|exploring `formik` for frontend, attempted `material-ui`, alongside other express form validation and/or styling libraries; db work|2022-12-28|16:01 - 18:24|143|
|27|onboarding and frontend styling|2022-12-30|17:02 - 18:03|61|
|28|frontend styling + API|2022-12-30|18:24 - 20:34|130|
|33|bulk of `HomePage`, styling and documentation|2022-12-31|21:43 - 23:36|113|
|34|`ProfilePage`|2023-01-01|08:16 - 09:16|60|
|35|Finished all of `EditUserPage`, `EditContentPage`, `OnboardingPage`, `HomePage`. awaiting API.|2023-01-01|13:37 - 17:22|225|
|36|Updated styling (Home, Onboarding, EditContent, EditUser); `UserCard`, `ContentCard`, `ErrorPage`, `ProfilePage` layout (await API), tests.|2023-01-01|20:03 - 22:58|175|
|37|logo, styling, `api.js` work, and documentation|2023-01-02|08:19 - 10:30|131|
|61|update routes to follow RESTful guidelines; plugin API & update documentation|2023-01-13|11:11 - 12:19|68|
|62|update routes to follow RESTful guidelines, plugin API & update documentation; reorganize src|2023-01-13|19:26 - 22:27|181|
|64|test application; a bit of debugging and page update|2023-01-14|20:20 - 22:22|122|
|65|simplified components & finished public front-end styling|2023-01-15|12:37 - 16:45|248|
|66|finish private front-end styling & routing, most common components are done.|2023-01-15|20:02 - 23:11|189|
|68|iron out frontend, fix seed data, fix backend data return; patched content editing; mostly done with create content|2023-01-16|19:23 - 23:45|262|
|69|iron out frontend, db modifications, add temp content placeholder, modified db query order & updated tests to reflect db query modifications; mop up warnings, `console.log`, updated nav styling, update documentaiton|2023-01-17|13:37 - 17:37|240|
||**50.01.05**. Application (Front-End)||**Net Total Time**| 2500 min (41h 40m)|
|29|`README.md` work|2022-12-30|20:54 - 22:05|71|
|47|update documentation.|2022-01-03|21:55 - 22:18|23|
|51|build to-do list|2022-01-06|20:15 - 21:10|55|
|60|update routes documentation|2023-01-11|16:03 - 18:27|144|
|70|resolved `autoprefixer` warning (on `color-adjust` css property), last minute styling changes, userflow walkthrough & last-minute changes|2023-01-17|19:36 - 22:55|199|
60		70
293		
|71|add schema, content preview img, userflow videos, organize "further study" section; finish finsh e2e and integration tests|2023-01-18|14:35 - 1:||
|72||2023-01-18|1: - 1:||
||**50.01.06**. Documentation||**Net Total Time**| (--h--m)|
||||**Total Time**|_ minutes (--h--m)|
667+