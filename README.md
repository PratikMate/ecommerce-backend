# ecommerce-backend

- NOTE: Update .env

## Getting Started
- npm install
- npm start

## API Routes

### User Management
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user

### Product Management
- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Retrieve a product by its ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update an existing product
- `DELETE /api/products/:id` - Delete a product by its ID

### Order Management
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Retrieve all orders
- `GET /api/orders/:id` - Retrieve an order by its ID
- `PUT /api/orders/:id` - Update the status of an existing order
- `DELETE /api/orders/:id` - Delete an order by its ID

### PayPal Integration
- `POST /paypal/create-order` - Create a new PayPal order
- `POST /paypal/capture-order` - Capture an existing PayPal order