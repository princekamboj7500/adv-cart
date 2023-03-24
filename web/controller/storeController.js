import { GraphqlQueryError, BillingInterval } from "@shopify/shopify-api";
import shopify from "../shopify.js";
import cartSchema from "../models/cartSchema.js";
import widgetSchema from "../models/widgetSchema.js";

const storeController = {};
storeController.storeDetails = async function(session){
    const client = new shopify.api.clients.Graphql({session});
    const response = await client.query({
      data: `query {
        shop {
          name
          email
          currencyCode
          myshopifyDomain
          checkoutApiSupported
          taxesIncluded
        }
      }`,
    });
    return response.body.data.shop;
}

storeController.cart = async function(store){
  var store = await cartSchema.findOne({store: store});
  if(store){
    return store;
  }else{
    return {
        "live_mode": false,
        "announcement_bar": false,
        "announcement_bar_items": [],
        "tiered_progress_bar": false,
        "tiered_progress_bar_tabs": [{
            id: 'tire-0',
            content: 'Add New Bar',
            panelID: 'tire-content-0',
            layout_type: 'in_line',
            tier: [{
                name: 'Tire 1',
                type: 'free_shipping',
                min_price: 50,
                free_shipping_all_products: false,
                free_shipping_all_sub_products: false,
                presentment_currencies: false,
                product_id: null,
                open: false
            }]
        }],
        "buy_more_status": false,
        "buy_more": {
            "display_type": "button",
            "discount_lang": "Buy {{quantity}} save {{discount}}",
            "discount_success": "Buy More Save More",
            "discount_type": "fixed_amount",
            "product": null,
            "discount_tiers": [{
                quantity: 2,
                discount: 5
            }]
        },
        "language": {
            "cart_title": "Your Cart",
            "empty_cart": "Empty Cart",
            "subtotal_text_one_item": "Subtotal ({{ item_count }} item)",
            "subtotal_text_many_item": "Subtotal ({{ item_count }} items)"
        },
        "discount_input_status": false,
        "discount_input": {
            "discount_code_label": "Discount Code",
            "discount_label": "Discount",
            "discount_button_label": "Apply",
            "discount_invalid_message": "Invalid Discount Code"
        },
        "shopping_btn_status":false,
        "shopping_btn": "Continue Shopping",
        "note_status": false,
        "note_label": "Add a note (optional)",
        "checkout_btn_status": false,
        "checkout_btn_settings":{
            "checkout_label": "<i class=\"rebuy-button-icon prefix fas fa-lock\"></i> Checkout <i class=\"\"></i>",
            "checking_out_label": "<i class=\"rebuy-button-icon prefix fas fa-circle-notch fa-spin\"></i> Checking Out...",
            "checkout_routing": "automatic",
            "custom_checkout_url": ""
        },
        "cart_btn_status": true,
        "cart_btn_settings":{
            "view_cart_label": "View Cart",
            "view_cart_working_label": "<i class=\"rebuy-button-icon prefix fas fa-circle-notch fa-spin\"></i> Redirecting to Cart..."
        },
        "payment_installments_status": false,
        "payment_installments_settings":{
            "payment_count": 4,
            "provider": "AfterPay",
            "terms_url": "https://www.afterpay.com/installment-agreement"
        },
        "product_form_redirect": "none",
        "custom_code_status": false,
        "custom_code": ""
    }
  }
}

storeController.cartSave = async function(session, data){
  var store = await cartSchema.findOne({store: session.shop});
  if(store){
    await cartSchema.findByIdAndUpdate(store.id, data);
  }else{
    await cartSchema.insertMany([data]);
  }
}

storeController.widgetSave = async function(session, data){
  await widgetSchema.insertMany([data]);
  // var store = await widgetSchema.findOne({store: session.shop});
  // if(store){
  //   await widgetSchema.findByIdAndUpdate(store.id, data);
  // }else{
  //   await widgetSchema.insertMany([data]);
  // }
}

storeController.getWidget = async function(session, id){
  return await widgetSchema.findById(id);
}

storeController.widgets = async function(store){
  var widgets = await widgetSchema.find({store: store});
  if(widgets){
    return widgets;
  }else{
    return false
  }
}

storeController.updateWidget = async function(store, id, body){
  return await widgetSchema.findByIdAndUpdate(id, body);
}

storeController.getApp = async function(session){
  const client = new shopify.api.clients.Graphql({ session });
  const APP_QUERY = `query {
    currentAppInstallation {
      id
      metafields(first: 3) {
        edges {
          node {
            namespace
            key
            value
          }
        }
      }
    }
  }`;
  const response = await client.query({
      data: APP_QUERY,
  });
  // return response.body;
  return response.body.data.currentAppInstallation.id;
}
 
storeController.saveMeta = async function(session, appId, data){
  const client = new shopify.api.clients.Graphql({ session });
  const META_QUERY = {
    data: {
      "query": `mutation CreateAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafieldsSetInput) {
          metafields {
            id
            namespace
            key
          }
          userErrors {
            field
            message
          }
        }
      }`,
      "variables": {
        "metafieldsSetInput": [
          {
            "namespace": "settings",
            "key": "cart",
            "type": "json",
            "value": JSON.stringify(data),
            "ownerId": appId
          }
        ]
      },
    },
  };
  return await client.query(META_QUERY);
}

 export default storeController; 