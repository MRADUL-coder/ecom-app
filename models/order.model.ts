import mongoose, {Schema, model, models} from 'mongoose'
import UserModel from './user.model'
import ProductModel from './product.model'

const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: UserModel,
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: ProductModel,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'processing',
        enum: ['processing', 'dispatched', 'returned']
    }
}, {timestamps: true})

const OrderModel = models.Order || model("Order", orderSchema)
export default OrderModel