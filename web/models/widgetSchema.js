import { Schema, model } from 'mongoose';
var widgetsSchema = new Schema({
    store:{type: String},
    name:{type: String},
    type:{type: String},
    type:{type: String},
    product_type:{type: String},
    redirects:{type: Object},
    language:{type: Object},
    timer:{type: Object},
    layout:{type: Object},
    images:{type: Object},
    style:{type: Object},
    status:{type: Number, default:0},
	created_date:{
        type: Date,
        default: Date.now()
    }
});
 
export default model('widgets', widgetsSchema);