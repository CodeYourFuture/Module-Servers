# Challenge: A Quote Server

## How long will this take?

- Up to 1 hour to complete level 1. If you spend more than 1 hour you should ask for a study session on this.

Once your understanding is secure, this level will take 1-2 minutes as it is only asking for two lines of code. Once you've written the code, delete it and write it again from memory to secure your understanding.

- Spend no more than 4 hours on the advanced level. If you have time to spare, spend it writing

## Overview: what is this challenge?

In this challenge you must make a server (using Node and Express) which serves quotes, in JSON form.

In the _extended_ work of this challenge, you also make a React app which displays the quotes retrieved from your new server.

Here's how it might look if you make a request to such a server.
![screenshot of the server in use](./screenshots/quote-server-example.png)

## Getting Started

Fork this repository and read this file. This document outlines all of this tasks to complete this weeks homework.

## Want to fetch your quotes from the internet?

Try fetching quotes from the Quotable API: https://api.quotable.io/quotes?page=1 or from the GIST linked at the bottom of this README.

## Level 1 Challenge - make the quote server

Your server must have at least these two "routes":

- `/quotes` - returns ALL of the quotes, as JSON.
- `/quotes/random` - returns ONE of the quotes, picked differently at random each time it is requested.

A list of quotes (in JSON format) is provided in this repo [quotes.json](./quotes.json), but it will also be included in the starter project on glitch. Each quote is a simple object with a quote and an author.

Try to use what you know to do this challenge on your own. However, there are some steps to guide you, below.

## Add a `/quotes` route

Add a `/quotes` route to return _all_ of the quotes as JSON.

Note that the quotes have already been loaded for you from a JSON file.

Test that your server successfully serves all of the quotes as json by making a request for /quotes from your new server.

### Help - how do I add a route?

To add a new route, you can copy-paste an existing route and change its parameters.

For example, here are two (very boring) routes

```
app.get('/one', function(request, response) {
  response.send("You asked for route /one")
});

app.get('/two', function(request, response) {
  response.send("You asked for route /two")
});
```

You can refer to this short [Basic Routing](https://expressjs.com/en/starter/basic-routing.html) document for discussion on what each part does.

## Add a `/quotes/random` route

Add a `/quotes/random` route to return _ONE_ of the quotes, picked randomly on each request.

There's a function provided. Feel free to write your own function which returns one element at random from any given array, and use that!

Test that this route is working too by making a request to `/quotes/random` You should get one quote - an object with a quote and an author.

Be sure to check that the previous routes `/quotes` and `/` are still working, too!

## End of Level 1 challenge!

Well done!

- On Slack, post the address of your server, and post it on your ticket on your board.
- Read the following ideas for further work

## Level 2 Challenge - allow quote _searches_!

### Overview

In this level of the challenge you will allow the user of your quotes API to _search_ your list of quotes.

It should work with requests like this one:

- `/quotes/search?term=life`
- `/quotes/search?term=success`
- `/quotes/search?term=miss`

Extra (bonus) requirements:

- bonus: make your search case-insensitive
- bonus: make the search return matches on quote OR author text.

### Go ahead!

If you think you know how to do that, go ahead!

### In more detail

#### Algorithm

1. receive a search term (a string) to look for
2. then find any quotes that contain that string in their quote text
3. then return only those matching quotes

As with `/quotes`, your new route should return a JSON array of quotes. If you find none that match, it should return an empty array, `[]`.

#### Getting parameter(s) from the URL

We have to learn how to get the search term from the user. This is very easy to program, but you should read on to understand what is going on.

Users of the API will add their search term to their URL with a _query parameter_ called `term`.

So, for example, if the user wanted to search for quotes about life, their HTTP request might have this target: `/quotes/search?term=life`

You should [read about the query string part of the URL, here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web).

#### So, how do I get these query parameters when using Express?

In express, we use the object `req.query`, which will have all the parameters passed to us in the URL's query string. [The official documentation is here](https://expressjs.com/en/api.html#req.query).

#### An intermediate step - echo the parameter

Once you think you understand the above you might want to make a simple test route that takes a query parameter and just repeats the word back to the user.

e.g. `/echo?word=ismail` should just return `You said 'ismail'`

then _finally_ you'll be ready to use this variable in searching through your quotes!

### Searching for quotes - a pure JS exercise

Once you know which word you are searching for, the next task is really a pure Javascript task.

Searching through your list of quotes to find ones whose text includes that word... this is done no differently in Express or Node than in pure Javascript.

So I suggest you first get it working in pure Javascript. That will give you less to think about.

[Here is an example pure-javascript project for developing this part of your code](https://repl.it/@enz0/findMatchingQuotes). But you could do the same in your local development environment.

Once you've got that working, you can copy-paste your function into your Express app and use it.

### Ideas for further work

- Use YOUR favourite quotes

- Use the same code to serve something other than quotes - maybe revision notes, proverbs, or other data that you want to be reminded about.

## Challenge: Intermediate: Write a case study of what you've built

- Write a case study of what you've built. This should be a blog post of at least 250 words. Of course you can write more if you want to. Post this on your blog, which should be a page on your portfolio. If you don't have a blog? Make one! You can use [dev.to](https://dev.to/) or [Hashnode](https://hashnode.com/) and map the domain to your own.

## Challenge: Make your server available on the internet with Runkit

If you want to share your server with other people, you can use Runkit. It's a free service that lets you run Node code on the internet.

- Go to https://runkit.com/home
- Sign up for a free account
- Create a new notebook
- Copy-paste your code into the notebook
- Click the "Run" button to run your code
- Click the "Endpoint" button to get a URL for your server
  .......................
  // myRunKit Endpoint // 20240413204752
  // https://untitled-ofqubsneu7aq.runkit.sh/

{
"error": "socket hang up",
"message": "ECONNRESET"
}
.....................................
Here's an example of a [Runkit notebook](https://runkit.com/sallymcgrath/quote-server) that creates [endpoints](https://quote-server-c8voo0a0pfdh.runkit.sh/) you can use.

This is pulling from an API: https://api.quotable.io/quotes?page=1

## Challenge: Advanced: Add a React app as a front-end

Note: only do this if you have done all other coursework.

- Make a React app called quotes-react-app
- Have it fetch a random quote from your hosted server. You'll have to enable CORS on the Express app. (See below.)
- Bonus: Allow the user to get a new random quote from the server, by clicking a button or clicking the quote.
- Host your React app on Netlify
- Post the URL to your hosted React app on Slack and attach it to your ticket

### Example screenshot of Simple React app

Here's an example of how your React app might look.
Note I didn't add a "get new quote" button here.
![Example Screenshot of React App](./screenshots/example_react_quotes_app.png)

#### Enabling CORS on the Express app

You'll have to install and [enable CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) in order to allow your JSON to be loaded from a different server than your React app was initially loaded.

in `package.json` add a dependency for `"cors": "^2.8.5"`

Then in your `server.js` add...

`const cors = require('cors')`

and

`app.use(cors())`

Read more on [CORS in Express](https://expressjs.com/en/resources/middleware/cors.html).

### Credits

I found the quotes list here https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json
