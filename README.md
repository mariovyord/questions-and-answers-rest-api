# **REST Api for Questions and Answers Web App**
Questions and Answers is a React Single Page App, where you can ask a question and have other users answer. Inspired by Quora.

The REST Api powers the app by providing an auth and a data service. Data is stored in MongoDB Atlas. The api itself is deployed on Heroku.

For educational purposes only!

- Route: `/api` returns REST Api meta data.

## **Authorized Requests**

Some of the endpoints require for you to make authorized requests (marked below). To do so, add header `X-Auth-Token` with the access token, returned by the service upon login or signup.

Example: 

```
X-Auth-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

Access Tokens have short lifespan! To get new pair of tokens, send `POST` request to `/api/auth/token` with Refresh Token in JSON body. Include the `X-Auth-Token` header!

Example: 

```
{
	refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
}
```

## **Auth service**

`GET '/api/auth` - Returns auth endpoints.

### **Sign up**
- `POST /api/auth/signup` - Create new user. For User model check below. Returns Access Token and Refresh Token. If error occurs, returns `status 400` and errors array.

### **Log in**
- `POST /api/auth/login` - Log in user with **username** and **password**. Returns Access Token and Refresh Token. Stores Refresh Token in DB and matches it with user ID. If error occurs, returns `status 401`.


### **Log out**
- `DELETE /api/auth/logout` - Log out user with Refresh Token. Deletes Refresh Token in DB and ends session. Returns `status 204` if succesfull. If error occurs, returns `status 400`.

### **Get new tokens**
- `POST /api/auth/token` - Send Refresh Token in body and get new Access Token. Returns new pair of tokens. If error occurs, returns `status 401` or `403`. 

## **User data service**

### **GET**
- `GET /api/users/:_id` - Returns data for user with matching ID. Only owners can retreive the full user data, others get it limited to publicly available information. If error occurs, returns `status 400`. **Authorized request!**

### **PATCH**
- `PATCH /api/users/:_id` - For now limited to changing imageUrl property. For owners only. If error occurs, returns `status 401`. **Authorized request!**

## **Data service**
Basic structure: `'/api/collections/:collection/:_id'`

**The response from the data service is always an object with two or more properties! At minimum it has message and result.**

### **GET**

- `GET /api/collections/:collection` - Returns object with a message and a result array; Returns status 404 if there are no results.
- `GET /api/collections/:collection/:id` - Returns object with a message and a result with matching ID; Returns status 404 if there are is no result.

### **POST** 
- `POST /api/collections/:collection` - Create new item in the chosen collection. Returns the created item. **Authorized request!**

### **PATCH**
- `PATCH /api/collections/:collection/:_id` - Update item with matching ID. Returns the updated item. **Authorized request!**

### **DELETE**
- `DELETE /api/collections/:collection/:_id` - Delete item with matching ID. Returns status 202 and a message. **Authorized request!**

### **VOTE**
- `PATCH /api/collections/:collection/:_id/vote` - Upvote/downvote item in collection (for now only Answer data model support this feauture). Send JSON as shown below. If both are `true`, only upvote will register in DB. **Authorized request!**

Example:

```
{
    "upvote": {Boolean},
    "downvote": {Boolean}
}
```

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
### `PAGINATION`

*By default the service returns 10 entries.*

Append `page={pageNumber}&pageSize={entries}` to the query parameters, where `{pageNumber}` is the number of entries to skip and `{entries}` is the number of entries to return.

Example: Second page of entries from the answers collection, assuming 10 entries per page:
```
GET /collections/answers?page=2&pageSize=10
```

### `POPULATE`

Append `populate={property}` to the query parameters, where `{property}` is the property you want to populate with data.
Example:
```
GET /collections/answers/62cd7b659032c071e10e4f8e?populate=owner
```

### `COUNT`

Append `count=true` to the query parameters. It can be combined with `SEARCH` query.
Example:
```
GET /collections/answers?count=true
```

### `SELECT`

*Coming Soon*

## **Error handling**

The services return corresponding HTTP response status codes. If error occurs, the resulting json has `message` (string error summary) and `errors` (array with all the errors).

## Data models

### User Model
- username*
- firstName*
- lastName*
- password*
- description
- imageUrl
- role ['user', 'moderator', 'admin']

### Question model
- body
- owner, ref: 'User'
- circle, ref: 'Circle'
- meta: { circle: String }
- hidden (from profile)

### Answer model
- body
- owner, ref: 'User'
- question, ref: 'Question'
- circle, ref: 'Circle'
- meta: { question: String, circle: String }
- upvotes, Array, ref: 'User'
- downvotes, Array, ref: 'User'
- score (auto calculated)

### Comment model
- body
- owner, ref: 'User
- answer, ref: 'Answer'

### Circle model
- title
- imageUrl
- description
- owner, ref: 'User'



