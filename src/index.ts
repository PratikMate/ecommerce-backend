// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(bodyParser.json());

// // Routes
// import userRoutes from './routes/userRoutes';
// import productRoutes from './routes/productRoutes';
// import orderRoutes from './routes/orderRoutes';

// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI!)
//     .then(() => {
//         console.log('MongoDB connected');
//         app.listen(process.env.PORT, () => {
//             console.log(`Server running on port ${process.env.PORT}`);
//         });
//     })
//     .catch(err => console.log(err));

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;
console.log('PORT:', PORT)

// MongoDB connection
mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    });
