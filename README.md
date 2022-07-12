# REST Api for Questions and Answers Web App
Questions and Answers is a React Single Page App, where you can ask a question and have other users answer. Inspired by Quora.

The REST Api powers the app by providing an auth and a data service. Data is stored in MongoDB Atlas. The api itself is deployed on Heroku.

## Root
- Route: '/api'
- Returns REST Api meta data

## Auth
- Route: '/api/auth'
	- POST: '/signup', 
	- POST: '/login', 
	- POST: '/logout'

## Data service
Basic structure: '/api/collections/:collection/:_id'

**Response is always an object with two or more properties! It always has message and a result.**

### **GET**

- `GET /api/collections/:collection` - Returns object with a message and a result array; Returns status 404 if there are no results.
- `GET /api/collections/:collection/:id` - Returns object with a message and a result with matching ID; Returns status 404 if there are is no result.

### **POST** 
- `POST /api/collections/:collection` - Create new item in the chosen collection. Returns the created item.

### **PUT**
- `PUT /api/collections/:collection/:_id` - Update item with matching ID. Returns the updated item.

### **DELETE**
- `DELETE /api/collections/:collection/:_id` - Delete item with matching ID. Returns status 202 and a message.

## Query parameters

### `SORT` 
Append URL encoded string `sortBy={property asc/desc}` to the query parameters to sort by property name in ascending (`asc`) or descending (`desc`) order.

Example:
```
(unencoded) /collections/answers?sortBy=createdAt desc
GET /collections/answers?sortBy=createdAt%20desc
```
### `SEARCH` 
Append URL encoded string `where={property=value}` to the query parameters. Only full matches will be returned. 

Example:
```
(unencoded) /collections/answers?where=owner=8f414b4fab394d36bedb2ad69da9c830
GET /collections/answers?where=owner%3D%228f414b4fab394d36bedb2ad69da9c830%22
```

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
* Can be deleted only if there are no answers

### Answer model
- body
- owner, ref: 'User'
- parent, ref: 'Question'
- meta: {
	question,
	circle,
}
- upvotes, Array, ref: 'User'
- downvotes, Array, ref: 'User'
- total score (calculated)

### Comment model
- body (only text)
- owner, ref: 'User
- parent, ref: 'Answer'

### Circle model
- title
- imageUrl
- description
- owner, ref: 'User'
* Can be deleted only if there are no answers


