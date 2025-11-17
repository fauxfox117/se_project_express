# WTWR Express API Implementation Checklist

## 6. Database Setup
- [ ] **Install MongoDB locally** *(15 min)*
  - Verify MongoDB is running on your system
  - Test connection via MongoDB Compass or CLI

- [ ] **Install Mongoose** *(2 min)*
  ```bash
  npm install mongoose@^8.9.5
  ```

- [ ] **Connect to database in app.js** *(5 min)*
  - Add mongoose connection: `mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')`
  - Test connection

## 6.1 Create Schemas and Models *(30-45 min)*

### User Schema *(15 min)*
- [ ] Create `models/user.js`
- [ ] Implement user schema with fields:
  - `name` (required string, 2-30 chars)
  - `avatar` (required string, URL validation)

### Clothing Item Schema *(20 min)*
- [ ] Create `models/clothingItem.js`
- [ ] Implement clothing item schema with fields:
  - `name` (required string, 2-30 chars)
  - `weather` (required string, enum: 'hot', 'warm', 'cold')
  - `imageUrl` (required string, URL validation)
  - `owner` (required ObjectId ref to User)
  - `likes` (array of ObjectId refs to User, default empty)
  - `createdAt` (Date, default Date.now)

### URL Validation *(10 min)*
- [ ] Install validator package: `npm install validator`
- [ ] Add custom URL validation to `avatar` and `imageUrl` fields

## 7. Routes and Controllers *(60-90 min)*

### User Routes *(30 min)*
- [ ] Create `routes/users.js`
- [ ] Create `controllers/users.js`
- [ ] Implement routes and controllers:
  - `GET /users` → `getUsers`
  - `GET /users/:userId` → `getUser`
  - `POST /users` → `createUser`

### Clothing Item Routes *(30 min)*
- [ ] Create `routes/clothingItems.js`
- [ ] Create `controllers/clothingItems.js`
- [ ] Implement routes and controllers:
  - `GET /items` → `getClothingItems`
  - `POST /items` → `createClothingItem`
  - `DELETE /items/:itemId` → `deleteClothingItem`

### Handle Non-existent Resources *(10 min)*
- [ ] Add catch-all route in app.js
- [ ] Return 404 with message: "Requested resource not found"

## 8. Temporary Authorization *(20 min)*

### Create Test User *(10 min)*
- [ ] Use Postman to create a test user
- [ ] Verify user appears in MongoDB Compass
- [ ] Copy the user's `_id`

### Authorization Middleware *(10 min)*
- [ ] Add middleware in app.js to attach user to req object
- [ ] Use test user's `_id` in middleware
- [ ] Update `createClothingItem` controller to use `req.user._id`

## 9. Error Handling *(45-60 min)*

### Setup Error Utils *(10 min)*
- [ ] Create `utils/errors.js`
- [ ] Export error status codes (400, 404, 500)

### Implement Error Handling *(35 min)*
- [ ] Add error handling to all controllers
- [ ] Handle specific error types:
  - 400: Invalid data/Invalid ID
  - 404: Resource not found
  - 500: Server error
- [ ] Use `console.error()` for logging
- [ ] Use `.orFail()` helper for find operations

## 10. Like/Unlike Routes *(30 min)*

### Like Routes *(20 min)*
- [ ] Add routes to clothingItems router:
  - `PUT /items/:itemId/likes` → `likeItem`
  - `DELETE /items/:itemId/likes` → `dislikeItem`

### Like Controllers *(10 min)*
- [ ] Implement `likeItem` using `$addToSet`
- [ ] Implement `dislikeItem` using `$pull`
- [ ] Use `{new: true}` option in both

## 11. Testing *(30-45 min)*

### Postman Setup *(15 min)*
- [ ] Create Postman account
- [ ] Fork the provided test collection
- [ ] Configure environment variables

### API Testing *(30 min)*
- [ ] Test all user endpoints
- [ ] Test all clothing item endpoints
- [ ] Test like/unlike functionality
- [ ] Test error scenarios (404, 400, 500)

## Final Steps *(15 min)*
- [ ] **Code Review** *(10 min)*
  - Check all routes are properly connected
  - Verify error handling is consistent
  - Ensure all required fields are validated

- [ ] **Documentation** *(5 min)*
  - Update README with API endpoints
  - Document any environment setup requirements

---

## Estimated Total Time: **4-6 hours**

### Time Breakdown:
- Database Setup: 30-45 min
- Schemas & Models: 30-45 min  
- Routes & Controllers: 60-90 min
- Authorization: 20 min
- Error Handling: 45-60 min
- Like/Unlike: 30 min
- Testing: 30-45 min
- Final Steps: 15 min

### Tips:
- Work through sections sequentially
- Test each endpoint as you build it
- Use MongoDB Compass to verify data changes
- Keep Postman open for continuous testing
- Don't skip error handling - it's critical for a robust API
