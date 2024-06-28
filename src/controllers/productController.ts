import { Request, Response } from 'express';
import Product from '../models/product';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price, stock } = req.body;
    try {
        const product = new Product({ name, description, price, stock });
        await product.save();
        res.status(201).json(product);
    } catch (err:any) {
        res.status(400).json({ error: err.message });
    }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err:any) {
        res.status(400).json({ error: err.message });
    }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (err:any) {
        res.status(400).json({ error: err.message });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, price, stock },
            { new: true, runValidators: true }
        );
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (err:any) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err:any) {
        res.status(400).json({ error: err.message });
    }
};
