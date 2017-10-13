# `Health-heal` — A basic user interface between the client and the customer care service.

This project is an application for basic interaction between the user and the admin or curtomer care
service bor sending the feedback and complaints of anything.

The health-heal contains a sample Angularjs and Firebase appplication and is preconfigured to 
install the angular framework

The Health-heal app doesn't do much, only four modules are their in this project that is registration module,
login module,client module and fourth is Admin module.


## Getting Started

To get you started you can simply clone the `health_heal` repository and install the dependencies:

### Prerequisites

You need git to clone the `health_heal` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `health_heal`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `health_heal`

Clone the `angular-seed` repository using git:

```
https://github.com/ohm1993/health_heal.git
cd health_heal
```

If you just want to start a new project without the `health_heal` commit history then you can do:

```
git clone --depth=1 https://github.com/ohm1993/health_heal.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [Node package manager][npm].
* We get the Angular code via `bower`, a [client-side code package manager][bower].
* In order to run the end-to-end tests, you will also need to have the
  [Java Development Kit (JDK)][jdk] installed on your machine. Check out the section on
  [end-to-end testing](#e2e-testing) for more info.

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`angular-seed` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].


## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules
    version/              --> version related components
      version.js                 --> version module declaration and basic "version" value service
      version_test.js            --> "version" value service tests
      version-directive.js       --> custom directive that returns the current app version
      version-directive_test.js  --> version directive tests
      interpolate-filter.js      --> custom interpolation filter
      interpolate-filter_test.js --> interpolate filter tests
  admin/
     admin.controller.js   -->this is the controller of the admin part
     admin.html          -->this is the view page of admin page
  client/
     client.controller.js  -->this is the controller of the client or user part
     client.html          -->this is the view page for client page      
  Login/                --> this is for login part
    view1.html            --> the login template
    view1.js              --> this is the login controller
    view1_test.js         --> tests of the controller
  Registration/                --> the register template and logic
    view2.html            --> the registration template
    view2.js              --> the registration controller
    view2_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```


