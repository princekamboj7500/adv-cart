import { Schema, model } from 'mongoose';
var StoreSchema = new Schema({
    name:{type: String},
    store:{type: String},
    token:{type: String},
    email:{type: String},
    currencyCode:{type: String},
    myshopifyDomain:{type: String},
    plan:{type: String},
	created_date:{
        type: Date,
        default: Date.now()
    }
});
 
export default model('stores', StoreSchema);