# Website blog - Work in progress

# The blog in the current state allows a user to:

- browse through existing posts
- add a new post and a new comment
- edit a post and a comment
- delete a post and attached comments
- delete a single comment
- up vote on the existing post and on the existing comment

# Readable API Server

## Installation

- Git clone this repository to gain access to the simple backend our app is going to communicate with `https://github.com/udacity/reactnd-project-readable-starter.git`
- Install packages: `npm install`
- Launch server: `node server`
- Unless modified in `config.js` server will use port 5001

## Intallation part 2

- Git clone this repo: `git@github.com:bkluczynski/Poster.git`
- Install packages: `npm install`
- Launch app in the directory where you've cloned the repo: `yarn start`
- Unless modified in `config.js` server will use port 3000

Views
-----

Your application should have, at a minimum, four views:

-   Default (Root)
    -   should list all available categories, which should link to a category view for that category
    -   should list all of the posts ordered by voteScore (highest score first)
    -   should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
    -   should have a control for adding a new post
-   Category View
    -   identical to the default view, but filtered to only include posts with the selected category
-   Post Detail View
    -   should show the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score
    -   should list all of the comments for that post, ordered by voteScore (highest first)
    -   should have a control for reordering comments by score or timestamp
    -   should have controls to edit or delete the post
    -   should have a control to add a new comment.
    -   implement comment form however you want (inline, modal, etc.)
    -   comments should also have controls for editing or deleting
-   Create/Edit View
    -   should have a form to create new post or edit existing posts
    -   when editing, existing data should be populated in the form

 **Post/Comment UI**

 Posts and comments, in all views where they are displayed, should display their current score and should have controls to increment or decrement the `voteScore` for the object. Posts should display the number of comments associated with the post.


