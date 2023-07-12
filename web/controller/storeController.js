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
      "selectedCheck_items": [ ],
      "general_settings_status": true,
      "general_settings": {
          "font_family": "Lato",
          "border_radius": "10",
          "header_padding": "15",
          "subtotal_fsize": "18",
          "subtotal_price_fsize": "18",
          "subtotal_fweight": "600",
          "subtotal_price_fweight": "600",
          "subtotal_text_color": {
              "hue": 217.61194029850745,
              "saturation": 0.04375,
              "brightness": 0.03749999999999998,
              "alpha": 1
          },
          "subtotal_price_color": {
              "hue": 0,
              "saturation": 0.85,
              "brightness": 0.59375,
              "alpha": 0.9776119402985075
          },
          "header_background": "#ffffff",
          "main_background": "#ffffff",
          "footer_padding": "15",
          "footer_background": "#ffffff",
          "subtotal_color": "#000000",
          "price_color": "#ff3333",
          "compare_price_color": "#aaada9",
          "price_font": "Lato",
          "subtotal_font": "Lato",
          "cartitem": {
              "background_color": "#ffffff",
              "product_img_size": "100%",
              "product_img_padding": "10px 10px 10px 10px",
              "title_size": "15px",
              "title_color": "#0f0f0f",
              "title_weight": "600",
              "variant_size": "12px",
              "variant_color": "#0c0d0d",
              "variant_weight": "700",
              "price_size": "14px",
              "price_color": "#d65200",
              "price_weight": "800",
              "discount_size": "12px",
              "discount_color": "#9b9b9b",
              "discount_weight": "600"
          },
          "progress_bar_color": "#32f559"
      },
      "announcement_bar": true,
      "progress_bar_color": {
          "hue": 126.26865671641792,
          "saturation": 0.68125,
          "brightness": 0.75,
          "alpha": 1
      },
      "announcement_position": "topflyout",
      "announcement_width": "full",
      "announcement_speed": "2000",
      "cart_items_status": false,
      "cart_items": {
          "title_fsize": "15",
          "title_fweight": "600",
          "price_fsize": "15",
          "price_fweight": "600",
          "product_image_size": "25",
          "title_color": {
              "hue": 241.79104477611943,
              "saturation": 0,
              "brightness": 0.13749999999999996,
              "alpha": 1
          },
          "price_color": {
              "hue": 244.4776119402985,
              "saturation": 0.00625,
              "brightness": 0.16874999999999996,
              "alpha": 1
          },
          "background_color": {
              "hue": 56.417910447761194,
              "saturation": 0.01875,
              "brightness": 1,
              "alpha": 1
          }
      },
      "announcement_bar_items": [
          "Free shipping over $500",
          "Buy one get one free"
      ],
      "tiered_progress_bar": true,
      "tiered_progress_bar_tabs": [
          {
              "id": "tire-0",
              "content": "Add New Bar",
              "panelID": "tire-content-0",
              "layout_type": "in_line",
              "tier": [
                  {
                      "name": "Tire 1",
                      "type": "free_shipping",
                      "min_price": "500",
                      "free_shipping_all_products": false,
                      "free_shipping_all_sub_products": false,
                      "presentment_currencies": false,
                      "product_id": null,
                      "open": true,
                      "label": "FREE SHIPPING",
                      "label_font_weight": "700"
                  },
                  {
                      "name": "Tire",
                      "type": "product",
                      "min_price": "1000",
                      "free_shipping_all_products": false,
                      "free_shipping_all_sub_products": false,
                      "presentment_currencies": false,
                      "product_id": 8302929019156,
                      "open": true,
                      "label": "Mystery Gift",
                      "label_font_weight": "700"
                  },
                  {
                      "name": "Tire",
                      "type": "product",
                      "min_price": "2000",
                      "free_shipping_all_products": false,
                      "free_shipping_all_sub_products": false,
                      "presentment_currencies": false,
                      "product_id": 8302929281300,
                      "open": true,
                      "label": "FREE GIFT",
                      "label_font_weight": "700"
                  }
              ],
              "country": "IN"
          }
      ],
      "buy_more_status": true,
      "buy_more": {
          "display_type": "button",
          "button_color": "#059e1e",
          "discount_lang": "Buy {{quantity}} save {{discount}}",
          "discount_success": "Buy More Save More",
          "discount_type": "fixed_amount",
          "product": null,
          "discount_tiers": [
              {
                  "quantity": 2,
                  "discount": 5
              },
              {
                  "quantity": 3,
                  "discount": 10
              }
          ]
      },
      "language": {
          "cart_title": "Your Cart",
          "empty_cart": "Empty Cart",
          "subtotal_text_one_item": "Subtotal ({{ item_count }} item)",
          "subtotal_text_many_item": "Subtotal ({{ item_count }} items)"
      },
      "gift_input_status": false,
      "gift_packing": {
        "gift_title_one": "Gift Packaging ",
        "gift_title_two": "Add gift-wrapping",
        "gift_price": "$3.99",
        "gift_checked": false
      },
      "discount_input_status": false,
      "discount_input": {
          "discount_code_label": "Discount Code",
          "discount_label": "Discount",
          "discount_button_label": "Apply",
          "discount_invalid_message": "Invalid Discount Code",
          "position": "above_subtotal",
          "layout": "rounded",
          "button_font_weight": "500",
          "button_font_size": "15",
          "label_font_weight": "500",
          "label_font_size": "15",
          "button_color": {
              "saturation": 0.54375,
              "brightness": 0.5125,
              "alpha": 1
          },
          "button_font_color": "#D53600",
          "label_color": "#D53600",
          "label_font_color": "#D53600",
          "input_border": "0",
          "input_border_color": {
              "hue": 228.3582089552239,
              "saturation": 0.11875,
              "brightness": 0.03749999999999998,
              "alpha": 0.9925373134328358
          }
      },
      "shopping_btn_status": false,
      "continue_shopping": {
          "shopping_btn": "Continue shopping",
          "redirect_option": "redirecturi",
          "Position": "fly_top",
          "redirect_url": "/collections/all",
          "font_size": "15",
          "font_weight": "500",
          "font_color": "#D53600"
      },
      "note_status": false,
      "note_input": {
          "note_label": "Add a note (optional)",
          "position": "above_subtotal",
          "padding": "20",
          "inputsize": "40",
          "font_size": "15",
          "font_weight": "500",
          "font_color": "#D53600",
          "color": "#D53600"
      },
      "checkout_btn_status": true,
      "checkout_btn_settings": {
          "checkout_label": "<i class=\"rebuy-button-icon prefix fas fa-lock\"></i> Checkout <i class=\"\"></i>",
          "checking_out_label": "<i class=\"rebuy-button-icon prefix fas fa-circle-notch fa-spin\"></i> Checking Out...",
          "checkout_routing": "automatic",
          "custom_checkout_url": "",
          "checking_out_color": "#ff2e4d"
      },
      "cart_btn_status": false,
      "cart_btn_settings": {
          "view_cart_label": "View Cart",
          "view_cart_working_label": "<i class=\"rebuy-button-icon prefix fas fa-circle-notch fa-spin\"></i> Redirecting to Cart..."
      },
      "payment_installments_status": true,
      "payment_installments_settings": {
          "payment_count": 4,
          "font_size": "15",
          "font_weight": "500",
          "font_color": {
              "hue": 225.67164179104478,
              "saturation": 0.00625,
              "brightness": 0,
              "alpha": 1
          },
          "provider": "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" class=\"aftersvg\" version=\"1.1\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 431 89.5\" style=\"enable-background:new 0 0 431 89.5;\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill:none;enable-background:new ;}.st1{fill:#373737;}.st2{fill:#2A78AC;}.st3{fill:#124678;}.aftersvg{width:50px;}</style><path class=\"st0\" d=\"z\"/><g><g><path class=\"st1\" d=\"M217,29.7c4,4.1,6.3,9.5,6.3,15.2S221.1,56,217,60.1c-4,4-9.4,6.2-15.2,6.2c-3.8,0-7.2-1.3-10.2-4l-0.5-0.4    V86l-10.9,3.4V24.3h10.9v3.2l0.5-0.5c3.2-3.1,6.9-3.6,10.2-3.6C207.5,23.5,212.9,25.7,217,29.7z M212.4,44.9 c0-5.9-4.9-10.9-10.6-10.9s-10.6,5-10.6,10.9c0,5.8,4.9,10.9,10.6,10.9S212.4,50.8,212.4,44.9z\"/><path class=\"st1\" d=\"M233.5,60.1c-4-4.1-6.3-9.5-6.3-15.2s2.2-11.1,6.3-15.2c4-4,9.4-6.2,15.2-6.2c3.8,0,7.2,1.3,10.2,4l0.5,0.4 v-3.6h10.9v41.2h-10.9v-3.2l-0.5,0.5c-3.2,3.1-6.9,3.6-10.2,3.6C243,66.3,237.6,64.2,233.5,60.1z M238.1,44.9 c0,5.9,4.9,10.9,10.6,10.9c5.8,0,10.6-5,10.6-10.9c0-5.8-4.9-10.9-10.6-10.9C242.9,34,238.1,39.1,238.1,44.9z\"/><path class=\"st1\" d=\"M233.5,60.1c-4-4.1-6.3-9.5-6.3-15.2s2.2-11.1,6.3-15.2c4-4,9.4-6.2,15.2-6.2c3.8,0,7.2,1.3,10.2,4l0.5,0.4 v-3.6h10.9v41.2h-10.9v-3.2l-0.5,0.5c-3.2,3.1-6.9,3.6-10.2,3.6C243,66.3,237.6,64.2,233.5,60.1z M238.1,44.9 c0,5.9,4.9,10.9,10.6,10.9c5.8,0,10.6-5,10.6-10.9c0-5.8-4.9-10.9-10.6-10.9C242.9,34,238.1,39.1,238.1,44.9z\"/><path class=\"st1\" d=\"M281.1,89.5l9.8-23.8l-16.5-41.3h12.1L296.8,50l10.4-25.6h12l-26.3,65.2H281.1z\"/><path class=\"st1\" d=\"M281.1,89.5l9.8-23.8l-16.5-41.3h12.1L296.8,50l10.4-25.6h12l-26.3,65.2H281.1z\"/><path class=\"st1\" d=\"M21.1,65.9c-5.6,0-10.9-2.2-14.9-6.1c-4-4-6.1-9.3-6.1-14.9S2.2,34,6.1,30c4-3.9,9.3-6,14.9-6 c5.7,0,10.5,3,13.5,5.5l0.9,0.7v-5.4h6.7V65h-6.7v-5.4l-0.9,0.7C31.6,62.9,26.8,65.9,21.1,65.9z M21.1,30.4 c-7.9,0-14.4,6.5-14.4,14.5s6.5,14.5,14.4,14.5s14.4-6.5,14.4-14.5S29,30.4,21.1,30.4z\"/><path class=\"st1\" d=\"M54.2,65V31.2h-6.1v-6.3h6.1V13c0-7.3,5.8-13,13.1-13h8.4l-1.7,6.3h-6.5c-3.5,0-6.7,3.2-6.7,6.8v11.7h12.7 v6.3H60.9V65H54.2z\"/><path class=\"st1\" d=\"M98.8,65c-7.3,0-13.1-5.9-13.1-13.1V31.2h-6.1v-6.3h6.1V0h6.7v24.8H105v6.3H92.3v20.5c0,3.7,3.2,7,6.7,7h6.5 l1.7,6.3H98.8z\"/><path class=\"st1\" d=\"M127.5,65.7c-5.2,0-10-2.2-13.5-6.1c-3.2-3.5-5.1-7.9-5.4-12.6c-0.1-0.6-0.1-1.2-0.1-1.9 c0-1.6,0.2-3.2,0.5-4.7c0.8-3.6,2.5-7,5-9.7c3.5-3.8,8.4-6,13.6-6c5.2,0,10,2.1,13.7,6c2.6,2.9,4.3,6.2,5,9.7 c0.5,3.1,0.5,5,0.5,5.9h-31.8V47c0.9,7.1,6.3,12.5,12.5,12.6c3.8-0.2,7.6-1.7,10.2-4.2l5.6,3.3c-1.5,1.6-3.1,2.9-4.9,4    C135.2,64.5,131.5,65.5,127.5,65.7z M127.5,30.7c-5.2,0-10,3.7-11.9,9.3l-0.1,0.1l-0.4,0.8h24.8l-0.5-0.9 C137.6,34.4,132.8,30.7,127.5,30.7z\"/><path class=\"st1\" d=\"M153.2,65V24.8h6.7v5.1l0.9-1c2.4-2.6,9.3-4.7,14-4.9l-1.6,6.7c-7.3,0.2-13.3,5.9-13.3,12.9V65H153.2z\"/></g><path class=\"st2\" d=\"M376.8,35.7c4-2.3,7.7-4.5,11.7-6.8c-1.3-2.3-1-1.7-2.2-3.9c-1.2-2.3-0.8-3.2,1.8-3.2c7.5-0.1,15-0.1,22.5,0 c2.2,0,2.8,1,1.6,2.9c-3.7,6.5-7.5,13-11.2,19.5c-1.2,2.1-2.3,2.1-3.5,0c-1.3-2.1-1-1.6-2.3-3.9c-3.9,2.3-7.8,4.5-11.7,6.8 c0.2,0.6,0.5,1,0.8,1.4c2.9,5,4.2,7.4,7.2,12.4c3.5,5.9,10.9,6.2,15.2,0.8c0.5-0.6,0.9-1.2,1.3-1.9c7.1-12.3,14.2-24.5,21.2-36.8 c0.7-1.2,1.4-2.6,1.7-4c1.2-5.5-2.9-10.8-8.6-10.8c-15.2-0.1-30.4-0.1-45.5,0c-6.9,0.1-11.1,7-8,13.1c1,2,2.2,3.9,3.3,5.8   C374,30.8,374.5,31.7,376.8,35.7z\"/><path class=\"st3\" d=\"M343.1,73.6c0-4.6,0-13.5,0-13.5s-1.9,0-4.4,0c-2.6,0-3.1-0.9-1.8-3.1c3.7-6.5,7.4-12.9,11.2-19.3   c1.1-1.9,2.1-2.1,3.3,0c3.7,6.5,7.5,12.9,11.1,19.4c1.2,2.1,0.6,3-1.7,3c-2.4,0-4.5,0-4.5,0l0,13.5c0,0,10,0,15.8,0   c6.8-0.1,10.8-6.3,8.2-12.6c-0.3-0.7-0.6-1.4-1-2c-7-12.2-14-24.4-21-36.5c-0.7-1.2-1.6-2.5-2.6-3.4c-4.1-3.8-10.7-2.9-13.6,2   c-7.6,13-15.2,26-22.6,39.1c-3.4,6,0.5,13,7.2,13.4C328.9,73.7,338.3,73.6,343.1,73.6z\"/></g></svg>",
          "terms_url": "https://www.afterpay.com/installment-agreement"
      },
      "product_form_redirect": "none",
      "custom_code_status": false,
      "clear_cart_status": false,
      "clear_cart": {
          "label": "Experiencing cart issues? ",
          "btn_text": "  Click here to clear your cart...",
          "width": "full",
          "padding": "5",
          "margin": "5"
      },
      "cart_empty_status": false,
      "cart_empty": {
          "collections": "test",
          "button_font_weight": "500",
          "button_font_size": "15",
          "button_color": "#D53600",
          "button_font_color": "#D53600",
          "button_high_color": "#D53600"
      },
      "custom_code": "",
      "created_date": "2023-05-15T10:28:24.743Z",
      "__v": 0,
      "trust_badge": {
          "src": "1686054316876.png",
          "padding": "0px 5px 0px 5px",
          "margin": "0",
          "width": "80",
          "position": "center"
      },
      "benefit": {
          "benefits": [
              {
                  "image": "1686051237707.png",
                  "size": 25,
                  "image_padding": "0px 0px 0px 0px",
                  "image_margin": "0px 0px 0px 0px",
                  "text": "Handmade in USA",
                  "background_color": "#802828",
                  "font_color": "#000000",
                  "font_size": "16",
                  "font_weight": "400"
              },
              {
                  "image": "1686051217479.png",
                  "size": 25,
                  "image_padding": "0px 0px 0px 0px",
                  "image_margin": "0px 0px 0px 0px",
                  "text": "Made in IND",
                  "background_color": "#ffffff",
                  "font_color": "#000000",
                  "font_size": "16",
                  "font_weight": "400"
              },
              {
                  "image": "1686051260514.png",
                  "size": 25,
                  "image_padding": "0px 0px 0px 0px",
                  "image_margin": "0px 0px 0px 0px",
                  "text": "Made in USA 3",
                  "background_color": "#aa4646",
                  "font_color": "#000000",
                  "font_size": "16",
                  "font_weight": "400"
              },
              {
                  "image": "1686227860284.png",
                  "size": 25,
                  "image_padding": "0px 0px 0px 0px",
                  "image_margin": "0px 0px 0px 0px",
                  "text": "Made in USA 4",
                  "background_color": "#ffffff",
                  "font_color": "#000000",
                  "font_size": "16",
                  "font_weight": "400"
              }
          ],
          "layout": "stacked",
          "background_color": "#dedede",
          "section_padding": "10px 10px 10px 10px"
      },
      "testimonial": {
          "position": "bottom",
          "testimonials": [
              {
                  "image": "1686054159898.jpg",
                  "size": 70,
                  "image_padding": "0px 0px 0px 0px",
                  "image_margin": "0px",
                  "name": "John H.",
                  "review": "\"Love at first sight. I was honestly surprised by the quality of not only the tumbler but the finish as well. ordered two dozen. and immediately re-ordered upon arrival.\"",
                  "start": true,
                  "order_date": "2023-06-05",
                  "background_color": "#ffffff",
                  "font_color": "#70db86",
                  "font_size": "12",
                  "font_weight": "700",
                  "star": true
              },
              {
                  "image": "1686302678790.jpg",
                  "size": 80,
                  "image_padding": "0px 0px 0px 0px",
                  "image_margin": "0px",
                  "name": "Thomas J.",
                  "review": "\"Love at first sight. I was honestly surprised by the quality of not only the tumbler but the finish as well. ordered two dozen. and immediately re-ordered upon arrival.\"",
                  "start": true,
                  "order_date": "2023-05-05",
                  "background_color": "#ffffff",
                  "font_color": "#000000",
                  "font_size": "12",
                  "font_weight": "700",
                  "star": true
              },
              {
                  "image": "",
                  "size": "100",
                  "image_padding": "",
                  "image_margin": "",
                  "name": "Barb",
                  "review": "This is my great testimonial",
                  "start": true,
                  "order_date": "",
                  "background_color": "#ffffff",
                  "font_color": "#000000",
                  "font_size": "12",
                  "font_weight": "700",
                  "star": true
              },
              {
                  "image": "",
                  "size": 18,
                  "image_padding": "10px 10px 10px 10px",
                  "image_margin": "10px 10px 10px 10px",
                  "name": "test",
                  "review": "testtest test testtest test test test",
                  "start": true,
                  "order_date": "2023-06-10",
                  "background_color": "#ffffff",
                  "font_color": "#161313",
                  "font_size": "12",
                  "font_weight": "700",
                  "star": true
              }
          ],
          "background_color": "#ffffff",
          "section_padding": "10px 15px 10px 15px",
          "review_font_weight": "400",
          "customer_font_size": "14px",
          "review_font_size": "14px",
          "review_font_style": "normal",
          "customer_font_weight": "900",
          "order_font_size": "12px",
          "order_font_style": "italic",
          "review_font_color": "#5c5c5c",
          "customer_font_color": "#000000",
          "order_font_color": "#000000",
          "order_font_weight": "400",
          "customer_font_style": "normal",
          "image_padding": "0px 0px",
          "image_margin": "0px 0px",
          "image_size": 80
      },
      "announcement_settings": {
          "speed": 9000,
          "padding": "5px 10px",
          "margin": "5px"
      }
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

storeController.widgetSavemeta = async function(session, appId, data){
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
            "key": "widget",
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