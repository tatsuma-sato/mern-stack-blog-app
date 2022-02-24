# MERN stack blog app

## Description

This is a MERN stack blog app with authentication
You can create, edit, delete, update a blog post which means this is a CRUD app
Safety authentication

## API

**user**

1. /api/users for register
2. /api/users/login for login

**posts**

1. /api/posts **GET**, **POST** to get post and post post
2. /api/posts/:userId **GET** to get users all posts
3. /api/posts/:useId/:postId **GET**, **DELETE**, **PUT** to get, delete, update users single post

**comments**

1. /api/posts/:userId/:postId/comments **GET**, **POST** to get all posts comments and post a comment

## Site images

### Home page

![home page](https://user-images.githubusercontent.com/82295664/155458656-d354ff6d-a1f8-4793-9bb4-37ee84b382b2.png)

### View posts page

![view page](https://user-images.githubusercontent.com/82295664/155458865-2a14b290-ea0c-4e3c-ae21-2c447c2d0e80.png)
