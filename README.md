# MERS stack blog app

---

## Description

---

This is a MERN stack blog app with authentication
You can create, edit, delete, update a blog post which means this is a CRUD app
Safety authentication

---

## API

End point
**user**

1. /api/users for register
2. /api/users/login for login

**posts**

1. /api/posts **GET**, **POST** to get post and post post
2. /api/posts/:userId **GET** to get users all posts
3. /api/posts/:useId/:postId **GET**, **DELETE**, **PUT** to get, delete, update users single post

**comments**

1. /api/posts/:userId/:postId/comments **GET**, **POST** to get all posts comments and post a comment

sample image src is below

- imageSrc01: https://images.unsplash.com/photo-1640622842223-e1e39f4bf627?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80

- imageSrc02: https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80

- imageSrc03: https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=913&q=80
