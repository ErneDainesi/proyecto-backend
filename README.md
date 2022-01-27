# Backend Project

This project consists in making the backend for a ecommerce.  
> DISCLAIMER: as the title project states, this is a **backend** project.
Very little frontend elements where added. Basic views such as
login/signup, products views, etc.

## Tools Used These are some of the tools, frameworks, packages, languages I used for developing and testing the app.
### Development

- [NodeJs](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express Js](https://expressjs.com/)
- [Mongo Database](https://www.mongodb.com/)

### Testing

- [Mocha](https://mochajs.org/)
- [Supertest](https://github.com/visionmedia/supertest#readme)
- [Chai](https://www.chaijs.com/)

## Installation

Download the files from this repository or clone the repository:

```shell
git clone https://github.com/ErneDainesi/proyecto-backend.git
```

Once the files are downloaded, you should install the projects dependencies
with [npm](https://docs.npmjs.com/):

```shell
npm install
```

## Building & Running

After downloading the project files and installing
its dependencies, these are some commands you can
use to build and run the app:

Transpile the typescript files into JavaScript in the dist folder:

```shell
npm run build 
```

Build and start the project:

```shell
npm run start
npm run start:cluster // for cluster mode
```

Run the project using the TS files. This is useful for development:

```shell
npm run dev
npm run dev:cluster // for cluster mode
```

## Running tests

To run tests you first have to build the project. After
that, you must start the app. Once this is done, you can run
the test script. These tests can be found inside the `test` folder.  
These steps should be run in different terminals as follows:

> In one terminal run the build and start script

```shell
npm run start
```

> And in another terminal, run this command

```shell
npm run test
```

## Enviroment variables

There is and `.env_sample` file to show an example of
how the `.env` file should be.  
For the project to work, you should add your own folder
with a mongo altas uri and [Twilio](https://www.twilio.com/) credentials.

## End points

There are several endpoints to test out. These are:

- `/signup`
- `/login`
- `/logout`
- `/home`
- `/products`
- `/cart`
- `/order`
- `/chat`
- `/user`

Each of them have their own sub routs and REST methods.

### Sign up

Let's start with the basics!  

This is a very simple sign up page. Here you can create
your user and use it to navigate through the other endpoints.  
The signup process is managed with the [passport](https://www.passportjs.org/) 
npm package.
If the creation of the user is succsessful, it will redirect to
the `/signup/success` end point. If it fails, it will redirect
to the `/signup/error` route.  
The `get` method is used to load the views, while
the `post` method is the one in charge of creating the new user.

### Login

Again, a very simple login page. This route also uses the passport
npm package to authenticate the user. It also has `/login/success`
and `/login/error` routes in case the login is done correctly or not.

### Logout

In line with the previous endpoints, this is simple
route only has one `get` method. It simply destroys the current
[express-session](https://www.npmjs.com/package/express-session)

### Home

This route only shows a home for the user.

## Products

Now were getting into routes with with more depth in them.  
  
This route has four different `get` methods implemented, let's take a look
at them.  
`/` this route gets the page were the admin users can upload new products.
I'll explain later admin users.  
`/view` this route shows the list of products and user can add them to their
cart and create a new purchase order.  
`/:id` this route gets a specific product by its id.  
`/category/:category` in this route a list of products is shown, but only
the products that fall into the given `category`. If there are no items, an
error message will be displayed.  
  
Now we have the `post`, `put` and `delete` routes. One thing in common
for all of these routes is that you need to be an admin to use them. If
not, an error message will be displayed.  
`/` with this `post` route, the admin can save a new product to the database.  
`/:id` with this `put` route, the admin can update a product from the database. Keep in mind you have to provide a valid product id for it to work.  
`/:id` with this `delete` route, the admin can delete a product from the database. This route also needs a valid product id to work.

### Cart

Each user is created with an empty cart. In this route the user can
see there cart, add new items, update an item or delete one. In all
of these route, it is necessary to be logged in. If you are not logged in
or the session expired, you will be redirected to the login page.  

Let's start with the `get` methods.  
  
`/` this route shows the users cart.  
`/:idProduct` shows the specific item inside the cart.  

To save add a product to the cart you will need to use the `post` method
that will be handled by the base cart route `/:idProduct`.  
And to remove an item from the cart, the `delete` method is needed and will
be handled by the same route as the post `/:idProduct`.

### Order

The order routes are in charge of creating and getting an order. Every time
a new order is created the users cart is emptied.

