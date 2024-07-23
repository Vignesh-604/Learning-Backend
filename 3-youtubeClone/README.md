# YT clone
Backend for YT clone application
## Dependencies
> [!NOTE]  
> (-D for dev-dependency; used for development only not production)
- **nodemon:** to automatically restart the server after making changes `npm install --save-dev nodemon`
- **prettier:** to maintain consistency (semicolon or not, tab spaces, etc) `npm i -D prettier`
- **express:** To handle request, response, routing, etc
- **mongoose:** Used to connect to mongodb
- **dotenv:** To load environment variables
- **cookie-parser:** to access and edit cookies from user browser
- **cors:** For Sharing data from different origins
- **mongoose-aggregate-paginate-v2:** `npm i mongoose-aggregate-paginate-v2` To paginate aggregated data recieved from mongodb
- **bycrypt:** To encrypt and store passwords and decrypt when needed.
- **jsonwebtoken:** To generate JWT tokens for authentication
- **cloudinary:** to use Cloudinary, third party platform to store img, vids, etc
- **multer:** used to upload files onto disk storage

## API Testing done using Postman

 - Use Postman application for testing as Web one doesn't work with localhost and VS code extension doesn't send or read cookies.
- If postman doesn't work, try thunder client. Try removing image file and attaching again if image problems.

## Access and Refresh Token
Access tokens are used to give access to protected resources in an application. They have a short lifespan and are issued when a user logs in. They're usually stored in headers (or cookies) of requests to access something. Access tokens usually contain information about the user (claims), such as the user ID, roles, and permissions

Refresh tokens are used to obtain new access tokens after the current access token expires. This allows users to stay logged in even after the access token is expired as refresh tokens are used to generate new tokens. Refresh tokens have a longer lifespan than access tokens. It's stored in database and is used to verify to generate new access (and refresh) tokens



## Files
+ **src:**
    - **index.js:** Initializes environment variables, connects to MongoDB, and starts the Express server upon successful database connection.

    - **app.js::** 

    - **db/index.js:** MongoDB connection using mongoose

    - **utils:**
        - **ApiError:** Standardized way to handle ApiErrors by extending and modifying Error class
        - **ApiResponse:** Standardize the structure of responses sent from an API.
        - **asyncHandler:** The asyncHandler function wraps asynchronous Express route handlers to ensure errors are caught and passed to the next middleware.
        - **cloudinary.js:** Transfers files from the local directory to Cloudinary and handles cleanup of temporary files.
    
    - **middlewares:**
        - **multer.middleware.js:** Handles file uploads and stores them temporarily in a local directory.
        - **auth.middleware.js:**verifies JWTs from cookies or headers for authentication and attaches the authenticated user to the request object.

    - **controllers:** Coontains controllers for different data models for ex. user
        - **user.controllers.js:** Contains the registerUser, loginUser, logoutUser and other functions to handle user related events.

    - **routes:** Routes used for HTTP routing
        - **user.routes.js:** Routes after prefix /user

- **package.json:** 
    - type: change type to module
    - scripts: to reload everytime changes are made
    - dotenv module can't be accessed like other modules thus using experimental feature. env modules are supposed to be accesses as soon as possible therefore at the very beginning of index file.
- **public/temp:** to store images locally. **.gitkeep** file is used to push the folder. (can't push empty folders)
- **.gitignore:** not to push to github (fetched from [here](https://mrkandreev.name/snippets/gitignore-generator/#Node))
- **.prettierrc.json:** Prettier configuration
- **.prettierignore:** files/folders ignored by prettier
