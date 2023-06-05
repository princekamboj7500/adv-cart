import { Schema, model } from 'mongoose';
var CartSchema = new Schema({
    store:{type: String},
    live_mode:{type: Boolean, default: false},
    general_settings_status:{type: Boolean, default: false},
    general_settings:{type: Object},
    announcement_bar:{type: Boolean, default: false},
    progress_bar_color:{type: Object},
    announcement_position:{type: String},
    announcement_bar_items:{type: Array},
    tiered_progress_bar:{type: Boolean, default: false},
    tiered_progress_bar_tabs:{type: Array},
    buy_more_status:{type: Boolean, default: false},
    buy_more:{type: Object},
    language:{type: Object},
    discount_input_status:{type: Boolean, default: false},
    discount_input:{type: Object},
    shopping_btn_status:{type: Boolean, default: false},
    continue_shopping:{type: Object},
    note_status:{type: Boolean, default: false},
    note_input:{type: Object},
    checkout_btn_status:{type: Boolean, default: false},
    checkout_btn_settings:{type: Object},
    cart_btn_status:{type: Boolean, default: false},
    cart_btn_settings:{type: Object},
    payment_installments_status:{type: Boolean, default: false},
    payment_installments_settings:{type: Object},
    product_form_redirect:{type: String},
    custom_code_status:{type: Boolean, default: false},
    clear_cart_status:{type: Boolean, default: false},
    clear_cart:{type: Object},
    cart_empty_status:{type: Boolean, default: false},
    cart_empty:{type: Object},
    trust_badge:{type: Object},
    benefit:{type: Object},
    custom_code:{type: String},
	created_date:{
        type: Date,
        default: Date.now()
    }
});
 
export default model('cart_settings', CartSchema);