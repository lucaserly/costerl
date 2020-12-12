### COSTERL

![](readme_images/Untitled-1.jpg)

Cost-tracking app to: 
- register expenses 
- investigate the trends
- get an overview of the outflow

## Screenshots

![](readme_images/Untitled%20design-2.png)

## Gettin started

1. Clone the repo and open in your code editor of choice:
```
git clone https://github.com/lucaserly/costerl.git
```
2. Install all required dependencies:
```
npm install
```
3. In the server folder, create a ```config.js``` file with the following content and properties to be filled:
```
const config = {
  database: '',
  username: '',
  password: '',
  config: {
    host: '',
    dialect: '',
    port: ''
  }
};

module.exports = config;
```
4. Run the server:
```
node server/index.js
```
5. Run the app:
```
cd client && npm start
```
