import React from 'react';
import {
    Page,
    Layout,
    Card,
    SettingToggle,
    Select,
    Stack,
    Icon,
    Button,
    TextField,
    FormLayout,
    Tabs,
    Tag,
    Tooltip,
    RadioButton,
    ResourceList,
    ResourceItem,
    PageActions,
    Checkbox,
    Collapsible,
    Autocomplete,
    Toast,
    ColorPicker,
    SkeletonBodyText,
    DisplayText,
    Loading,
    RangeSlider
} from '@shopify/polaris';
import {
    CirclePlusMinor,
    ChevronDownMinor,
    ChevronUpMinor,
    SearchMinor,
    DeleteMinor
} from '@shopify/polaris-icons';
import Cookies from 'js-cookie';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { TrustPayment, Benefits, Testimonials, CartItem } from '../../components';
import { useState, useCallback, useEffect, useMemo } from 'react';
import '../../assets/cart.css';

function Cart() { 
    const [setings, setSettings] = useState({
        "live_mode": false,
        "announcement_bar": false,
        "announcement_position":"topflyout",
        "announcement_bar_items": [],
        "announcement_settings": {
            "speed": "3000",
            "padding": "",
            "margin": ""
        },
        "tiered_progress_bar": false,
        "general_settings_status":false,
        "progress_bar_color":{
            hue: 120,
            brightness: 1,
            saturation: 1,
            alpha: 0.7,
        },
        "general_settings":{
            "font_family":"Roboto",
            "border_radius":"10",
            "header_padding":"15",
            "header_background":{
                hue: 120,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
            "main_background":{
                hue: 120,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
            "footer_padding":"15",
            "footer_background":{
                hue: 120,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
            subtotal_color: "#000000",
            subtotal_font: 'Roboto',
            price_color: '#d53600',
            compare_price_color: '#9a9a9a',
            price_font: 'Roboto',
            cartitem: {
                background_color: '#ffffff',
                product_img_size: '100%',
                product_img_padding: '',
                title_size: '100%',
                title_color: '#000000',
                title_weight: '600',
                variant_size: '100%',
                variant_color: '#000000',
                variant_weight:  '500',
                price_size: '100%',
                price_color: '#000000',
                price_weight: '600',
                discount_size: '100%',
                discount_color: '#cccccc',
                discount_weight: '400'
            }
        },
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
            "button_color":{
                hue: 120,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
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
            "discount_invalid_message": "Invalid Discount Code",
            "position":"above_subtotal",
            "layout":"square",
            "button_font_weight":"500",
            "button_font_size":"15",
            "label_font_weight":"500",
            "label_font_size":"15",
            "button_color":{
                hue: 120,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
            "button_font_color":{
                hue: 120,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
            "label_color":{
                hue: 120,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
            "label_font_color":{
                hue: 120,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
        },
        "shopping_btn_status":false,
        "continue_shopping": {
            "shopping_btn":"Continue shopping",
            "redirect_option":"redirecturi",
            "Position":"fly_top",
            "redirect_url":"/collections/all",
            "font_size":"20",
            "font_weight":"500",
            "font_color":{
                hue: 25,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
           
        },
        "note_status": false,
        "note_input":{
            "note_label": "Add a note (optional)",
            "position":"above_subtotal",
            "padding":"20",
            "inputsize":"40",
            "font_size":"15",
            "font_weight":"500",
            "font_color":{
                hue: 25,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
            "color":{
                hue: 25,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            }
        },
        "checkout_btn_status": false,
        "checkout_btn_settings":{
            "checkout_label": "<i class=\"rebuy-button-icon prefix fas fa-lock\"></i> Checkout <i class=\"\"></i>",
            "checking_out_label": "<i class=\"rebuy-button-icon prefix fas fa-circle-notch fa-spin\"></i> Checking Out...",
            "checkout_routing": "automatic",
            "custom_checkout_url": "",
            "checking_out_color":{
                hue: 25,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            }
        },
        "cart_btn_status": true,
        "cart_btn_settings":{
            "view_cart_label": "View Cart",
            "view_cart_working_label": "<i class=\"rebuy-button-icon prefix fas fa-circle-notch fa-spin\"></i> Redirecting to Cart..."
        },
        "payment_installments_status": false,
        "payment_installments_settings":{
            "payment_count": 4,
            "provider": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="aftersvg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 431 89.5" style="enable-background:new 0 0 431 89.5;" xml:space="preserve"><style type="text/css">.st0{fill:none;enable-background:new ;}.st1{fill:#373737;}.st2{fill:#2A78AC;}.st3{fill:#124678;}.aftersvg{width:50px;}</style><path class="st0" d="z"/><g><g><path class="st1" d="M217,29.7c4,4.1,6.3,9.5,6.3,15.2S221.1,56,217,60.1c-4,4-9.4,6.2-15.2,6.2c-3.8,0-7.2-1.3-10.2-4l-0.5-0.4    V86l-10.9,3.4V24.3h10.9v3.2l0.5-0.5c3.2-3.1,6.9-3.6,10.2-3.6C207.5,23.5,212.9,25.7,217,29.7z M212.4,44.9 c0-5.9-4.9-10.9-10.6-10.9s-10.6,5-10.6,10.9c0,5.8,4.9,10.9,10.6,10.9S212.4,50.8,212.4,44.9z"/><path class="st1" d="M233.5,60.1c-4-4.1-6.3-9.5-6.3-15.2s2.2-11.1,6.3-15.2c4-4,9.4-6.2,15.2-6.2c3.8,0,7.2,1.3,10.2,4l0.5,0.4 v-3.6h10.9v41.2h-10.9v-3.2l-0.5,0.5c-3.2,3.1-6.9,3.6-10.2,3.6C243,66.3,237.6,64.2,233.5,60.1z M238.1,44.9 c0,5.9,4.9,10.9,10.6,10.9c5.8,0,10.6-5,10.6-10.9c0-5.8-4.9-10.9-10.6-10.9C242.9,34,238.1,39.1,238.1,44.9z"/><path class="st1" d="M233.5,60.1c-4-4.1-6.3-9.5-6.3-15.2s2.2-11.1,6.3-15.2c4-4,9.4-6.2,15.2-6.2c3.8,0,7.2,1.3,10.2,4l0.5,0.4 v-3.6h10.9v41.2h-10.9v-3.2l-0.5,0.5c-3.2,3.1-6.9,3.6-10.2,3.6C243,66.3,237.6,64.2,233.5,60.1z M238.1,44.9 c0,5.9,4.9,10.9,10.6,10.9c5.8,0,10.6-5,10.6-10.9c0-5.8-4.9-10.9-10.6-10.9C242.9,34,238.1,39.1,238.1,44.9z"/><path class="st1" d="M281.1,89.5l9.8-23.8l-16.5-41.3h12.1L296.8,50l10.4-25.6h12l-26.3,65.2H281.1z"/><path class="st1" d="M281.1,89.5l9.8-23.8l-16.5-41.3h12.1L296.8,50l10.4-25.6h12l-26.3,65.2H281.1z"/><path class="st1" d="M21.1,65.9c-5.6,0-10.9-2.2-14.9-6.1c-4-4-6.1-9.3-6.1-14.9S2.2,34,6.1,30c4-3.9,9.3-6,14.9-6 c5.7,0,10.5,3,13.5,5.5l0.9,0.7v-5.4h6.7V65h-6.7v-5.4l-0.9,0.7C31.6,62.9,26.8,65.9,21.1,65.9z M21.1,30.4 c-7.9,0-14.4,6.5-14.4,14.5s6.5,14.5,14.4,14.5s14.4-6.5,14.4-14.5S29,30.4,21.1,30.4z"/><path class="st1" d="M54.2,65V31.2h-6.1v-6.3h6.1V13c0-7.3,5.8-13,13.1-13h8.4l-1.7,6.3h-6.5c-3.5,0-6.7,3.2-6.7,6.8v11.7h12.7 v6.3H60.9V65H54.2z"/><path class="st1" d="M98.8,65c-7.3,0-13.1-5.9-13.1-13.1V31.2h-6.1v-6.3h6.1V0h6.7v24.8H105v6.3H92.3v20.5c0,3.7,3.2,7,6.7,7h6.5 l1.7,6.3H98.8z"/><path class="st1" d="M127.5,65.7c-5.2,0-10-2.2-13.5-6.1c-3.2-3.5-5.1-7.9-5.4-12.6c-0.1-0.6-0.1-1.2-0.1-1.9 c0-1.6,0.2-3.2,0.5-4.7c0.8-3.6,2.5-7,5-9.7c3.5-3.8,8.4-6,13.6-6c5.2,0,10,2.1,13.7,6c2.6,2.9,4.3,6.2,5,9.7 c0.5,3.1,0.5,5,0.5,5.9h-31.8V47c0.9,7.1,6.3,12.5,12.5,12.6c3.8-0.2,7.6-1.7,10.2-4.2l5.6,3.3c-1.5,1.6-3.1,2.9-4.9,4    C135.2,64.5,131.5,65.5,127.5,65.7z M127.5,30.7c-5.2,0-10,3.7-11.9,9.3l-0.1,0.1l-0.4,0.8h24.8l-0.5-0.9 C137.6,34.4,132.8,30.7,127.5,30.7z"/><path class="st1" d="M153.2,65V24.8h6.7v5.1l0.9-1c2.4-2.6,9.3-4.7,14-4.9l-1.6,6.7c-7.3,0.2-13.3,5.9-13.3,12.9V65H153.2z"/></g><path class="st2" d="M376.8,35.7c4-2.3,7.7-4.5,11.7-6.8c-1.3-2.3-1-1.7-2.2-3.9c-1.2-2.3-0.8-3.2,1.8-3.2c7.5-0.1,15-0.1,22.5,0 c2.2,0,2.8,1,1.6,2.9c-3.7,6.5-7.5,13-11.2,19.5c-1.2,2.1-2.3,2.1-3.5,0c-1.3-2.1-1-1.6-2.3-3.9c-3.9,2.3-7.8,4.5-11.7,6.8 c0.2,0.6,0.5,1,0.8,1.4c2.9,5,4.2,7.4,7.2,12.4c3.5,5.9,10.9,6.2,15.2,0.8c0.5-0.6,0.9-1.2,1.3-1.9c7.1-12.3,14.2-24.5,21.2-36.8 c0.7-1.2,1.4-2.6,1.7-4c1.2-5.5-2.9-10.8-8.6-10.8c-15.2-0.1-30.4-0.1-45.5,0c-6.9,0.1-11.1,7-8,13.1c1,2,2.2,3.9,3.3,5.8   C374,30.8,374.5,31.7,376.8,35.7z"/><path class="st3" d="M343.1,73.6c0-4.6,0-13.5,0-13.5s-1.9,0-4.4,0c-2.6,0-3.1-0.9-1.8-3.1c3.7-6.5,7.4-12.9,11.2-19.3   c1.1-1.9,2.1-2.1,3.3,0c3.7,6.5,7.5,12.9,11.1,19.4c1.2,2.1,0.6,3-1.7,3c-2.4,0-4.5,0-4.5,0l0,13.5c0,0,10,0,15.8,0   c6.8-0.1,10.8-6.3,8.2-12.6c-0.3-0.7-0.6-1.4-1-2c-7-12.2-14-24.4-21-36.5c-0.7-1.2-1.6-2.5-2.6-3.4c-4.1-3.8-10.7-2.9-13.6,2   c-7.6,13-15.2,26-22.6,39.1c-3.4,6,0.5,13,7.2,13.4C328.9,73.7,338.3,73.6,343.1,73.6z"/></g></svg>',
            "terms_url": "https://www.afterpay.com/installment-agreement"
        },
        "product_form_redirect": "none",
        "clear_cart_status": false,
        "clear_cart":{
            "label":"Experiencing cart issues?",
            "btn_text":"Click here to clean your cart...",
        },
        "cart_empty_status": false,
        "cart_empty":{
            "collections":"test",
            "button_font_weight":"500",
            "button_font_size":"15",
            "button_color":{
                hue: 25,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
            "button_font_color":{
                hue: 25,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            },
            "button_high_color":{
                hue: 25,
                brightness: 1,
                saturation: 1,
                alpha: 0.7,
            }
        },
        "custom_code_status": false,
        "custom_code": "",
        "trust_badge" : {
            src: "",
            padding: "",
            margin: "",
            width: ""
        },
        "benefit": {
            "layout" : "stacked",
            "background_color": "#ffffff",
            "section_padding": '10px 10px 10px 10px',
            "benefits": []
        },
        "testimonial": {
            position: "bottom",
            background_color: "#ffffff",
            section_padding: "10px 10px 10px 10px",
            testimonials:[]
        }
    });

    const [active, setActive] = useState(false);
    const [pageload, setPageload] = useState(true);

    // const handleToggle = useCallback(() => setActive((active) => !active), []);

    const [contentRef, setContentRef] = useState(null)

    const handleIframeLoad = () => {
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const previewiframe = (<iframe
        id='previewiframe'
        ref={setContentRef}
        onLoad={handleIframeLoad}
        style={{width:"100%", border:"unset", height: "45em"}}
        src='/api/widget/preview'></iframe>);

    const handleToggle = (field) => (e) => {
        if(field == 'cart_btn_status'){
            if(!setings[field] ==false){
                setings["checkout_btn_status"] = true;
            }
        }
        if(field == 'checkout_btn_status'){
            if(!setings[field] ==false){
                setings["cart_btn_status"] = true;
            }
        }
        setSettings(setings => ({
            ...setings,
            [field]: !setings[field],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    };
    
    const handleField = (field) => (e) => {
        setSettings(setings => ({
            ...setings,
            [field]: e,
        }));
       
        contentRef.contentWindow.postMessage(setings, "*");
    };


    const [loader, setLoader] = useState(false);
    const [toastloader, setToastloader] = useState(false);

    const saveCart = async function(){
        console.log(setings);
        setLoader(true);
        var auth = Cookies.get('auth');
        await fetch("/api/cart", {
            method: 'post',
            body: JSON.stringify(setings),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+auth 
            }
        }).then(()=>setLoader(false),setToastloader((toastloader) => !toastloader), []).catch(()=>setLoader(false));
    }
   
    const [prodata , setPro] = useState([])
    const [collect , setCol] = useState({
        
    })
    const loadCart = async function(){
        var auth = Cookies.get('auth');
        var response = await fetch("/api/cart", { 
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+auth 
          }
        });
        var cartObj = await response.json();
        console.log(cartObj)
        setSettings(cartObj);
        setPageload(false);

        var obj = [];
        var obj2 = [];
        fetch('/api/getallpro/'+cartObj.store+'')
        .then(function (response) {
            return response.json();
        })
        .then(function (payload) {
            var allpro = payload.products;
            allpro.map(
                (item) =>
                    ( 
                        obj.push({value:item.id,label:item.title})
                    ));
        })
        setPro(obj); 
        console.log(prodata);
          //setTimeout(function() { contentRef.contentWindow.postMessage(setings, "*"); }, 5000);
          //setProfile({name: profile.name, detail: profile.shop, initials: profile.name.charAt(0).toUpperCase(), isloading: false});
        
            fetch('/api/getcollection/'+cartObj.store+'')
            .then(function (response) {
                return response.json();
            })
            .then(function (payload) {
                var allpro = payload.custom_collections;
                allpro.map(
                    (item) =>
                        ( 
                            obj2.push({value:item.handle,label:item.title})
                        ));
                setCol(obj2);
                
            })
       
    }
   
  
    useEffect(() => {
        loadCart();
       
    }, []);

    const addMessageAction = () => {
        setings['announcement_bar_items'].push('');
        setSettings(setings => ({
            ...setings,
            ['announcement_bar_items']: setings['announcement_bar_items'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    };

    const editMessageAction = (index) => (e) => {
        setings['announcement_bar_items'][index] = e;
        setSettings(setings => ({
            ...setings,
            ['announcement_bar_items']: setings['announcement_bar_items'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const deleteMessageAction = (index) => (e) => {
        console.log(index);
        setings['announcement_bar_items'].splice(index, 1);
        setSettings(setings => ({
            ...setings,
            ['announcement_bar_items']: setings['announcement_bar_items'],
        }));
    }

    const announcementItemsMarkup = (setings['announcement_bar_items'].length ? setings['announcement_bar_items'].map((item, index) => (
        <Card.Section key={index}>
            <FormLayout>
                <FormLayout.Group>
                    <TextField
                        type="text"
                        value={item}
                        onChange={editMessageAction(index)}
                        autoComplete="off"
                    />
                    <Button icon={DeleteMinor} onClick={deleteMessageAction(index)}></Button>
                </FormLayout.Group>
               
            </FormLayout>
           
        </Card.Section>
        
    )) : <p>&nbsp;</p>);

    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
        
    );

    const addTierTab = () => {
        if (setings['tiered_progress_bar_tabs'].length < 3) {
            setings['tiered_progress_bar_tabs'].push({
                id: 'tire-' + setings['tiered_progress_bar_tabs'].length,
                content: 'Add New Bar',
                country:'IN',
                panelID: 'tire-content-' + setings['tiered_progress_bar_tabs'].length,
                layout_type: 'in_line',
                tier: []
            });
        }
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
       
    };

    const TireDeleteTab = () => {
        setings['tiered_progress_bar_tabs'].splice(selected, 1);
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
        setSelected(0);
    };

    const tabFields = (index) => (e) => {
        setings['tiered_progress_bar_tabs'][selected][index] = e;
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }


    const handleRadioChange = (index) => (e, value) => {
        setings['tiered_progress_bar_tabs'][selected][index] = value;
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }


    const handleTierRadioChange = (index, key, v) => (e, value) => {
        console.log(index, key, v, e, value);
        setings['tiered_progress_bar_tabs'][selected]['tier'][index][key] = v;
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const handleTierMinPrice = (index) => (e) => {
        console.log(index, e);
        setings['tiered_progress_bar_tabs'][selected]['tier'][index]["min_price"] = e;
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const handleTierToggle = (indx) => (e) => {
        setings['tiered_progress_bar_tabs'][selected]['tier'][indx]['open'] = !setings['tiered_progress_bar_tabs'][selected]['tier'][indx]['open'];
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const deselectedOptions = useMemo(
        
        () => prodata
      
    );
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);
    const [loading, setLoading] = useState(false);

    const updateText = useCallback(
      
        (value) =>  {
           
            setInputValue(value);
           
            if (!loading) {
                setLoading(true);
            }

            setTimeout(() => {
                if (value === '') {
                    setOptions(deselectedOptions);
                    setLoading(false);
                    return;
                }
                const filterRegex = new RegExp(value, 'i');
                const resultOptions = deselectedOptions.filter((option) =>
                    option.label.match(filterRegex),
                );
                setOptions(resultOptions);
                setLoading(false);
            }, 300);
        },
        [deselectedOptions, loading],
        
    );

    const updateSelection = useCallback(
        (index, pId) => {
            console.log("selected ", index, pId);
            const selectedValue = pId.map((selectedItem) => {
                const matchedOption = options.find((option) => option.value == selectedItem);
                return matchedOption && matchedOption.label;
            });
            setings['tiered_progress_bar_tabs'][selected]['tier'][index]["product_id"] = pId[0];
            setSettings(setings => ({
                ...setings,
                ['tiered_progress_bar_tabs'] : setings['tiered_progress_bar_tabs'],
            }));
            setSelectedOptions(pId);
            console.log(setings);
            setInputValue(selectedValue[0] || '');
        },
        [options],
    );

    const findValue = useCallback(
        (pId) => {console.log(options.length)
            if(pId == null){ return "";}
            if(options != 0){ 
                return options.find(x => x.value == pId).label;
            }
        },
        [options], 
    );

    function AutocompleteExample(index) {
        const textField = (
            <Autocomplete.TextField 
                onChange={updateText}
                label="Choose Product"
                value={findValue(setings['tiered_progress_bar_tabs'][selected]['tier'][index]["product_id"])}
                prefix={<Icon source={SearchMinor} color="base" />}
                placeholder="Search"
            />
        );

        return (
            <div >
                <Autocomplete
                    options={options}
                    selected={selectedOptions}
                    onSelect={(e) => updateSelection(index, e)}
                    loading={loading}
                    textField={textField}
                />
            </div>
        );
    }




    const deselectedOptionsc = useMemo(
        
        () => collect
      
    );
    const [selectedOptionsc, setSelectedOptionsc] = useState([]);
    const [inputValuec, setInputValuec] = useState('');
    const [optionsc, setOptionsc] = useState(deselectedOptionsc);
    const [loadingc, setLoadingc] = useState(false);

    const updateTextc = useCallback(
      
        (value) => {
          
            setInputValuec(value);

            if (!loading) {
                setLoadingc(true);
            }

            setTimeout(() => {
                if (value === '') {
                    setOptionsc(deselectedOptionsc);
                    setLoadingc(false);
                    return;
                }
                const filterRegex = new RegExp(value, 'i');
                const resultOptionsc = deselectedOptionsc.filter((optionc) =>
                    optionc.label.match(filterRegex),
                );
                setOptionsc(resultOptionsc);
                setLoadingc(false);
            }, 300);
        },
        [deselectedOptionsc, loadingc],
        
    );

    const updateSelectionc = useCallback(
        (selected) => {
            const selectedTextc = selected.map((selectedItem) => {
                const matchedOption = optionsc.find((optionc) => {
                    return optionc.value.match(selectedItem);
                });
                return matchedOption && matchedOption.label;
            });
            setSelectedOptionsc(selected);
            console.log(selected);
            setings["cart_empty"]['collections'] = selected;
            setSettings(setings => ({
                ...setings,
                ['cart_empty'] : setings['cart_empty'],
            }));
            console.log(setings);
            setInputValuec(selectedTextc[0]);
        },
        [optionsc],
    );

    function titleCase(string) {
    return string
        .toLowerCase()
        .split(' ')
        .map((word) => word.replace(word[0], word[0].toUpperCase()))
        .join('');
    }

    const removeTag = useCallback(
        (tag) => () => {
          const optionsc = [...selectedOptionsc];
          optionsc.splice(optionsc.indexOf(tag), 1);
          setSelectedOptions(optionsc);
        },
        [selectedOptionsc],
      );

    function AutocompleteExamplec(index) {
        const verticalContentMarkup =
        setings.cart_empty.collections.length > 0 ? (
            <Stack spacing="extraTight" alignment="center">
                {setings.cart_empty.collections.map((coll) => {
                let tagLabel = '';
    
                // tagLabel = option.replace('_', ' ');
                // tagLabel = titleCase(tagLabel);
                return (
                    <Tag key={`option${coll}`} onRemove={removeTag(coll)}>
                    {coll}
                    </Tag>
                );
                })}
            </Stack>
            ) : null;
        const textFieldc = (
            <Autocomplete.TextField
                onChange={updateTextc}
                label="Choose collection"
                value={inputValuec}
                verticalContent={verticalContentMarkup}
                prefix={<Icon source={SearchMinor} color="base" />}
                placeholder="Search"
            />
        );

        return (
            <div >
                <Autocomplete
                    allowMultiple
                    options={optionsc}
                    selected={selectedOptionsc}
                    onSelect={updateSelectionc}
                    loading={loadingc}
                    textField={textFieldc}
                    listTitle="Search collections"
                />
            </div>
        );
    }


    const [selectedTierItems, setSelectedTierItems] = useState([]);

    const deleteSelectedTierItems = () => {
        for (var i = selectedTierItems.length - 1; i >= 0; i--) {
            setings['tiered_progress_bar_tabs'][selected]['tier'].splice(selectedTierItems[i], 1);
        }
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
        setSelectedTierItems([]);
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const tierMarkup = () => {
        const tierItems = setings['tiered_progress_bar_tabs'][selected]['tier'];
        return (
            <ResourceList
                resourceName={{ singular: 'tier', plural: 'Tiers' }}
                items={tierItems}
                selectedItems={selectedTierItems}
                onSelectionChange={setSelectedTierItems}
                selectable
                renderItem={(item, idx) => {
                    const { name, type, min_price, free_shipping_all_products, free_shipping_all_sub_products, presentment_currencies, product_id } = item;
                    return (
                        <ResourceItem
                            id={idx}
                            key={idx}
                            persistActions={true}
                            shortcutActions={[
                                {
                                    accessibilityLabel: `Edit`,
                                    icon: item.open ? ChevronUpMinor : ChevronDownMinor,
                                    onClick: handleTierToggle(idx)
                                }
                            ]}
                            accessibilityLabel={`View details for ${name}`}>
                            <div variant="bodyMd" fontWeight="bold" as="h3">{name}</div>
                            {type ? <div>Type: {type}</div> : ''}
                            <Collapsible
                                open={item.open}
                                id={"basic-collapsible" + idx}
                                transition={{ duration: '200ms', timingFunction: 'ease-in-out' }}
                                expandOnPrint>
                                <p>&nbsp;</p>
                                <hr></hr>
                                <div style={{ marginTop: '15px' }}>
                               
                                    <Stack> 
                                        
                                        <RadioButton
                                            label="Free Shipping"
                                            checked={tierItems[idx].type === 'free_shipping'}
                                            value="free_shipping"
                                            name={"type_" + idx}
                                            disabled={tierItems.find(x => x.type=="free_shipping") != undefined ? true : false}
                                            onChange={handleTierRadioChange(idx, "type", "free_shipping")} />
                                    
                                        <RadioButton
                                            label="Product"
                                            checked={tierItems[idx].type === 'product'}
                                            value="product"
                                            name={"type_" + idx}
                                            onChange={handleTierRadioChange(idx, "type", "product")}
                                        />
                                    </Stack></div>
                                <p>&nbsp;</p>
                                {tierItems[idx].type != null ?
                                    <Stack distribution="equalSpacing">
                                        {tierItems[idx].type === 'free_shipping' ? <Stack
                                            vertical
                                            spacing="extraTight"
                                        >
                                            <Checkbox
                                                label="Free Shipping on All Products"
                                                checked={tierItems[idx].free_shipping_all_products}
                                                onChange={handleTierRadioChange(idx, 'free_shipping_all_products', !tierItems[idx].free_shipping_all_products)}
                                            />
                                            <Checkbox
                                                label="Free Shipping on Subscription Product"
                                                checked={tierItems[idx].free_shipping_all_sub_products}
                                                onChange={handleTierRadioChange(idx, 'free_shipping_all_sub_products', !tierItems[idx].free_shipping_all_sub_products)}
                                            />
                                        </Stack> : AutocompleteExample(idx)}
                                        <TextField
                                            label="Unlock Price"
                                            type="number"
                                            value={item.min_price}
                                            prefix="$"
                                            autoComplete="off"
                                            onChange={handleTierMinPrice(idx)}
                                        />
                                    </Stack> : ''}
                            </Collapsible>
                        </ResourceItem>
                    );
                }}
            />
        )
    }
    
    const addNewTire = () => {
        setings['tiered_progress_bar_tabs'][selected]['tier'].push({
            name: 'Tire',
            type: null,
            min_price: 0,
            free_shipping_all_products: false,
            free_shipping_all_sub_products: false,
            presentment_currencies: false,
            product_id: null,
            open: true
        });
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const tieredProgressBarsMarkup = (setings['tiered_progress_bar_tabs'].length ? <Card secondaryFooterActions={[{ content: 'Delete', destructive: true, onAction: TireDeleteTab }]}>
        <Tabs tabs={setings['tiered_progress_bar_tabs']} selected={selected} onSelect={handleTabChange}>
            <Card.Section title={setings['tiered_progress_bar_tabs'][selected].content}>
                <FormLayout>
                    <TextField label="Title" onChange={tabFields('content')} value={setings['tiered_progress_bar_tabs'][selected]['content']} autoComplete="off" />
                    <TextField label="Country code (First two letters)" onChange={tabFields('country')} value={setings['tiered_progress_bar_tabs'][selected]['country']} autoComplete="off" />
                    <Tag>{setings['tiered_progress_bar_tabs'][selected]['country']}</Tag>
                    <DisplayText  size="small">Progress bar color</DisplayText >
                    <ColorPicker 
                        onChange={handleField("progress_bar_color")} 
                        color={setings.progress_bar_color}
                        allowAlpha 
                        
                    />
                    <Stack >
                    
                        <RadioButton
                            label="In-Line with Shipping Bar"
                            checked={setings['tiered_progress_bar_tabs'][selected]["layout_type"] === 'in_line'}
                            id="in_line"
                            name="layout_type"
                            value='in_line'
                            onChange={handleRadioChange('layout_type')}
                        />
                        <RadioButton
                            label="Below Line Items"
                            id="below_line"
                            name="layout_type"
                            value='below_line'
                            checked={setings['tiered_progress_bar_tabs'][selected]["layout_type"] === 'below_line'}
                            onChange={handleRadioChange('layout_type')}
                        />
                    </Stack>
                    {tierMarkup()}
                    <Stack>
                        <Button icon={CirclePlusMinor} onClick={addNewTire}>Add New Tire</Button>
                        
                        {selectedTierItems.length ? <Button icon={DeleteMinor} destructive onClick={deleteSelectedTierItems}>Delete selected tier</Button> : ''}
                    </Stack>
                </FormLayout>
            </Card.Section>
        </Tabs>
    </Card> : <p>&nbsp;</p>);

    const handleBuyMoreFields = (index) => (e) => {
        setings["buy_more"][index] = e;
        setSettings(setings => ({
            ...setings,
            ['buy_more']: setings['buy_more'],
        }));
       contentRef.contentWindow.postMessage(setings, "*");
    }

    function buyMoreProductMarkup() {
        const textField = (
            <Autocomplete.TextField
                onChange={updateText}
                label="Choose Product"
                value={inputValue}
                prefix={<Icon source={SearchMinor} color="base" />}
                placeholder="Search"
            />
        );

        return (
            <div>
                <Autocomplete
                    options={options}
                    selected={selectedOptions}
                    onSelect={updateSelection}
                    textField={textField}
                />
            </div>
        );
    }

    const addNewDiscountTier = () => {
        var last_discount_tiers = setings.buy_more.discount_tiers[setings.buy_more.discount_tiers.length - 1];
        var quantity = last_discount_tiers.quantity + 1;
        var discount = last_discount_tiers.discount + 5;
        setings.buy_more.discount_tiers.push({
            quantity: quantity,
            discount: discount
        });
        setSettings(setings => ({
            ...setings,
            ['buy_more']: setings['buy_more'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const discountTierfield = (index, field) => (e) => {
        setings.buy_more.discount_tiers[index][field] = parseInt(e);
        setSettings(setings => ({
            ...setings,
            ['buy_more']: setings['buy_more'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const deleteNewDiscountTier = (index) => (e) => {
        console.log(index);
        setings.buy_more.discount_tiers.splice(index, 1);
        setSettings(setings => ({
            ...setings,
            ['buy_more']: setings['buy_more'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }
    
    const discountTiersMarkup = (setings['buy_more']["discount_tiers"].length ? setings['buy_more']["discount_tiers"].map((item, index) => (
        <Stack key={index}>
            <TextField
                type='number'
                label={index == 0 ? "Quantity" : false}
                value={item.quantity}
                onChange={discountTierfield(index, 'quantity')}
                autoComplete="off"
            />
            <TextField
                type='number'
                label={index == 0 ? "Discount" : false}
                value={item.discount}
                autoComplete="off"
                onChange={discountTierfield(index, 'discount')}
                suffix={setings.buy_more.discount_type == "percentage" ? "% off" : "$ off"}
            />
            {index > 0 ? <Button destructive icon={DeleteMinor} onClick={deleteNewDiscountTier(index)} ></Button> : ''}
        </Stack>
    )) : <p>&nbsp;</p>);

    const buyMoreMarkup = (<Card.Section><FormLayout>
        <Select
            label="Display Type"
            options={[
                { label: 'Buttons', value: 'button' },
                { label: 'Dynamic Messaging', value: 'dynamic' },
            ]}
            onChange={handleBuyMoreFields("display_type")}
            value={setings.buy_more.display_type}
        />
        <TextField
            label="Discount Language"
            onChange={handleBuyMoreFields("discount_lang")}
            autoComplete="off"
            value={setings.buy_more.discount_lang}
        />
         <DisplayText  size="small">Button color</DisplayText >
        <ColorPicker 
            label="Button Color"
            onChange={handleBuyMoreFields("button_color")} 
            color={setings.buy_more.button_color}
            allowAlpha 
        />

        <TextField
            label="Discount Success"
            onChange={handleBuyMoreFields("discount_success")}
            autoComplete="off"
            value={setings.buy_more.discount_success}
        />
        <Select
            label="Discount Type"
            options={[
                { label: 'Percentage', value: 'percentage' },
                { label: 'Fixed Amount', value: 'fixed_amount' },
            ]}
            onChange={handleBuyMoreFields("discount_type")}
            value={setings.buy_more.discount_type}
        />
        {buyMoreProductMarkup()}
        {discountTiersMarkup}
        {setings.buy_more.discount_tiers.length < 3 ? <Button icon={CirclePlusMinor} onClick={addNewDiscountTier}>Add New Tier</Button> : ''}
    </FormLayout></Card.Section>);

    const handleLanguageFields = (field) => (e) => {
        setings.language[field] = e;
        setSettings(setings => ({
            ...setings,
            ['language']: setings['language'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }
    const handlenoteInputField = (index) => (e) => {
        setings["note_input"][index] = e;
        setSettings(setings => ({
            ...setings,
            ['note_input']: setings['note_input'],
        }));
    }
    const handleShoppigInput = (index) => (e) => {
        setings["continue_shopping"][index] = e;
        setSettings(setings => ({
            ...setings,
            ['continue_shopping']: setings['continue_shopping'],
        }));
    }
    
    const handleDiscountInputFields = (index) => (e) => {
        setings["discount_input"][index] = e;
        setSettings(setings => ({
            ...setings,
            ['discount_input']: setings['discount_input'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }


    const discountInputMarkup = (<Card.Section><FormLayout>
        <TextField
            label="Discount Code Label"
            onChange={handleDiscountInputFields("discount_code_label")}
            autoComplete="off"
            value={setings.discount_input.discount_code_label}
        />
        <TextField
            label="Discount Label"
            onChange={handleDiscountInputFields("discount_label")}
            autoComplete="off"
            value={setings.discount_input.discount_label}
        />
        <TextField
            label="Discount Button Label"
            onChange={handleDiscountInputFields("discount_button_label")}
            autoComplete="off"
            value={setings.discount_input.discount_button_label}
        />
        <TextField
            label="Discount Invalid Message:"
            onChange={handleDiscountInputFields("discount_invalid_message")}
            autoComplete="off"
            value={setings.discount_input.discount_invalid_message}
        />
        <Select
            label="Position"
            options={[
                { label: 'Below line items', value: 'below_lineitm' },
                { label: 'Above subtotal', value: 'above_subtotal' },
            ]}
            onChange={handleDiscountInputFields("position")}
            value={setings.discount_input.position}
        />
        <Select
            label="layout"
            options={[
                { label: 'Square', value: 'square' },
                { label: 'Rounded', value: 'rounded' },
            ]}
            onChange={handleDiscountInputFields("layout")}
            value={setings.discount_input.layout}
        />
        <TextField
            label="Button font size"
            type="number"
            min={10}
            max={50}
            step={1}
            onChange={handleDiscountInputFields("button_font_size")}
            autoComplete="off"
            value={setings.discount_input.button_font_size}
        />
        <TextField
            label="Button font weight"
            type="number"
            min={100}
            max={900}
            step={100}
            onChange={handleDiscountInputFields("button_font_weight")}
            autoComplete="off"
            value={setings.discount_input.button_font_weight}
        />
        <TextField
            label="label font size"
            type="number"
            min={10}
            max={50}
            step={1}
            onChange={handleDiscountInputFields("label_font_size")}
            autoComplete="off"
            value={setings.discount_input.label_font_size}
        />
        <TextField
            label="label font weight"
            type="number"
            min={100}
            max={900}
            step={100}
            onChange={handleDiscountInputFields("label_font_weight")}
            autoComplete="off"
            value={setings.discount_input.label_font_weight}
        />
        <DisplayText  size="small">Button color</DisplayText >
        <ColorPicker 
            onChange={handleDiscountInputFields("button_color")} 
            color={setings.discount_input.button_color}
            allowAlpha 
        />
        <DisplayText  size="small">Button font color</DisplayText >
        <ColorPicker 
            onChange={handleDiscountInputFields("button_font_color")} 
            color={setings.discount_input.button_font_color}
            allowAlpha 
        />
        <DisplayText  size="small">Label color</DisplayText >
        <ColorPicker 
            onChange={handleDiscountInputFields("label_color")} 
            color={setings.discount_input.label_color}
            allowAlpha 
        />
        <DisplayText  size="small">Label font color</DisplayText >
        <ColorPicker 
            onChange={handleDiscountInputFields("label_font_color")} 
            color={setings.discount_input.label_font_color}
            allowAlpha 
        />
    </FormLayout></Card.Section>);

    const handleCheckoutFields = (field) => (e) => {
        setings["checkout_btn_settings"][field] = e;
        setSettings(setings => ({
            ...setings,
            ['checkout_btn_settings']: setings['checkout_btn_settings'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const handleCartFields = (field) => (e) => {
        setings["cart_btn_settings"][field] = e;
        setSettings(setings => ({
            ...setings,
            ['cart_btn_settings']: setings['cart_btn_settings'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const handlePaymentFields = (field) => (e) => {
        setings["payment_installments_settings"][field] = e;
        setSettings(setings => ({
            ...setings,
            ['payment_installments_settings']: setings['payment_installments_settings'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }
 
    const handleGeneralSetting = (index) => (e) => {
        setings["general_settings"][index] = e;
        setSettings(setings => ({
            ...setings,
            ['general_settings']: setings['general_settings'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const handleClearCart = (index) => (e) => {
        setings["clear_cart"][index] = e;
        setSettings(setings => ({
            ...setings,
            ['clear_cart']: setings['clear_cart'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }
    const handleCartEmpty = (index) => (e) => {
        setings["cart_empty"][index] = e;
        setSettings(setings => ({
            ...setings,
            ['cart_empty']: setings['cart_empty'],
        }));
        contentRef.contentWindow.postMessage(setings, "*");
    }

    const mainPage = (<Layout>
        <Layout.Section>
            {/* <SettingToggle
                action={{
                    content: setings['live_mode'] ? 'Deactivate' : 'Activate',
                    onAction: handleToggle('live_mode'),
                }}
                enabled={active}
            >
                Live Mode is {' '}
                <div variant="bodyMd" fontWeight="bold" as="span">
                    {setings['live_mode'] ? 'activated' : 'deactivated'}
                </div>
                .
            </SettingToggle> */}
            
             <Card>
                <Card.Header
                    actions={[]}
                    title="general Settings">
                    <Stack>
                        <Button
                            primary={!setings['general_settings_status']}
                            onClick={handleToggle('general_settings_status')}>{setings['general_settings_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['general_settings_status'] ? <Card.Section><FormLayout>
                
                    <Select
                        label="Choose font"
                        options={[

                            { label: 'Roboto', value: 'Roboto' },
                            { label: 'Monstrate', value: 'Monstrate' },
                            { label: 'Sofia', value: 'Sofia' },
                            { label: 'Audiowide', value: 'Audiowide' },
                            { label: 'Trirong', value: 'Trirong' },
                            { label: 'serif', value: 'serif' },
                            { label: 'Lora ', value: 'Lora ' },
                            { label: 'Lato', value: 'Lato' },
                            { label: 'Poppins', value: 'Poppins' },
                            { label: 'Lobster', value: 'Lobster' },
                            { label: 'Comfortaa', value: 'Comfortaa' },
                            { label: 'Caveat', value: 'Caveat' },
                        ]}
                        onChange={handleGeneralSetting("font_family")}
                        value={setings.general_settings.font_family}
                    />
                    <TextField
                        label="Slideout Border Radius"
                        type="number"
                        min={0}
                        max={50}
                        step={1}
                        autoComplete="off"
                        onChange={handleGeneralSetting("border_radius")}
                        value={setings.general_settings.border_radius}
                    />
                    <DisplayText size="small">Header</DisplayText>
                    <TextField
                        label="Header padding"
                        type="number"
                        min={0}
                        max={100}
                        step={2}
                        autoComplete="off"
                        onChange={handleGeneralSetting("header_padding")}
                        value={setings.general_settings.header_padding}
                    />
                    <DisplayText  size="small">header background color</DisplayText >
                    <ColorPicker 
                        onChange={handleGeneralSetting("header_background")} 
                        color={setings.general_settings.header_background}
                        allowAlpha 
                    />
                    <DisplayText  size="small">Main content background</DisplayText >
                    <ColorPicker 
                        onChange={handleGeneralSetting("main_background")} 
                        color={setings.general_settings.main_background}
                        allowAlpha 
                    />
                   <DisplayText  size="small">Footer</DisplayText >
                   <TextField
                        label="footer padding"
                        type="number"
                        min={0}
                        max={100}
                        step={2}
                        autoComplete="off"
                        onChange={handleGeneralSetting("footer_padding")}
                        value={setings.general_settings.footer_padding}
                    />
                    <DisplayText  size="small">Footer background color</DisplayText >
                    <ColorPicker 
                        onChange={handleGeneralSetting("footer_background")} 
                        color={setings.general_settings.footer_background}
                        allowAlpha 
                    />
                    <DisplayText  size="small">Footer Content</DisplayText >
                    <Stack>
                        <label>Subtotal Color:</label>
                        <input type='color' value={setings.general_settings.subtotal_color} onChange={(e) => handleGeneralSetting("subtotal_color")(e.target.value)} />
                    </Stack>
                    <Select
                        label="Subtotal font"
                        options={[
                            { label: 'Roboto', value: 'Roboto' },
                            { label: 'Monstrate', value: 'Monstrate' },
                            { label: 'Sofia', value: 'Sofia' },
                            { label: 'Audiowide', value: 'Audiowide' },
                            { label: 'Trirong', value: 'Trirong' },
                            { label: 'serif', value: 'serif' },
                            { label: 'Lora ', value: 'Lora ' },
                            { label: 'Lato', value: 'Lato' },
                            { label: 'Poppins', value: 'Poppins' },
                            { label: 'Lobster', value: 'Lobster' },
                            { label: 'Comfortaa', value: 'Comfortaa' },
                            { label: 'Caveat', value: 'Caveat' },
                        ]}
                        value={setings.general_settings.subtotal_font}
                        onChange={handleGeneralSetting("subtotal_font")}
                    />

                    <Stack>
                        <label>Price Color:</label>
                        <input type='color' value={setings.general_settings.price_color} onChange={(e) => handleGeneralSetting("price_color")(e.target.value)} />
                    </Stack>
                    <Stack>
                        <label>Compare Price Color:</label>
                        <input type='color' value={setings.general_settings.compare_price_color} onChange={(e) => handleGeneralSetting("compare_price_color")(e.target.value)} />
                    </Stack>
                    <Select
                        label="Price font"
                        options={[
                            { label: 'Roboto', value: 'Roboto' },
                            { label: 'Monstrate', value: 'Monstrate' },
                            { label: 'Sofia', value: 'Sofia' },
                            { label: 'Audiowide', value: 'Audiowide' },
                            { label: 'Trirong', value: 'Trirong' },
                            { label: 'serif', value: 'serif' },
                            { label: 'Lora ', value: 'Lora ' },
                            { label: 'Lato', value: 'Lato' },
                            { label: 'Poppins', value: 'Poppins' },
                            { label: 'Lobster', value: 'Lobster' },
                            { label: 'Comfortaa', value: 'Comfortaa' },
                            { label: 'Caveat', value: 'Caveat' },
                        ]}
                        value={setings.general_settings.price_font}
                        onChange={handleGeneralSetting("price_font")}
                    />

                </FormLayout></Card.Section> : <p>&nbsp;</p>}
            </Card>

            <CartItem settings={setings} />
       
            <Card>
                <Card.Header
                    actions={[]}
                    title="Clear Cart">
                    <Stack>
                        <Button
                            primary={!setings['clear_cart_status']}
                            onClick={handleToggle('clear_cart_status')}>{setings['clear_cart_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['clear_cart_status'] ? <Card.Section><FormLayout>
                
                   
                    <TextField
                        label="Label"
                        autoComplete="off"
                        onChange={handleClearCart("label")}
                        value={setings.clear_cart.label}
                    />
                    <TextField
                        label="Button"
                        autoComplete="off"
                        onChange={handleClearCart("btn_text")}
                        value={setings.clear_cart.btn_text}
                    />
                   
                </FormLayout></Card.Section> : <p>&nbsp;</p>}
            </Card>

            <Card>
                <Card.Header
                    actions={[]}
                    title="Cart Empty">
                    <Stack>
                        <Button
                            primary={!setings['cart_empty_status']}
                            onClick={handleToggle('cart_empty_status')}>{setings['cart_empty_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['cart_empty_status'] ? <Card.Section><FormLayout>
                {AutocompleteExamplec()}
                
                    <TextField
                        label="Button Font Size"
                        autoComplete="off"
                        onChange={handleCartEmpty("button_font_size")}
                        value={setings.cart_empty.button_font_size}
                    />
                    <TextField
                        label="Button Font Weight"
                        type="number"
                        min={100}
                        max={900}
                        step={100}
                        autoComplete="off"
                        onChange={handleCartEmpty("button_font_weight")}
                        value={setings.cart_empty.button_font_weight}
                    />
                   <DisplayText  size="small">Botton Font color</DisplayText >
                    <ColorPicker 
                        onChange={handleCartEmpty("button_font_color")} 
                        color={setings.cart_empty.button_font_color}
                        allowAlpha 
                    />
                    <DisplayText  size="small">Button  color</DisplayText >
                    <ColorPicker 
                        onChange={handleCartEmpty("button_color")} 
                        color={setings.cart_empty.button_color}
                        allowAlpha 
                    />
                    <DisplayText  size="small">Button Hover color</DisplayText >
                    <ColorPicker 
                        onChange={handleCartEmpty("button_high_color")} 
                        color={setings.cart_empty.button_high_color}
                        allowAlpha 
                    />
                   
                </FormLayout></Card.Section> : <p>&nbsp;</p>}
            
            </Card>

            <Card
                primaryFooterAction={setings['announcement_bar'] ? { content: 'Add messgae', icon: CirclePlusMinor, onAction: addMessageAction } : false}
            >
                <Card.Header
                    actions={[]}
                    title="Announcement Bar">
                    <Button
                        primary={!setings['announcement_bar']}
                        onClick={handleToggle('announcement_bar')}>{setings['announcement_bar'] ? 'Deactivate' : 'Activate'}</Button>
                        
                </Card.Header>
                <Card.Section>
                <FormLayout>
                    <Select
                        label="Position"
                        options={[
                            { label: 'Top of flyout', value: 'topflyout' },
                            { label: 'Bottom of lineitems', value: 'bottomflyout' },
                        ]}
                        onChange={handleField("announcement_position")}
                        value={setings.announcement_position}
                    />

                    <RangeSlider
                        output
                        label="Speed"
                        min={1000}
                        step={500}
                        max={10000}
                        value={setings.announcement_settings.speed}
                        onChange={(speed) => {
                            setings.announcement_settings.speed = speed;
                            setSettings(setings => ({
                                ...setings
                            }));
                        }}
                        suffix={
                        <p
                            style={{
                            minWidth: '24px',
                            textAlign: 'right',
                            }}
                        >
                            {setings.announcement_settings.speed}ms
                        </p>
                        }
                    />

                    <TextField
                        label="Padding"
                        placeholder='10px 10px 10px 10px'
                        value={setings.announcement_settings.padding}
                        onChange={(pd) => {
                            setings.announcement_settings.padding = pd;
                            setSettings(setings => ({
                                ...setings
                            }));
                        }}  
                    />

                    <TextField
                        label="Margin"
                        placeholder='10px 10px 10px 10px'
                        value={setings.announcement_settings.margin}
                        onChange={(mg) => {
                            setings.announcement_settings.margin = mg;
                            setSettings(setings => ({
                                ...setings
                            }));
                        }}  
                    />
                </FormLayout>
                   </Card.Section>
                {setings['announcement_bar'] ? announcementItemsMarkup : <p>&nbsp;</p>}
            </Card>

            <Card>
                <Card.Header
                    actions={[]}
                    title="Tiered Progress Bars">
                    <Stack>
                        {setings['tiered_progress_bar'] && setings['tiered_progress_bar_tabs'].length < 3 ? <Tooltip content="Add tier" dismissOnMouseOut><Button primary icon={CirclePlusMinor} onClick={addTierTab}></Button></Tooltip> : ''}
                        <Button
                            primary={!setings['tiered_progress_bar']}
                            onClick={handleToggle('tiered_progress_bar')}>{setings['tiered_progress_bar'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['tiered_progress_bar'] ? tieredProgressBarsMarkup : <p>&nbsp;</p>}
            </Card>

            <Card>
                <Card.Header
                    actions={[]}
                    title="Buy More Save More">
                    <Stack>
                        <Button
                            primary={!setings['buy_more_status']}
                            onClick={handleToggle('buy_more_status')}>{setings['buy_more_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['buy_more_status'] ? buyMoreMarkup : <p>&nbsp;</p>}
            </Card>

            <Card title="Language" sectioned>
                <FormLayout>
                    <TextField
                        label="Cart Title"
                        onChange={handleLanguageFields("cart_title")}
                        autoComplete="off"
                        value={setings.language.cart_title}
                    />
                    <TextField
                        label="Empty Cart"
                        onChange={handleLanguageFields("empty_cart")}
                        autoComplete="off"
                        value={setings.language.empty_cart}
                    />
                    <TextField
                        label="Subtotal Text (one item)"
                        onChange={handleLanguageFields("subtotal_text_one_item")}
                        autoComplete="off"
                        value={setings.language.subtotal_text_one_item}
                    />
                    <TextField
                        label="Subtotal Text (many items)"
                        onChange={handleLanguageFields("subtotal_text_many_item")}
                        autoComplete="off"
                        value={setings.language.subtotal_text_many_item}
                    />
                </FormLayout>
            </Card>

            <Card>
                <Card.Header
                    actions={[]}
                    title="Discount Code Input">
                    <Stack>
                        <Button
                            primary={!setings['discount_input_status']}
                            onClick={handleToggle('discount_input_status')}>{setings['discount_input_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['discount_input_status'] ? discountInputMarkup : <p>&nbsp;</p>}
            </Card>

            <Card>
                <Card.Header
                    actions={[]}
                    title="Continue Shopping Button">
                    <Stack>
                        <Button
                            primary={!setings['shopping_btn_status']}
                            onClick={handleToggle('shopping_btn_status')}>{setings['shopping_btn_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['shopping_btn_status'] ? <Card.Section><FormLayout>
                <TextField
                        label="Continue Shopping"
                        autoComplete="off"
                        onChange={handleShoppigInput("shopping_btn")}
                        value={setings.continue_shopping.shopping_btn}
                    />
                    <Select
                        label="Redirect Option"
                        options={[
                            { label: 'Close flyout cart', value: 'close_cart' },
                            { label: 'Redirect to url', value: 'redirecturi' },
                        ]}
                        onChange={handleShoppigInput("redirect_option")}
                        value={setings.continue_shopping.redirect_option}
                    />
                    <TextField
                        label="Redirect URL"
                        autoComplete="off"
                        onChange={handleShoppigInput("redirect_url")}
                        value={setings.continue_shopping.redirect_url}
                    />
                    <Select
                        label="Position"
                        options={[
                            { label: 'Top of flyout', value: 'fly_top' },
                            { label: 'Bottom of flyout', value: 'fly_bottom' },
                        ]}
                        onChange={handleShoppigInput("Position")}
                        value={setings.continue_shopping.Position}
                    />
                     <TextField
                        label="Font Size"
                        autoComplete="off"
                        type="number"
                        min={10}
                        max={50}
                        step={2}
                        onChange={handleShoppigInput("font_size")}
                        value={setings.continue_shopping.font_size}
                    />
                    <TextField
                        label="Font Weight"
                        autoComplete="off"
                        min={100}
                        max={900}
                        step={100}
                        type="number"
                        onChange={handleShoppigInput("font_weight")}
                        value={setings.continue_shopping.font_weight}
                    />
                    <DisplayText  size="small">Font color</DisplayText >
                    <ColorPicker 
                        onChange={handleShoppigInput("font_color")} 
                        color={setings.continue_shopping.font_color}
                        allowAlpha 
                    />
                   
                </FormLayout></Card.Section> : <p>&nbsp;</p>}
            </Card>

            <Card>
                <Card.Header
                    actions={[]}
                    title="Notes">
                    <Stack>
                        <Button
                            primary={!setings['note_status']}
                            onClick={handleToggle('note_status')}>{setings['note_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['note_status'] ? <Card.Section><FormLayout>
                <TextField
                        label="Note Label"
                        autoComplete="off"
                        onChange={handlenoteInputField("note_label")}
                        value={setings.note_input.note_label}
                    />
                     <Select
                        label="Position"
                        options={[
                            { label: 'Below line items', value: 'below_lineitm' },
                            { label: 'Above subtotal', value: 'above_subtotal' },
                        ]}
                        onChange={handlenoteInputField("position")}
                        value={setings.note_input.position}
                    />
                     <TextField
                        label="Padding Top and Bottom"
                        type="number"
                        onChange={handlenoteInputField("padding")}
                        value={setings.note_input.padding}
                        autoComplete="off"
                    />
                    <TextField
                        label="Font size"
                        type="number"
                        min={10}
                        max={50}
                        step={1}
                        onChange={handlenoteInputField("font_size")}
                        value={setings.note_input.font_size}
                        autoComplete="off"
                    />
                    <TextField
                        label="Font weight"
                        type="number"
                        min={100}
                        max={900}
                        step={100}
                        onChange={handlenoteInputField("font_weight")}
                        value={setings.note_input.font_weight}
                        autoComplete="off"
                    />
                    <TextField
                        label="Note input size"
                        type="number"
                        min={20}
                        max={900}
                        step={5}
                        onChange={handlenoteInputField("inputsize")}
                        value={setings.note_input.inputsize}
                        autoComplete="off"
                    />
                    <DisplayText  size="small">Font color</DisplayText >
                    <ColorPicker 
                        onChange={handlenoteInputField("font_color")} 
                        color={setings.note_input.font_color}
                        allowAlpha 
                    />
                    <DisplayText  size="small">Color</DisplayText >
                    <ColorPicker 
                        onChange={handlenoteInputField("color")} 
                        color={setings.note_input.color}
                        allowAlpha 
                    />
                </FormLayout></Card.Section> : <p>&nbsp;</p>}
            </Card>

            <Card>
                <Card.Header
                    actions={[]}
                    title="Checkout Button">
                    <Stack>
                        <Button
                            primary={!setings['checkout_btn_status']}
                            onClick={handleToggle('checkout_btn_status')}>{setings['checkout_btn_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['checkout_btn_status'] ? <Card.Section><FormLayout>
                    <TextField
                        label="Checkout Label"
                        onChange={handleCheckoutFields("checkout_label")}
                        autoComplete="off"
                        value={setings.checkout_btn_settings.checkout_label}
                    />
                    <TextField
                        label="Checking Out Label"
                        onChange={handleCheckoutFields("checking_out_label")}
                        autoComplete="off"
                        value={setings.checkout_btn_settings.checking_out_label}
                    />
                    <Select
                        label="Checkout Routing"
                        options={[
                            { label: 'Automatic', value: 'automatic' },
                            { label: 'Shopify Always', value: 'shopify' },
                            { label: 'Recharge Always', value: 'recharge' },
                            { label: 'Custom URL', value: 'custom' },
                        ]}
                        onChange={handleCheckoutFields("checkout_routing")}
                        value={setings.checkout_btn_settings.checkout_routing}
                    />
                    <DisplayText  size="small">Checkout Button color</DisplayText >
                    <ColorPicker 
                        onChange={handleCheckoutFields("checking_out_color")} 
                        color={setings.checkout_btn_settings.checking_out_color}
                        allowAlpha 
                    />
                    {setings.checkout_btn_settings.checkout_routing == "custom" ? <TextField
                        label="Custom Checkout URL"
                        type='url'
                        onChange={handleCheckoutFields("custom_checkout_url")}
                        autoComplete="off"
                        value={setings.checkout_btn_settings.custom_checkout_url}
                    />:""}
                </FormLayout></Card.Section> : <p>&nbsp;</p>}
            </Card>

            <Card>
                <Card.Header
                    actions={[]}
                    title="View Cart Button">
                    <Stack>
                        <Button
                            primary={!setings['cart_btn_status']}
                            onClick={handleToggle('cart_btn_status')}>{setings['cart_btn_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['cart_btn_status'] ? <Card.Section><FormLayout>
                    <TextField
                        label="View Cart Label"
                        onChange={handleCartFields("view_cart_label")}
                        autoComplete="off"
                        value={setings.cart_btn_settings.view_cart_label}
                    />
                    <TextField
                        label="View Cart Working Label"
                        onChange={handleCartFields("view_cart_working_label")}
                        autoComplete="off"
                        value={setings.cart_btn_settings.view_cart_working_label}
                    />
                </FormLayout></Card.Section> : <p>&nbsp;</p>}
            </Card>

            <Card>
                <Card.Header
                    actions={[]}
                    title="Payment Installments">
                    <Stack>
                        <Button
                            primary={!setings['payment_installments_status']}
                            onClick={handleToggle('payment_installments_status')}>{setings['payment_installments_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['payment_installments_status'] ? <Card.Section><FormLayout>
                    <TextField
                        label="Payment Count"
                        type='number'
                        onChange={handlePaymentFields("payment_count")}
                        autoComplete="off"
                        value={setings.payment_installments_settings.payment_count}
                    />
                    <DisplayText  size="small">Provider</DisplayText >
                     <Select
                        options={[
                            { label: 'AfterPay', value: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="aftersvg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 431 89.5" style="enable-background:new 0 0 431 89.5;" xml:space="preserve"><style type="text/css">.st0{fill:none;enable-background:new ;}.st1{fill:#373737;}.st2{fill:#2A78AC;}.st3{fill:#124678;}.aftersvg{width:50px;}</style><path class="st0" d="z"/><g><g><path class="st1" d="M217,29.7c4,4.1,6.3,9.5,6.3,15.2S221.1,56,217,60.1c-4,4-9.4,6.2-15.2,6.2c-3.8,0-7.2-1.3-10.2-4l-0.5-0.4    V86l-10.9,3.4V24.3h10.9v3.2l0.5-0.5c3.2-3.1,6.9-3.6,10.2-3.6C207.5,23.5,212.9,25.7,217,29.7z M212.4,44.9 c0-5.9-4.9-10.9-10.6-10.9s-10.6,5-10.6,10.9c0,5.8,4.9,10.9,10.6,10.9S212.4,50.8,212.4,44.9z"/><path class="st1" d="M233.5,60.1c-4-4.1-6.3-9.5-6.3-15.2s2.2-11.1,6.3-15.2c4-4,9.4-6.2,15.2-6.2c3.8,0,7.2,1.3,10.2,4l0.5,0.4 v-3.6h10.9v41.2h-10.9v-3.2l-0.5,0.5c-3.2,3.1-6.9,3.6-10.2,3.6C243,66.3,237.6,64.2,233.5,60.1z M238.1,44.9 c0,5.9,4.9,10.9,10.6,10.9c5.8,0,10.6-5,10.6-10.9c0-5.8-4.9-10.9-10.6-10.9C242.9,34,238.1,39.1,238.1,44.9z"/><path class="st1" d="M233.5,60.1c-4-4.1-6.3-9.5-6.3-15.2s2.2-11.1,6.3-15.2c4-4,9.4-6.2,15.2-6.2c3.8,0,7.2,1.3,10.2,4l0.5,0.4 v-3.6h10.9v41.2h-10.9v-3.2l-0.5,0.5c-3.2,3.1-6.9,3.6-10.2,3.6C243,66.3,237.6,64.2,233.5,60.1z M238.1,44.9 c0,5.9,4.9,10.9,10.6,10.9c5.8,0,10.6-5,10.6-10.9c0-5.8-4.9-10.9-10.6-10.9C242.9,34,238.1,39.1,238.1,44.9z"/><path class="st1" d="M281.1,89.5l9.8-23.8l-16.5-41.3h12.1L296.8,50l10.4-25.6h12l-26.3,65.2H281.1z"/><path class="st1" d="M281.1,89.5l9.8-23.8l-16.5-41.3h12.1L296.8,50l10.4-25.6h12l-26.3,65.2H281.1z"/><path class="st1" d="M21.1,65.9c-5.6,0-10.9-2.2-14.9-6.1c-4-4-6.1-9.3-6.1-14.9S2.2,34,6.1,30c4-3.9,9.3-6,14.9-6 c5.7,0,10.5,3,13.5,5.5l0.9,0.7v-5.4h6.7V65h-6.7v-5.4l-0.9,0.7C31.6,62.9,26.8,65.9,21.1,65.9z M21.1,30.4 c-7.9,0-14.4,6.5-14.4,14.5s6.5,14.5,14.4,14.5s14.4-6.5,14.4-14.5S29,30.4,21.1,30.4z"/><path class="st1" d="M54.2,65V31.2h-6.1v-6.3h6.1V13c0-7.3,5.8-13,13.1-13h8.4l-1.7,6.3h-6.5c-3.5,0-6.7,3.2-6.7,6.8v11.7h12.7 v6.3H60.9V65H54.2z"/><path class="st1" d="M98.8,65c-7.3,0-13.1-5.9-13.1-13.1V31.2h-6.1v-6.3h6.1V0h6.7v24.8H105v6.3H92.3v20.5c0,3.7,3.2,7,6.7,7h6.5 l1.7,6.3H98.8z"/><path class="st1" d="M127.5,65.7c-5.2,0-10-2.2-13.5-6.1c-3.2-3.5-5.1-7.9-5.4-12.6c-0.1-0.6-0.1-1.2-0.1-1.9 c0-1.6,0.2-3.2,0.5-4.7c0.8-3.6,2.5-7,5-9.7c3.5-3.8,8.4-6,13.6-6c5.2,0,10,2.1,13.7,6c2.6,2.9,4.3,6.2,5,9.7 c0.5,3.1,0.5,5,0.5,5.9h-31.8V47c0.9,7.1,6.3,12.5,12.5,12.6c3.8-0.2,7.6-1.7,10.2-4.2l5.6,3.3c-1.5,1.6-3.1,2.9-4.9,4    C135.2,64.5,131.5,65.5,127.5,65.7z M127.5,30.7c-5.2,0-10,3.7-11.9,9.3l-0.1,0.1l-0.4,0.8h24.8l-0.5-0.9 C137.6,34.4,132.8,30.7,127.5,30.7z"/><path class="st1" d="M153.2,65V24.8h6.7v5.1l0.9-1c2.4-2.6,9.3-4.7,14-4.9l-1.6,6.7c-7.3,0.2-13.3,5.9-13.3,12.9V65H153.2z"/></g><path class="st2" d="M376.8,35.7c4-2.3,7.7-4.5,11.7-6.8c-1.3-2.3-1-1.7-2.2-3.9c-1.2-2.3-0.8-3.2,1.8-3.2c7.5-0.1,15-0.1,22.5,0 c2.2,0,2.8,1,1.6,2.9c-3.7,6.5-7.5,13-11.2,19.5c-1.2,2.1-2.3,2.1-3.5,0c-1.3-2.1-1-1.6-2.3-3.9c-3.9,2.3-7.8,4.5-11.7,6.8 c0.2,0.6,0.5,1,0.8,1.4c2.9,5,4.2,7.4,7.2,12.4c3.5,5.9,10.9,6.2,15.2,0.8c0.5-0.6,0.9-1.2,1.3-1.9c7.1-12.3,14.2-24.5,21.2-36.8 c0.7-1.2,1.4-2.6,1.7-4c1.2-5.5-2.9-10.8-8.6-10.8c-15.2-0.1-30.4-0.1-45.5,0c-6.9,0.1-11.1,7-8,13.1c1,2,2.2,3.9,3.3,5.8   C374,30.8,374.5,31.7,376.8,35.7z"/><path class="st3" d="M343.1,73.6c0-4.6,0-13.5,0-13.5s-1.9,0-4.4,0c-2.6,0-3.1-0.9-1.8-3.1c3.7-6.5,7.4-12.9,11.2-19.3   c1.1-1.9,2.1-2.1,3.3,0c3.7,6.5,7.5,12.9,11.1,19.4c1.2,2.1,0.6,3-1.7,3c-2.4,0-4.5,0-4.5,0l0,13.5c0,0,10,0,15.8,0   c6.8-0.1,10.8-6.3,8.2-12.6c-0.3-0.7-0.6-1.4-1-2c-7-12.2-14-24.4-21-36.5c-0.7-1.2-1.6-2.5-2.6-3.4c-4.1-3.8-10.7-2.9-13.6,2   c-7.6,13-15.2,26-22.6,39.1c-3.4,6,0.5,13,7.2,13.4C328.9,73.7,338.3,73.6,343.1,73.6z"/></g></svg>' },
                            { label: 'Klarna', value: '<svg xmlns="http://www.w3.org/2000/svg" height="23" viewBox="4.413 5.76850966 37.5527723 11.47054642" width="50"><rect fill="#ffb3c7" height="25" rx="4.321" width="45"/><path d="m40.794 14.646a1.07 1.07 0 0 0 -1.066 1.076 1.07 1.07 0 0 0 1.066 1.076c.588 0 1.066-.482 1.066-1.076a1.07 1.07 0 0 0 -1.066-1.076zm-3.508-.831c0-.814-.689-1.473-1.539-1.473s-1.539.66-1.539 1.473.69 1.472 1.54 1.472 1.538-.659 1.538-1.472zm.006-2.863h1.698v5.725h-1.698v-.366a2.96 2.96 0 0 1 -1.684.524c-1.653 0-2.993-1.352-2.993-3.02s1.34-3.02 2.993-3.02c.625 0 1.204.193 1.684.524zm-13.592.746v-.745h-1.739v5.724h1.743v-2.673c0-.902.968-1.386 1.64-1.386h.02v-1.665c-.69 0-1.323.298-1.664.745zm-4.332 2.117c0-.814-.689-1.473-1.539-1.473s-1.539.66-1.539 1.473.69 1.472 1.54 1.472 1.538-.659 1.538-1.472zm.006-2.863h1.699v5.725h-1.699v-.366c-.48.33-1.059.524-1.684.524-1.653 0-2.993-1.352-2.993-3.02s1.34-3.02 2.993-3.02c.625 0 1.204.193 1.684.524zm10.223-.153c-.678 0-1.32.212-1.75.798v-.644h-1.691v5.724h1.712v-3.008c0-.87.578-1.297 1.275-1.297.746 0 1.176.45 1.176 1.285v3.02h1.696v-3.64c0-1.332-1.05-2.238-2.418-2.238zm-17.374 5.878h1.778v-8.275h-1.778zm-7.81.002h1.883v-8.279h-1.882zm6.586-8.279c0 1.792-.692 3.46-1.926 4.699l2.602 3.58h-2.325l-2.827-3.89.73-.552a4.768 4.768 0 0 0 1.902-3.837h1.842z" fill="#0a0b09"/></svg>' },
                            { label: 'ShopPay', value: '<svg xmlns="http://www.w3.org/2000/svg" role="img" width="50" height="30" aria-labelledby="shop-pay-logo" viewBox="0 0 424 102" fill="none"><title id="shop-pay-logo">Shop Pay</title><path fill-rule="evenodd" clip-rule="evenodd" d="M204.916 30.0997C208.894 25.1796 215.067 21.1016 222.436 21.1016C238.98 21.1016 252.012 34.7983 252.001 51.6974C252.001 69.3058 238.903 82.3375 223.189 82.3375C214.834 82.3375 208.44 78.06 206.102 74.4918H205.88V100.356C205.88 100.512 205.818 100.661 205.708 100.771C205.598 100.881 205.449 100.943 205.293 100.943H190.566C190.409 100.943 190.258 100.882 190.146 100.772C190.035 100.662 189.97 100.513 189.967 100.356V21.6779C189.967 21.5192 190.03 21.3669 190.143 21.2547C190.255 21.1425 190.407 21.0795 190.566 21.0795H204.329C204.486 21.0824 204.635 21.1467 204.745 21.2586C204.855 21.3705 204.916 21.5211 204.916 21.6779V30.0997ZM221.179 67.3428C219.958 67.3814 218.73 67.2768 217.521 67.0265C214.479 66.397 211.694 64.8745 209.522 62.6536C207.35 60.4328 205.89 57.6146 205.329 54.5595C205.167 53.6817 205.082 52.7958 205.072 51.9114C205.061 50.9204 205.144 49.926 205.323 48.9415C205.879 45.8886 207.331 43.0704 209.495 40.8465C211.659 38.6226 214.436 37.094 217.473 36.4557C218.689 36.2001 219.924 36.0919 221.153 36.1288C223.15 36.1534 225.123 36.5679 226.962 37.3492C228.825 38.141 230.513 39.2939 231.929 40.7413C233.344 42.1887 234.459 43.902 235.209 45.7824C235.959 47.6628 236.329 49.6731 236.299 51.6974C236.299 51.6977 236.299 51.698 236.299 51.6983C236.331 53.7263 235.962 55.7408 235.214 57.626C234.465 59.5114 233.351 61.2304 231.937 62.6843C230.522 64.1382 228.834 65.2983 226.97 66.098C225.138 66.8837 223.171 67.3063 221.179 67.3428Z" fill="#5A31F4"/><path d="M109.306 32.8701C105.904 25.7337 99.4543 21.1238 89.7359 21.1238C86.753 21.1758 83.8218 21.9123 81.1685 23.2765C78.5151 24.6406 76.2106 26.5959 74.4325 28.9916L74.0779 29.4238V1.45428C74.0779 1.29264 74.0137 1.13763 73.8994 1.02333C73.7851 0.909028 73.6301 0.844803 73.4684 0.844803H59.7275C59.5678 0.847707 59.4156 0.913196 59.3037 1.02718C59.1917 1.14117 59.1291 1.29454 59.1291 1.45428V81.6837C59.1291 81.8424 59.1921 81.9946 59.3044 82.1068C59.4166 82.219 59.5688 82.2821 59.7275 82.2821H74.4436C74.6033 82.2821 74.7567 82.2194 74.8707 82.1075C74.9847 81.9956 75.0502 81.8434 75.0531 81.6837V47.4754C75.0531 40.8265 79.4856 36.1169 86.5777 36.1169C94.3347 36.1169 96.2961 42.4998 96.2961 49.0046V81.6837C96.2961 81.8424 96.3592 81.9946 96.4714 82.1068C96.5836 82.219 96.7358 82.2821 96.8945 82.2821H111.577C111.737 82.2821 111.891 82.2194 112.004 82.1075C112.118 81.9956 112.184 81.8434 112.187 81.6837V47.0543C112.187 45.8686 112.187 44.705 112.032 43.5747C111.78 39.8707 110.856 36.2435 109.306 32.8701V32.8701Z" fill="#5A31F4"/><path d="M35.8249 44.7604C35.8249 44.7604 28.3339 42.9985 25.5746 42.2893C22.8153 41.5801 17.9949 40.073 17.9949 36.4272C17.9949 32.7814 21.8845 31.6179 25.8295 31.6179C29.7745 31.6179 34.1627 32.5709 34.5062 36.948C34.5201 37.1058 34.5927 37.2525 34.7097 37.3593C34.8267 37.466 34.9795 37.5249 35.1379 37.5243L49.6434 37.4689C49.7288 37.4691 49.8133 37.4517 49.8916 37.4178C49.9699 37.3838 50.0404 37.3341 50.0987 37.2717C50.1569 37.2093 50.2017 37.1356 50.2301 37.0551C50.2585 36.9746 50.2701 36.8891 50.264 36.804C49.3664 22.7971 37.0771 17.7883 25.7408 17.7883C12.2991 17.7883 2.46987 26.6534 2.46987 36.4272C2.46987 43.5636 4.48669 50.2568 20.3442 54.911C23.1256 55.7199 26.9044 56.7727 30.2066 57.6924C34.1738 58.8006 36.3125 60.4739 36.3125 63.1112C36.3125 66.1697 31.8799 68.2973 27.5249 68.2973C21.2196 68.2973 16.7427 65.9592 16.377 61.7593C16.358 61.6056 16.2832 61.4642 16.1667 61.362C16.0502 61.2599 15.9003 61.2041 15.7454 61.2052L1.27307 61.2717C1.18823 61.2717 1.10425 61.2887 1.02614 61.3218C0.94802 61.355 0.877379 61.4035 0.818427 61.4645C0.759474 61.5255 0.713411 61.5978 0.683003 61.677C0.652596 61.7562 0.638464 61.8407 0.641441 61.9255C1.30633 75.1456 14.0721 82.271 25.9735 82.271C43.7038 82.271 51.7156 72.2977 51.7156 62.9561C51.7378 58.5679 50.7294 48.5724 35.8249 44.7604Z" fill="#5A31F4"/><path d="M146.384 17.6442C132.654 17.6442 125.806 22.3095 120.31 26.0439L120.143 26.1547C119.86 26.3488 119.66 26.6427 119.584 26.9775C119.508 27.3124 119.562 27.6637 119.733 27.961L125.163 37.3137C125.265 37.4887 125.404 37.6391 125.571 37.754C125.738 37.869 125.928 37.9457 126.127 37.9786C126.323 38.0139 126.523 38.0053 126.715 37.9536C126.907 37.9018 127.084 37.8082 127.235 37.6794L127.668 37.3248C130.493 34.9534 135.026 31.7841 145.996 30.9197C152.102 30.4322 157.377 32.0279 161.266 35.6626C165.544 39.6076 168.104 45.9794 168.104 52.7058C168.104 65.0837 160.812 72.8629 149.099 73.018C139.447 72.9626 132.965 67.9317 132.965 60.496C132.965 56.5511 134.749 53.9802 138.228 51.4093C138.494 51.2193 138.682 50.9395 138.757 50.6217C138.832 50.304 138.79 49.9696 138.638 49.6806L133.762 40.4608C133.672 40.2958 133.551 40.1502 133.404 40.0323C133.258 39.9144 133.089 39.8266 132.909 39.7738C132.725 39.7188 132.531 39.7033 132.34 39.7281C132.149 39.7529 131.965 39.8176 131.801 39.9179C126.327 43.1647 119.611 49.1043 119.977 60.5182C120.42 75.0459 132.499 86.1384 148.201 86.5927H148.988H150.063C168.724 85.9833 182.199 72.1315 182.199 53.3485C182.199 36.1059 169.633 17.6442 146.384 17.6442Z" fill="#5A31F4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M282.375 1.04428H408.027C416.699 1.04428 423.73 8.07446 423.73 16.7466V85.54C423.73 94.2121 416.699 101.242 408.027 101.242H282.375C273.703 101.242 266.673 94.2121 266.673 85.54V16.7466C266.673 8.07446 273.703 1.04428 282.375 1.04428ZM310.566 55.5316C321.049 55.5316 328.551 47.8854 328.551 37.1697C328.551 26.5093 321.049 18.8188 310.566 18.8188H292.06C291.84 18.8188 291.628 18.9064 291.473 19.0623C291.317 19.2181 291.229 19.4295 291.229 19.65V70.4361C291.232 70.6556 291.32 70.8653 291.476 71.0206C291.631 71.1758 291.841 71.2643 292.06 71.2672H299.019C299.24 71.2672 299.451 71.1796 299.607 71.0237C299.763 70.8679 299.85 70.6565 299.85 70.4361V56.3627C299.85 56.1423 299.938 55.9309 300.094 55.775C300.25 55.6191 300.461 55.5316 300.682 55.5316H310.566ZM310.034 26.5315C315.73 26.5315 319.93 31.0306 319.93 37.1697C319.93 43.3198 315.73 47.8078 310.034 47.8078H300.682C300.463 47.8078 300.253 47.7218 300.098 47.5683C299.942 47.4149 299.853 47.2063 299.85 46.9878V27.3626C299.853 27.1431 299.942 26.9334 300.097 26.7781C300.252 26.6229 300.462 26.5344 300.682 26.5315H310.034ZM330.601 61.5266C330.529 59.8838 330.868 58.2489 331.588 56.7704C332.308 55.2919 333.386 54.0167 334.724 53.0604C337.428 51.0325 341.616 49.9798 347.833 49.736L354.426 49.5144V47.564C354.426 43.6745 351.811 42.0233 347.611 42.0233C343.412 42.0233 340.763 43.5082 340.143 45.9351C340.093 46.1065 339.988 46.2564 339.843 46.3609C339.698 46.4653 339.523 46.5183 339.345 46.5113H332.84C332.72 46.5143 332.601 46.491 332.492 46.4431C332.382 46.3952 332.284 46.3238 332.205 46.2341C332.126 46.1443 332.067 46.0383 332.033 45.9235C331.999 45.8086 331.991 45.6878 332.009 45.5694C332.984 39.807 337.749 35.4299 347.911 35.4299C358.704 35.4299 362.593 40.4498 362.593 50.0352V70.4028C362.595 70.5129 362.575 70.6221 362.533 70.7243C362.492 70.8264 362.431 70.9193 362.354 70.9977C362.277 71.076 362.185 71.1382 362.083 71.1807C361.981 71.2232 361.872 71.245 361.762 71.245H355.191C355.081 71.245 354.972 71.2232 354.87 71.1807C354.769 71.1382 354.677 71.076 354.599 70.9977C354.522 70.9193 354.461 70.8264 354.42 70.7243C354.379 70.6221 354.358 70.5129 354.36 70.4028V68.8846C354.371 68.7514 354.339 68.6183 354.268 68.5049C354.197 68.3915 354.092 68.3041 353.967 68.2555C353.842 68.207 353.706 68.1999 353.577 68.2354C353.448 68.2709 353.334 68.347 353.252 68.4525C351.29 70.5912 348.099 72.1426 343.013 72.1426C335.555 72.1647 330.601 68.2641 330.601 61.5266ZM354.426 57.094V55.5205L345.894 55.9637C341.395 56.1964 338.768 58.0692 338.768 61.2163C338.768 64.0643 341.173 65.6489 345.362 65.6489C351.058 65.6489 354.426 62.5682 354.426 57.1051V57.094ZM369.198 80.7196V86.6481C369.188 86.8397 369.242 87.0293 369.353 87.1861C369.463 87.3429 369.623 87.4579 369.807 87.5124C370.966 87.8283 372.164 87.9739 373.365 87.9446C379.736 87.9446 385.554 85.6175 388.879 76.553L403.506 37.5353C403.548 37.4097 403.559 37.276 403.54 37.1451C403.52 37.0142 403.47 36.8897 403.394 36.7817C403.317 36.6738 403.216 36.5854 403.099 36.5238C402.982 36.4622 402.852 36.4291 402.719 36.4272H395.904C395.727 36.4257 395.554 36.4809 395.411 36.5845C395.267 36.6882 395.161 36.8349 395.106 37.0034L387.05 61.7149C386.989 61.8769 386.879 62.0163 386.737 62.1147C386.594 62.2131 386.425 62.2658 386.252 62.2658C386.079 62.2658 385.91 62.2131 385.767 62.1147C385.625 62.0163 385.516 61.8769 385.454 61.7149L376.168 36.9369C376.106 36.7782 375.998 36.6417 375.858 36.5449C375.718 36.4481 375.552 36.3956 375.381 36.394H368.732C368.6 36.3959 368.47 36.429 368.353 36.4906C368.236 36.5522 368.135 36.6406 368.058 36.7485C367.981 36.8564 367.931 36.9809 367.912 37.1119C367.892 37.2428 367.904 37.3765 367.946 37.5021L381.62 72.6301C381.687 72.8126 381.687 73.0129 381.62 73.1953L381.188 74.5583C380.684 76.2492 379.627 77.722 378.186 78.7407C376.746 79.7593 375.005 80.265 373.243 80.1766C372.22 80.1755 371.2 80.079 370.195 79.8885C370.073 79.8656 369.948 79.87 369.828 79.9012C369.708 79.9325 369.596 79.9898 369.501 80.0692C369.406 80.1486 369.329 80.2481 369.277 80.3605C369.224 80.4729 369.197 80.5956 369.198 80.7196Z" fill="#5A31F4"/></svg>' },
                            { label: 'Affirm', value: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="svgaff" version="1.0" id="katman_1" x="0px" y="0px" viewBox="0 0 566 401" style="enable-background:new 0 0 566 401;" xml:space="preserve"><style xmlns="http://www.w3.org/2000/svg" type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#060809;}.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#0FA0EA;}.svgaff{height:30px;width:50px;}</style><g><path class="st0" d="M107.3,211.1c-11.3,0-24.4,5.4-31.5,11l6.5,13.6c5.7-5.2,14.9-9.6,23.2-9.6c7.9,0,12.2,2.6,12.2,7.9   c0,3.6-2.9,5.4-8.3,6.1C89,242.7,73,248.3,73,264c0,12.4,8.9,20,22.7,20c9.9,0,18.7-5.5,22.9-12.7V282H137v-44.9   C137,218.6,124.1,211.1,107.3,211.1z M100.4,269.6c-5.2,0-7.8-2.5-7.8-6.7c0-7.8,8.7-10.4,24.6-12.1   C117.3,261.2,110.2,269.6,100.4,269.6z M310.5,224.7v-11.6h-18.4V282h19.7v-33.2c0-15.8,9.5-20.4,16.2-20.4c2.6,0,6.1,0.8,8.4,2.5   l3.6-18.2c-3-1.3-6.2-1.6-8.8-1.6C321.1,211.1,314.7,215.6,310.5,224.7L310.5,224.7z M431.4,211.1c-10.4,0-18.2,6.2-22.3,12.1   c-3.8-7.7-11.7-12.1-21.3-12.1c-10.4,0-17.6,5.8-21,12.4v-10.4h-19V282h19.7v-35.5c0-12.7,6.7-18.8,12.9-18.8   c5.6,0,10.8,3.6,10.8,13V282H411v-35.5c0-12.9,6.5-18.8,13-18.8c5.2,0,10.7,3.8,10.7,12.9V282h19.7v-47.6   C454.4,218.9,444,211.1,431.4,211.1L431.4,211.1z M206.6,208v5.1h-29.9v-7c0-9.1,5.2-11.7,9.7-11.7c2.6,0,6,0.6,8.8,2.2l6.1-13.9   c-3.6-2.1-9.5-4-17.4-4c-12.6,0-26.9,7.1-26.9,29.4v5.1h-11.4v15.2H157V282h19.7v-53.7h29.9V282h19.7v-53.7h17.9v-15.2h-17.9v-7   c0-9.1,5.2-11.7,9.7-11.7c5,0,8.8,2.2,8.8,2.2l6.1-13.9c0,0-6.2-4-17.4-4C221,178.6,206.6,185.7,206.6,208z M255.9,213.1h19.7V282   h-19.7V213.1z"/><path class="st1" d="M370.7,117c-53.2,0-100.6,36.9-114,84.4H276c11.2-35.4,49.3-66.4,94.7-66.4c55.2,0,102.8,42,102.8,107.4   c0,14.7-1.9,27.9-5.5,39.6h18.7l0.2-0.6c3.1-12.1,4.6-25.2,4.6-39C491.5,169.5,438.4,117,370.7,117"/></g></svg>' },
                        ]}
                        onChange={handlePaymentFields("provider")}
                        value={setings.payment_installments_settings.provider}
                    />
                    <TextField
                        label="Terms URL"
                        onChange={handlePaymentFields("terms_url")}
                        autoComplete="off"
                        value={setings.payment_installments_settings.terms_url}
                    />
                </FormLayout></Card.Section> : <p>&nbsp;</p>}
            </Card>

            <Card title="Product Form Redirect" sectioned>
                <FormLayout>
                    <Select
                        options={[
                            { label: 'Stay on current page', value: 'none' },
                            { label: 'Redirect to Cart', value: 'cart' },
                            { label: 'Redirect to Checkout', value: 'checkout' },
                            { label: 'Disabled', value: 'disabled' },
                        ]}
                        onChange={handleField("product_form_redirect")}
                        value={setings.product_form_redirect}
                    />
                </FormLayout>
            </Card>

            <TrustPayment settings={setings} />
            <Benefits settings={setings}  />
            <Testimonials settings={setings}  />
            <Card>
                <Card.Header
                    actions={[]}
                    title="Custom Code">
                    <Stack>
                        <Button
                            primary={!setings['custom_code_status']}
                            onClick={handleToggle('custom_code_status')}>{setings['custom_code_status'] ? 'Deactivate' : 'Activate'}</Button>
                    </Stack>
                </Card.Header>
                {setings['custom_code_status'] ? <Card.Section><FormLayout>
                    <CodeMirror
                        value={setings.custom_code}
                        height="200px"
                        extensions={[html()]}
                        onChange={handleField("custom_code")}
                    />
                </FormLayout></Card.Section> : <p>&nbsp;</p>}
            </Card>
           
            <PageActions
                primaryAction={{content: 'Save', onAction: saveCart, loading: loader}}
            />

            <p>&nbsp;</p>
        </Layout.Section>
        <Layout.Section secondary style={{position:'sticky', top: '70px'}}>
            <Card title="Live Preview" sectioned>
                {previewiframe}
            </Card>
        </Layout.Section>
        
    </Layout>);

    const toastMarkup = (<Toast content="Setting updated!" duration={2000} onDismiss={setToastloader}/>);

    return (
        <Page fullWidth>
            {pageload ? <Loading /> : '' }
            {pageload ? <div><SkeletonBodyText /> <br></br> <SkeletonBodyText /> <br></br> <SkeletonBodyText /></div> : mainPage}
            {toastloader ? toastMarkup : '' }
        </Page>
    );
}

export default Cart;
