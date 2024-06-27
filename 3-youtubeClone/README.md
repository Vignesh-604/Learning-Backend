# YT clone

## Dependencies
> [!NOTE]  
> (-D for dev-dependency; used for development only not production)
- **nodemon:** to automatically restart the server after making changes `npm install --save-dev nodemon`
- **prettier:** to maintain consistency (semicolon or not, tab spaces, etc) `npm i -D prettier`
- **express:**
- **mongoose:** Used to connect to mongodb
- **dotenv:**
- **cookie-parser:** to access and edit cookies from user browser
- **cors:**
- **mongoose-aggregate-paginate-v2:** `npm i mongoose-aggregate-paginate-v2`
- **bycrypt:** To encrypt and store passwords and decrypt when needed.
- **jsonwebtoken:** To generate JWT tokens for authentication
- **cloudinary:** to use Cloudinary, third party platform to store img, vids, etc
- **multer:** used to upload files onto disk storage

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

    - **controllers:**
        - **user.controllers.js:** Contains the registerUser function, which handles user registration and sends a simple JSON response.

    - **routes:**
        - **user.routes.js:** Routes after prefix /user

- **package.json:** 
    - type: change type to module
    - scripts: to reload everytime changes are made
    - dotenv module can't be accessed like other modules thus using experimental feature. env modules are supposed to be accesses as soon as possible therefore at the very beginning of index file.
- **public/temp:** to store images locally. **.gitkeep** file is used to push the folder. (can't push empty folders)
- **.gitignore:** not to push to github (fetched from [here](https://mrkandreev.name/snippets/gitignore-generator/#Node))
- **.prettierrc.json:** Prettier configuration
- **.prettierignore:** files/folders ignored by prettier
