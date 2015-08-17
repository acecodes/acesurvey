# AceSurvey
### An experimental application for creating and publishing short surveys.

**Technology used: Node, Sails, Sequelize, MySQL, Angular, Lodash, Bootstrap (Bootswatch)**

---

#Background

This is my first 100% JavaScript application. I've written quite a bit of Angular code and written a decent amount of experimental Node/Express/whatever in the past, but never have I done the entire stack in one language. It was quite a learning experience and I'm glad I did it.

Since I'd never constructed a full JavaScript app before and had never once used Sails for anything, I started out by watching and coding along with [this (currently unfinished) tutorial](https://www.youtube.com/playlist?list=PLf8i4fc0zJByWVBmMk8uJ0UEhTIGMnmPQ) that provides some basic information about Sails and how to integrate it with Angular.

That tutorial gave me a wire frame to run with and some concepts to grok before really diving in and tearing it apart - and that's exactly what I did.

First of all, I had to wire up Sequelize with Sails. This was a major pain in the butt, as there is currently only one library that allows Sequelize and Sails to play along nicely and it isn't documented at all. This was compounded by the fact that the "Blueprint" syntax in Sails is very similar to Sequelize's, causing quite a few confusing and hard-to-find bugs.

After that, I had to model and link questions, answers and responses. This wasn't terribly difficult, just a bit slow due to a lack of documentation for both Sails and Sequelize. The only thing I didn't accomplish as well as I would have liked was foreign key data retrieval. In the admin interface, I included a way to view answers - but Sequelize doesn't have a simple way to step through a foreign key and get the data it's attached to. So instead of being able to go through the ID and get an answer's text, I had to settle for using only the ID. Perhaps in the future I can figure out a way to do this.

Design is not my area of expertise (although I am currently trying to get better by reading books, taking courses, etc.) so please keep that in mind when looking at the interface. I spruced it up a bit with Bootswatch to make it a litte more appealing.

# Installation

If you want to check this out in your local development environment, here are the steps you'll need to take:

1.  Clone the repo: `$ git clone https://github.com/acecodes/acesurvey` 
2. Install MySQL and create a database (let's call it `acesurvey`) and make sure the username/password for it matches what is under `mySQL` in the `config/connections.js` file.
2.  `cd` into the `acesurvey` directory and install NPM dependencies: `$ npm install`
3.  Launch Sails: `$ sails lift`
4.  Go to `localhost:1337` (this is Sails' default - and hilarious - port number)
5.  Create a user.

## Admin
The admin interface is for creating questions and answers, as well as tracking data about user responses. Admins can't take quizzes. 

To see the admin interface, simply click the sign up button on the front page and select "Yes" in the "Admin?" box.

## User
Users see and answer quizzes. Each question is presented in random order and will not be repeated. Once every question available has been answered, a small message will appear congratulating the user on finishing the quiz. If the user refreshes the page, they will see the quiz again in a different order.

To see the user interface, click the sign up button on the front page and select "No" in the "Admin?" box.

## Further Notes

I commented within the code on certain improvements I felt could be made. I did not have a large amount of time to dedicate to this project, and I plan to come back to it later on.

If you have any questions or comments, please feel free to send me a message on [my website](http://acecodes.net).
