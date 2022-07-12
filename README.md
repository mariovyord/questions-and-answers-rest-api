# REST Api for Questions and Answers Web App
Questions and Answers is a React Single Page App, where you can ask a question and have other users answer. Inspired by Quora.

The REST Api powers the app by providing an auth and a data service. Data is stored in MongoDB Atlas. The api itself is deployed on Heroku.

## Auth
- Route: '/auth'
	- POST: '/signup', 
	- POST: '/login', 
	- POST: '/logout'

## Root
- Route: '/api/'
- Returns REST Api meta data

# Data service
- Basic structure: '/collections/:collection'
- '/collections' returns list of collections

# Answers

## GET: Get all answers 
GET request to '/answers'

- POST: Create new answer 

- Route: '/answers/:id'
- GET: Details page for answer with comments section
- PATCH: Upvote or downvote for users
- PUT, DELETE for owner

### Questions
- Route: '/questions' + quary
- GET: Get all questions 
- POST: Create new question

- Route: '/questions/:id'
- GET: Get all answers to the question
- DELETE for owner (can be deleted only if there are no answers)

## Data models

### User Model
- username
- firstName
- lastName
- description
- imageUrl
- role ['user', 'moderator', 'admin']
- score
- password

### Question model
- body
- owner, ref: 'User'
- circle, ref: 'Circle'
- meta: {
	circle,
}
- hidden (from profile)

### Answer model
- body
- owner, ref: 'User'
- parent, ref: 'Question'
- meta: {
	question,
	circle,
}
- likes
- dislikes
- total score virtual

### Comment model
- body (only text)
- owner, ref: 'User
- parent, ref: 'Answer'

### Circle model
- title
- imageUrl
- description
- owner, ref: 'User'


