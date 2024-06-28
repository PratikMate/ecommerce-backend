import { Request, Response } from 'express';
import Order from '../models/order';
import Product from '../models/product';
import { AuthRequest } from '../middlewares/auth';

// Create a new order
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    const { products } = req.body;
    try {
        const user = req.user;
        let total = 0;

        // Calculate the total price
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                res.status(404).json({ message: `Product with ID ${item.product} not found` });
                return;
            }
            total += product.price * item.quantity;
        }

        const order = new Order({ user: user.id, products, total });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get all orders for the authenticated user
export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.status(200).json(orders);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get a specific order by ID
export const getOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id).populate('products.product');
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        if (order.user.toString() !== req.user.id) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        res.status(200).json(order);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

// Update an order by ID
export const updateOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { products } = req.body;
    try {
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        if (order.user.toString() !== req.user.id) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }

        // Update order products and total
        let total = 0;
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                res.status(404).json({ message: `Product with ID ${item.product} not found` });
                return;
            }
            total += product.price * item.quantity;
        }
        order.products = products;
        order.total = total;

        await order.save();
        res.status(200).json(order);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

// Delete an order by ID
export const deleteOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        if (order.user.toString() !== req.user.id) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }

        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
