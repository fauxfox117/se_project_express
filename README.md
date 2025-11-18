# WTWR (What to Wear?) - Backend API

A backend API for the WTWR application that helps users decide what to wear based on weather conditions. Users can manage clothing items, create profiles, and like/unlike items.

## About

This project provides a REST API for managing users and clothing items. The API allows users to:

- Create and manage user profiles
- Add, view, and delete clothing items
- Categorize clothing by weather conditions (hot, warm, cold)
- Like and unlike clothing items
- View all users and clothing items

## Functionality

- **User Management**: Create users with name and avatar URL validation
- **Clothing Item Management**: CRUD operations for clothing items with weather categorization
- **Like System**: Users can like/unlike clothing items with MongoDB operators
- **Data Validation**: URL validation for avatars and images, required field validation
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
- **Database Integration**: MongoDB with Mongoose for data persistence

## Technologies and Techniques Used

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Mongoose schema validation, validator library for URLs
- **Code Quality**: ESLint for code linting and style enforcement
- **Development Tools**: Nodemon for development server auto-restart
- **HTTP Client Testing**: Configured for Postman API testing

## API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:userId` - Get user by ID
- `POST /users` - Create a new user

### Clothing Items

- `GET /items` - Get all clothing items
- `POST /items` - Create a new clothing item
- `DELETE /items/:itemId` - Delete a clothing item by ID
- `PUT /items/:itemId/likes` - Like an item
- `DELETE /items/:itemId/likes` - Unlike an item

## Installation and Running the Project

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

### Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd se_project_express
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB:

   ```bash
   # On macOS with Homebrew:
   brew services start mongodb-community

   # On Windows/Linux:
   mongod
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. The server will run on `http://localhost:3001`

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run lint` - Run ESLint to check code style

## Data Models

### User Schema

```javascript
{
  name: String (required, 2-30 characters),
  avatar: String (required, valid URL)
}
```

### Clothing Item Schema

```javascript
{
  name: String (required, 2-30 characters),
  weather: String (required, enum: ["hot", "warm", "cold"]),
  imageUrl: String (required, valid URL),
  owner: ObjectId (required, reference to User),
  likes: [ObjectId] (array of User references, default: []),
  createdAt: Date (default: Date.now)
}
```

## Testing

The API can be tested using Postman or any HTTP client. Example requests:

### Create a User

```bash
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Create a Clothing Item

```bash
POST /items
Content-Type: application/json

{
  "name": "Winter Coat",
  "weather": "cold",
  "imageUrl": "https://example.com/coat.jpg"
}
```

## Future Enhancements

- User authentication and authorization
- Image upload functionality
- Weather API integration
- User preferences and recommendations
- Item categorization and filtering

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is part of the TripleTen Software Engineering program.
