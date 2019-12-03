# WTM Berlin - JavaScript Crash Course 2019

## Requirements

### Tools

- Docker (`docker ps` should not give any error)
- Docker Compose (`docker-compose version` should print version)
- Heroku CLI (`heroku version` should print version)

### Account

A free Heroku account is needed, create one here: <https://signup.heroku.com/>

### Logins

After creating one free Heroku account, run `heroku login`, and connect your local heroku command with your account. Running `heroku whoami` should give you back your email address.

Run `heroku container:login` for linking your Heroku account with Docker. You can run this command multiple times, no worries.

## Commands we run

### Docker

```bash
cd ${wtm-jscc2019}/week-8

# make sure that you are not running mongodb or any app on ports 3000, 8080
docker-compose up
```

#### Troubleshooting

If docker compose command fails with a port already allocated error, it means you have already a process running using the same port.

For mongodb, if you are using brew services, run `brew services stop mongodb-community@4.2` to stop. If you are not using brew services, try to find the terminal window where you have run that, or in the worst case, try restarting your computer.

For other ports same applies with finding the process, or restarting the computer.

### Deployment

We are having all requirements met, these are the commands we will be running through the second part of the workshop. More details will be added over the class.

```bash
# opens your browser, logs your local heroku command with your heroku account
heroku login

# links your heroku account with docker command, so you can send your docker images to heroku
heroku container:login

# Let's change directory to this week, please replace the ${wtm-jscc2019} with the correct path
cd ${wtm-jscc2019}/week-8

# now focusing on backend
cd backend

# this is only for heroku, because it works with git repos for each app
git init

# create the heroku app for backend
heroku create "jscc19-${USER}-backend"

# make heroku build the image with docker and push it to its repositories, web here means it's an app with web interface
heroku container:push web

# now we have pushed the image, it's time to release
heroku container:release web

# and open the app, you should see a hello world
heroku open

# let's configure the database connection
heroku config:set MONGODB_CONNECTION_STRING="mongodb+srv://jscc19:<password>@wtmberlin-jscc2019-n19rs.gcp.mongodb.net/${USER}"

# now you can use other routes which requires mongodb. an empty list expected for now.
heroku open /person/all

# now focusing on frontend
cd ../frontend

# this is again only for heroku
git init

# create the heroku app for frontend
heroku create "jscc19-${USER}-frontend"

# make heroku build the image with docker and push it to its repositories, web here means it's an app with web interface
heroku container:push web

# configure backend url for frontend
heroku config:set VUE_APP_API_URL="https://jscc19-${USER}-backend.herokuapp.com"

# now we have pushed the image, it's time to release
heroku container:release web

# and open the app
heroku open
```

## Changes for deployment

### Hostname

I used vue serve function for deployment (which is not the best practice for production, but the fastest). The deployed application was not accessible from the outside world, because the vue server, for development purposes, only responds to `localhost` hostname or ip address. For allowing the vue serve for all hostnames, `devServer.disableHostCheck` was configured in `vue.config.js`:

```js
module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true
  }
};
```

### Port configuration

Because Heroku assigns the containers the port via environment variable, all hard-coded port values are parameterized. node.js apps can read environment variables directly via `process.env.PORT`, so in `backend/index.js` you can see that port value is retrieved from that with a fallback value of `3000`. So if `process.env.PORT` is not defined, `3000` will be used, just as it was before.

### Backend URL configuration

Local development and deployments work different in ways. In local, most of the time, `localhost` hostname (which points to your very own machine) is used with different port numbers. For real environments, most of the times, different URLs are used for different apps. So `localhost:3000/person/all` URLs will not work when we deploy our app. As Heroku generates different hostnames for each app, we need to configure our frontend application for accessing a backend to use.

Thanks to vue.js, it's build (and serve) system compiles environment variables just like a node.js app. See [docs here](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables) for more information.

We used this configuration in our `frontend/src/store/index.js` file, where we pointed our backend.
