# YT clone

## Dependencies
> [!NOTE]  
> (-D for dev-dependency; used for development only not production)
- **nodemon:** to automatically restart the server after making changes `npm install --save-dev nodemo`
- **prettier:** to maintain consistency (semicolon or not, tab spaces, etc) `npm i -D prettier`
- **express:**
- **mongoose:** Used to connect to mongodb
- **dotenv:**

## Files
- **package.json:** 
    - type: change type to module
    - scripts: to reload everytime changes are made
    - dotenv module can't be accessed like other modules thus using experimental feature. env modules are supposed to be accesses as soon as possible therefore at the very beginning of index file.
- **public/temp:** to store images locally. **.gitkeep** file is used to push the folder. (can't push empty folders)
- **.gitignore:** not to push to github (fetched from [here](https://mrkandreev.name/snippets/gitignore-generator/#Node))
- **.prettierrc.json:** Prettier configuration
- **.prettierignore:** files/folders ignored by prettier
