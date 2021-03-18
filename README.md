# Pokedex REST API
This projects accompanies the video course for building a simple Pokedex REST API with NodeJS and ExpressJS.

[Watch the course](https://www.youtube.com/playlist?list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq)

[![youtube_social_icon_red](https://user-images.githubusercontent.com/36934493/112694423-f0e08400-8e47-11eb-9fc4-47539085454b.png)](https://www.youtube.com/channel/UCTaM-aIupL05-N30REc69eA)


## Using this repository

This repo has a branch for each video in the course. The branch corresponds to the state of the code at **the end of the video**.

You can fork and clone this repo, or create a new one from scratch and follow along with the videos.

### Video 1: Introduction

[Watch](https://www.youtube.com/watch?v=WHshWCQvg_Q&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=1)

_This video makes no code changes_

### Video 2: What is a REST API?

[Watch](https://www.youtube.com/watch?v=bT_n_Sb3J3U&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=2)

_This video makes no code changes_

### Video 3: Installing Programs and Tools

[Watch](https://www.youtube.com/watch?v=-i24de_R3Rc&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=3)

1. Install [Sublime Text 3](https://www.sublimetext.com/3) or another code text editor (e.g. [Atom](https://atom.io/) or [VS Code](https://code.visualstudio.com/download))
1. Install [Postman](https://www.getpostman.com/downloads/) or another HTTP request client (e.g. [Insomnia](https://insomnia.rest/download))
1. Install [DB Browser for SQLite](https://sqlitebrowser.org/dl/) or other SQLite database browser
1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
1. Install [Sourcetree](https://www.sourcetreeapp.com/) or other git GUI (e.g. [GitHub Desktop](https://desktop.github.com/))
1. Create a [GitHub account](https://github.com/join)
1. Install [NodeJS (version 14 or higher)](https://nodejs.org/en/download/)

### Video 4: Setting Up the Environment

[Watch](https://www.youtube.com/watch?v=Z3LYzc46C20&list=PLSwIxbgo4ojtYwVrLOiX5THfQkrCixMEq&index=4)

#### Initialize your git repository with Sourcetree

1. Open Sourcetree and click the "+ Create" button (on Windows) or "New..." > "Create Local Repository" (on macOS)
1. Enter the path on your computer where you want to create your repository
1. Enter a name for the repository
1. Click "Create"

#### Initialize your npm package

1. Create a folder in your project's directory called `api`
1. Open a terminal window (Command Prompt on Windows)
1. Change the directory to the path of the `api` folder you created:

```
cd /path/to/your/project/api
```
4. Type `npm init` and press Enter
1. Fill in the information at the prompts that appear, making sure to type `app.js` at the prompt for `entry point`
1. Install Express by typing the following in your terminal (or Command Prompt) window: `npm install express --save`

#### Create the REST API Server

1. Create a file in the `api` directory called `app.js`
1. In `app.js` import Express:

`pokedex-api/api/app.js`
```javascript
const express = require('express');
```

3. Create the server:

`pokedex-api/api/app.js`
```javascript
const app = express();
```

4. Define your server's port:

`pokedex-api/api/app.js`
```javascript
const port = 3000;
```

5. Add a test "Hello World" endpoint:

`pokedex-api/api/app.js`
```javascript
app.get('/hello', (req, res) => {
	res.send('Hello World!');
});
```
6. Start your server listening on your port:

`pokedex-api/api/app.js`
```javascript
app.listen(port, () => console.log(`Pokedex API listening on port ${port}!`));
```

#### Test your First Endpoint

1. Open terminal/command prompt and make sure you're in the directory that `app.js` is located in
1. Start the server by typing `node app.js` and press Enter
 - If everything is working, you should see `Pokedex API listening on port 3000!`
3. Open Postman
1. Click "+" to open a new request tab
1. In the URL bar, type `http://localhost:3000/hello`
1. Click the "Send" button
 -  If everything is working, you should see `Hello World!` in the response pane.
7. Open your terminal/command prompt window and press Ctrl + C to stop the server
