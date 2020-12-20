# COSTERL

![](readme_images/Untitled-1.jpg)

Cost-tracking app to: 
- register expenses 
- investigate trends through: 
  - line chart
  - pie chart
  - common-size analysis
- get an overview of the outflow

## Screenshots

![](readme_images/Untitled%20design-2.png)

## Getting started

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

## Built with
- [React Native & Expo](https://reactnative.dev)
- [Sequelize ORM](https://sequelize.org)
- [Koa](https://koajs.com)

## Observations

- Looking back I would invest more resources in UX & UI and maybe transfer more logic to the back-end
- At some point I realized that I lost too much time in trying to make reusable components
- Among other things I need to learn clean-code practices, how to properly structure a project and improve naming conventions

## Developer
Lucas Erlacher:
  - [GitHub](https://github.com/lucaserly)
  - [LinkedIn](https://www.linkedin.com/in/lucaserlacher/)
  - [e-mail](mailto:l.erlacher@icloud.com)

## Contributors
Thank you for all the improvements and tips:
  - [Benjamin Bayet](https://github.com/ophren)
  - [Joachim Koch](https://github.com/Kochlyfe)
  
