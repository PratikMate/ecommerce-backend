import { Schema, model } from 'mongoose';

interface IOrder {
    user: Schema.Types.ObjectId;
    products: { product: Schema.Types.ObjectId, quantity: number }[];
    total: number;
    status: 'pending' | 'shipped' | 'delivered';
}

const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending',
    },
});

export default model<IOrder>('Order', orderSchema);
