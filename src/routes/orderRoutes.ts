import express from 'express';
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../controllers/orderController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrder);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);

export default router;
