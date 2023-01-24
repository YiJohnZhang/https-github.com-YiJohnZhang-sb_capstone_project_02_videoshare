# ShortCollabs
*The purpose of this project is to be a **prototype content-sharing web application** that focuses on a "Contracts" feature integrated into a `Content` model intended to encourage content creators to collaborate with another by **creating the option** to choose a pre-agreed monetization monetization model where content monetization is calculated by the pre-agreed proportion of a piece of content's **aggregate engagement** and therefore allowing the content algorithm to solely focus on featuring a piece of content and ignore considerations of which user's profile was selected to show that content. **The intention of this feature** is to encourage collaboration between creatives that are not necessarily at the same popularity and potentially allow fans to literally engage with content creators on the platform, increasing user engagement through either more rich and unique content because of more involved individuals AND literally engaging with fans.*

**Live Link, as of 2023-01-24**: [http://whimsical-condition.surge.sh/](http://whimsical-condition.surge.sh/)
**NOTE**: This project is hosted on the **free-tier plan** on **[surge.sh](https://surge.sh/)**, a frontend hosting service; from experience, projects hosted on the free-tier has unreliable performance compared to being hosted locally. **Consider [downloading and building this project locally](#0201-running--testing-instructions)**: the default backend port is `:3000` and the default frontend port `:3001`.

## Special Thanks
I like to thank the following two individuals for the respective reasons:
- **Christos Gkoros**: *Course Mentor and Project Advisor*. Provided guidance, experience, feedback, and industry insight throughout the course.
- **Anh Mai**: *Bootcamp On-Demand Mentor*. Helped resolve a bug that has bogged down progress for the majority of the project's early development (backend).

## Test Statistics
- **Backend**: **~153 Unit Tests** (take a few); **~7 Integration & E2E Tests** (give a few)
- **Frontend**: **24 Simple Tests** (Component Smoke and Snapshot Tests); **0 Event Tests** (focused on backend tests)

# Table of Contents
- [01. Project Features](#01-project-features)
	- [01.01. Sample Userflow](#0101-sample-userflow)
		- [01.01.A. Search API (Public)](#0101a-the-search-api-public)
		- [01.01.B. User Login & Content Publishing](#0101b-user-login-and-content-publishing)
		- [01.01.C. User Editing & Content Creation API](#0101c-user-editing--content-creation-api)
		- [01.01.D. Join Records for a Content Piece](#0101d-join-records-for-a-piece-of-content)
		- [01.01.E. Publishing (New) Content](#0101e-publishing-is-a-single-purpose-method)
		- [01.01.F. Register User](#0101f-register-user)
	- [01.02. High-Priority Features](#0102-high-priority)
	- [01.03. Develpoment Build Suggestions](#0103-develpoment-build-suggestions)
	- [01.04 Other Notes](#0104-other-notes)
- [02. Project Details](#02-project-specifications)
	- [02.01. Running & Testing Instructions](#0201-running--testing-instructions)
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
[Return to Table of Contents](#table-of-contents)

### 01.01.A. *The Search API (Public)*
Searching either published Content or Users.
[![public search api](https://github.com/YiJohnZhang/sb_capstone_project_02_ShortCollabs/blob/main/README_assets/shortcollabs_preview_img.png)](https://user-images.githubusercontent.com/8562595/213333822-d069abdb-f184-4b41-90ed-d057a16c9bea.mp4)

### 01.01.B. *User Login and Content Publishing*
Once content is published, it is publicly viewable. The join record has an independent description field than that of the master record. Content cards display participating users.
[![user login & content publishing](https://github.com/YiJohnZhang/sb_capstone_project_02_ShortCollabs/blob/main/README_assets/shortcollabs_preview_img.png)](https://user-images.githubusercontent.com/8562595/213333863-9a760ba1-3836-46e3-9fc3-7c9861e0917d.mp4)

### 01.01.C. *User Editing & Content Creation API*
Creating content with an added participant automatically creates a corresponding record to the participating user.
[![user editing & content creation](https://github.com/YiJohnZhang/sb_capstone_project_02_ShortCollabs/blob/main/README_assets/shortcollabs_preview_img.png)](https://user-images.githubusercontent.com/8562595/213333897-515908c2-72b4-4211-8162-76900859ae3b.mp4)

### 01.01.D. *Join Records for a Piece of Content*
Join record(s) for a piece of content are updated automatically depending whether or not a user is invited or not.
[![join records are dynamic](https://github.com/YiJohnZhang/sb_capstone_project_02_ShortCollabs/blob/main/README_assets/shortcollabs_preview_img.png)](https://user-images.githubusercontent.com/8562595/213344037-e9573351-c8c0-414e-9133-a5181048b153.mp4)

### 01.01.E. *Publishing is a single-purpose method.*
The publish call is single-purpose, one must update it first (for now) then publish).
[![publish is a single-purpose method](https://github.com/YiJohnZhang/sb_capstone_project_02_ShortCollabs/blob/main/README_assets/shortcollabs_preview_img.png)](https://user-images.githubusercontent.com/8562595/213333961-8b9e78e7-da24-4f15-84da-50e5d8b1c62f.mp4)

### 01.01.F. *Register User*
Registering `testuser`.
[![registering a user, `testuser`](https://github.com/YiJohnZhang/sb_capstone_project_02_ShortCollabs/blob/main/README_assets/shortcollabs_preview_img.png)](https://user-images.githubusercontent.com/8562595/213333966-abff29d3-0a17-4fe9-902a-b502dcdb5cb4.mp4)
[Return to Table of Contents](#table-of-contents)

## 01.02. High-Priority
1. **Model, Critical**: Resolve the extent ACID is to be preserved for this database
2. **GUI, Critical**: GUI contract "detail" modification (share modification) & "signing" w/ client-side calculator to make sure proposed range is 0 < x < 1 && 0.9(5?) < \Sigma(x_i) < 1
3. **GUI, QOL**: For the `ContentCard`, display participants picture with participants username as tooltip to fit more before truncating the number of participants shown
4. **Model**: Searchable user field when adding participants, privacy settings to block being added, and server-side valid participant validation
5. **GUI, User Profile**: left-justify the contents.
6. **Content Hashing**: There now shouldn't be a reason for duplicate content. contents maybe get an un-watermarked "hash" to aid finding duplicate content.
7. Real-time back-end validation for adding participants

## 01.03. Develpoment Build Suggestions
1. **An Open-Source Project for React (forms)**: A class-definable form-validation (i.e. formik + configurable class fields/input-label element patterns), [Flask-WTF!@#$]() with Jinja templating is an excellent example.
2. Schema Design / JSONSchema Notes
	- `user.updateTypeUser.schema.json` Note: since all content in this db is local, `picture` does NOT have to be a `uri` format string

## 01.04 Other Notes
- `user.updateTypeUser.schema.json` Note: since all content in this db is local (hosted on `/public`, rather than another backend where the img data is stored), `picture` does NOT have to be a `uri` format string

# 02. Project Specifications
[Return to Table of Contents](#table-of-contents)
This web application uses the **PERN** stack:
- `react` Frontend w/ Client-Side Routing using `react-router`
- `express` Backend, using `node-pg` query builder
- PostgreSQL RDBMS
- Follows RESTful Routing specifications **excluding the singular/plural resources pattern**.
- **Test Statistics**
	- **Backend**: **~153 Unit Tests** (take a few); **~7 Integration & E2E Tests** (give a few)
	- **Frontend**: **24 Simple Tests** (Component Smoke and Snapshot Tests); **0 Event Tests** (focused on backend tests)

![shortcollabs schema img](https://github.com/YiJohnZhang/sb_capstone_project_02_ShortCollabs/blob/main/README_assets/schema_2023-01-04.png)
**Figure 02.01**. Project Schema.

The project proposes the following additional attributes to a `content` relation and a `content_user_join` relation to achieve the intended goals of the project's purpose:
|Attribute Name|Data Type|Example|Description|
|-|-|-|-|
|`status`|`ENUM`sql ('created', 'standby', 'published', 'legacy')|`'standby'`|This attribute is used to filter content for searching, modifying, and monetization. `standby` is for content where `participants` have all agreed to the content monetization contract, `published` is when a file has been uploaded, `legacy` content has a reduced monetization rate.|
|`owner`|`VARCHAR(USERNAME_max_len)`sql `FK`|`'user1'`|The owner of the content piece; ideally, it could be passable to another participant. This could be further expanded to which participants have permissions to edit the content details and/or invite users.|
|`contract_type`|`ENUM`sql ('solo', 'byview', 'presplit')|`'solo'`|Is the content monetization for a single user (`solo`), free-for-all to collaborators based on view and engagement due to the algorithm (`byview`), or pre-allocated such that the pre-allocated split is offered (`presplit`)?|
|`participants`|`TEXT`sql|`'["user1","user2","user3"]'`|A stringified array of usernames involved. It is `'["user1"]` if `contract_type` = `solo`.|
|`contract_details`|`TEXT`sql|`'{"views":[{"username":"user1","share":0.25}, {"username":"user2","share":0.25},{"username":"user3","share":0.5}],"engagement":[{"username":"user1","share":0.74}, {"username":"user2","share":0.21},{"username":"user3","share":0.05}]}'`|A stringified JSON object of usernames and monetization fractions in respective monetization categories. It is `'{"views":[{"username":"user1","share":1}, ],"engagement":[{"username":"user1","share":1}]}'` if `contract_type` = `solo`.|
|`contract_signed`|`TEXT`sql|Similar to `participants`.|A stringified array of usernames that have agreed to the contract. Used to check whether or not the content `status` may be set to `standby`.  Behaves similarly to `contract_details`.|

## 02.01. Running & Testing Instructions
[Return to Table of Contents](#table-of-contents)

**Instructions Assumptions**:
- The instructions here assume one starts at the `Downloads` dir or equivalent where the sourcecode dir is contained.
- Let `projectDir` refer to `downloadsDir/sb_capstone_project_02_ShortCollabs-main`, where `downloadsDir` is the directoy where the sourcecode is saved, i.e. `~/Downloads`.

**Running the Application & Setup**
- Other Dependencies & Notes:
	- PostgreSQL > 9 (technically 8.3) for `ENUM` types
	- [`nodeJS v16.14.2`](https://nodejs.org/docs/latest-v16.x/api/url.html)
	- `npm`: `sudo apt install node` or equivalent
	- [`node-pg` Notes](https://node-postgres.com/features/connecting): To run the source code as it is, `postgres` must be set to skip authenticating permissions. This is done by editing `pg_hba.conf`, it is found at in `/etc/postgresql/PSQL_VERSION/main/` in Linux, and setting user/address methods to `trust`. Otherwise you need to provide and configure the password into the `DB_URI` for `node-pg`, see the [`node-pg` documentation here](https://node-postgres.com/features/connecting#programmatic).
- Backend:
```sh
# 01. Seed the sample database
# Go to the directory the project sourcecode is saved. Unzip it.
# Let `projectDir` refer to `downloadsDir/sb_capstone_project_02_ShortCollabs-main`, where `downloadsDir` is the downloads directory this sourcecode is saved, i.e. `~/Downloads`.


# 01.01. Go to 'projectDir/backend/database/seed', start psql there
$ cd sb_capstone_project_02_ShortCollabs-main/backend/database/seed
# cd ~/Downloads/sb_capstone_project_02_ShortCollabs-main/backend/database/seed
$ psql

# 01.02. Seed the database `sb_50_capstone_project_shortcollabs`
# WARNING: Running the seed file, `baseSeed.sql` will drop any existing instance of `sb_50_capstone_project_shortcollabs`
(psql)# \i baseSeed.sql
ctl-D
	# exit psql cli

# 02. Run the Backend

# 02.01. Go to 'projectDir/backend'
$ cd ../..
# cd ~/Downloads/sb_capstone_project_02_ShortCollabs-main/backend

# 02.02. Start the server (after installing the modules)
$ npm i
$ node server.js
	# or nodemon server.js. NOTE: This listens on 127.0.0.1:3000 (localhost:3000) by default; change it by editing `PORT_NUMBER` in `config.js`
```
- Frontend:
```sh
# 03. Run the Frontend. Start a new CLI

# 03.01. Go to `projectDir/frontend`
$ cd ../frontend
# cd ~/Downloads/sb_capstone_project_02_ShortCollabs-main/frontend

# 03.02. Start the backend (after installing the modules)
$ npm i
$ npm start
	# NOTE: This listens on 127.0.0.1:3001 (localhost:3001) by default; change it by editing `BASE_URL` in `projectDir/frontend/src/helpers/api.js`

# Enjoy! Backend tests are located on `projectDir/backend/__tests__`.
# Questions? Message me on LinkedIn: https://www.linkedin.com/in/yijohnzhang/
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
├── __tests__/
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
	├── App.test.js					# smoke & snapshot test, focused on backend tests
	├── NavBar.test.js				# smoke & snapshot test, focused on backend tests
	├── HomePage.test.js				# smoke & snapshot test, focused on backend tests
	├── ErrorPage.test.js				# smoke & snapshot test, focused on backend tests
	├── OnboardingPage.test.js			# smoke & snapshot test, focused on backend tests
	├── ProfilePage.test.js				# smoke & snapshot test, focused on backend tests
	├── EditUserPage.test.js			# smoke & snapshot test, focused on backend tests
	├── ContentPage.test.js				# smoke & snapshot test, focused on backend tests
	├── EditContentPage.test.js			# smoke & snapshot test, focused on backend tests
	├── EditJoinContentPage.test.js			# smoke & snapshot test, focused on backend tests
	├── ContentCard.test.js				# smoke & snapshot test, focused on backend tests
	└── UserCard.test.js				# smoke & snapshot test, focused on backend tests
```

## 02.02. Frontend Documentation
[Return to Table of Contents](#table-of-contents)
```sh
/
├── signin/
├── register/	
├── user/
│	├── [username]
│	└── [username]/[contentid]/edit
├── account/
├── create/
├── edit/[contentid]
├── error/[errorCode]
└── logout
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
[Return to Table of Contents](#table-of-contents)
```sh
/
├── authorization
│	├── `POST`		/token/					# login
│	└── `POST`		/register/				# register
├── users
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
[Return to Table of Contents](#table-of-contents)
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

## 03.01. A Huge Further Study Dump
[Return to Table of Contents](#table-of-contents)
Some suggested improvements to this concept are:
1. better contnent creation GUI and UX.
	- **realtime editing**: use a websockets connection for editing a `byview` or `presplit` collab to quickly negotiate an agreement. change the `summary` field to some kind of **markdown-based editor**, there are the following: `h1`-`h6`, italicizing, bold, maybe give it a screenwriting ui?
	- GUI for negotiating contract as well as setting the contract, i.e. maybe a decimal slider. **attempt contract resolution**: maybe a "negotiate contract feature" where all participants set a range of acceptable percentages for each category and an algo attempts to maximize majority to the upper-end?
	- **Front-End**: "make it even button", Math.floor(first"Repeated"Digits(1/[number of participants]))/[number of participants])
	- better UI to set contract & signed
	- client-side checking the `contract_details` add to ceil(0.95) - ceil(1.00)
	- server-side checking the `contract_details` add to ceil(0.95) - ceil(1.00)
2. **user schema**, user safety. use `verified`, `birthdate`, or `parental_controls` user properties to protect underage users that may want to use the collabs feature. this could be a "guardian account" acting as an "agent" for the underage user where any invitations to an underage user must be accepted by the respective "guardian account".
	- Hide users < 18 to be found unless linked parent/guardian account that can act as an intemediatary?
3. **user schema**, user privacy.
	- searchable user invite system
	- do an invitation-based "participants" system so that the invited user has to confirm before added to a content page.
	- invitation privacy settings: (`Anyone`, `No One`), (`Followers & Following`, `Followers`, `Following`), (`Friends / Mutal Friends`?); or `proximity`-based --maybe a finder (phone shaking by location)?
	- allow users to fully block or restrict invites.
4. **content**.
	- add an `editor` array to the model that allows edits to be made;
	- make it so that the content's `owner` cannot be booted
	- `visual_hash` / `audio_hash` for content: colalbs => there shouldn't be any duplicate content in the db anymroe
5. **cujoin schema**. make `isElevated` behave as it suggests; moderators can (un)flag all content but cannot outright delete; marketing/brand accounts are also elevated in that they can invite anyone? or too dangerous? as long as they are screened?
6. **admin dashboard**.
	- admin dashboard to demonstrate potential of the present database schema design, specifically the `ENUM`sql types
	- admin search in admin dashboard with full query methods
	- admin delete content ()
7. **schema ACID**. implement "hidden" status for suspended users/content; figure out who and how content should be deleted (i.e. if a user is deleted, do all contents owned by the user get deleted or not? if all participants delete their join content & profiles, should the contnet be deleted or not? what if it is iconic? i.e. see Youtube - *Topic* profiles that are not monetized) 
8. **user schema**, general:
9. [**need a better form templating system**](#0103-develpoment-build-suggestions)
10. optional integrated communication. maybe an integrated chat system, i.e. 3rd party or built-in integrated with the application to facilitate communication between users to organize collabs.
11. **MORE TIME SPENT ON DOCUMENTATION BEFOREHAND**. **Technical**
	- **Use Flask Backend**: Since this is a prototype application, form validation w/ wtforms is much more straightforward and less time-consuming to use.

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
[Return to Table of Contents](#table-of-contents)
- **Seeding User Database + Schema Design**: 11h07m
- **Backend**: 77h5m
	- while confused: 3052 min
	- salvaging: 1573 min
- **Frontend**: 41h40m
- **Documentation**: 12h40m
- **Total Time**: 142h32m

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
|71|add schema, content preview img, userflow videos, organized [03.01](#0301-some-ideas-dump); add links to userflow videos and content imgs; updated `EditContentPage` to be more robust --|2023-01-18|14:35 - 16:30|115|
|72|preview image is wide-screen; add sample userflow videos; re-order content titles & added `return to toc` shortcut|2023-01-18|17:04 - 17:35|31|
|73|formatted time typos; fix missing sample userflow video `0101D`; e2e & integration tests & cleanup documentation|2023-01-18|18:48 - 20:50|122|
||**50.01.06**. Documentation||**Net Total Time**|760 (12h40m)|
||||**Total Time**|8552 minutes (142h32m)|
