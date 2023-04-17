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
    Loading
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
import { useState, useCallback, useEffect, useMemo } from 'react';


function Cart() { 
    const [setings, setSettings] = useState({
        "live_mode": false,
        "announcement_bar": false,
        "announcement_position":"topflyout",
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
            "button_color":{
                hue: 120,
                brightness: 1,
                saturation: 1,
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
            "position":"above_subtotal"
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
            "custom_checkout_url": "",
            "checking_out_color":{
                hue: 25,
                brightness: 1,
                saturation: 1,
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
            "provider": "AfterPay",
            "terms_url": "https://www.afterpay.com/installment-agreement"
        },
        "product_form_redirect": "none",
        "custom_code_status": false,
        "custom_code": ""
    });

    const [active, setActive] = useState(false);
    const [pageload, setPageload] = useState(true);

    // const handleToggle = useCallback(() => setActive((active) => !active), []);

    const [contentRef, setContentRef] = useState(null)
    
    const previewiframe = (<iframe
        id='previewiframe'
        ref={setContentRef}
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
       
        ///setProfile({name: profile.name, detail: profile.shop, initials: profile.name.charAt(0).toUpperCase(), isloading: false});
    }

    useEffect(() => {
        loadCart()
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
        
    }

    const handleTierToggle = (indx) => (e) => {
        setings['tiered_progress_bar_tabs'][selected]['tier'][indx]['open'] = !setings['tiered_progress_bar_tabs'][selected]['tier'][indx]['open'];
        setSettings(setings => ({
            ...setings,
            ['tiered_progress_bar_tabs']: setings['tiered_progress_bar_tabs'],
        }));
    }

    const deselectedOptions = useMemo(
        () => [
            { value: 'rustic', label: 'Rustic' },
            { value: 'antique', label: 'Antique' },
            { value: 'vinyl', label: 'Vinyl' },
            { value: 'vintage', label: 'Vintage' },
            { value: 'refurbished', label: 'Refurbished' },
        ],
        [],
    );
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);
    const [loading, setLoading] = useState(false);

    const updateText = useCallback(
        (value) => {
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
        (selected) => {
            const selectedText = selected.map((selectedItem) => {
                const matchedOption = options.find((option) => {
                    return option.value.match(selectedItem);
                });
                return matchedOption && matchedOption.label;
            });
            setSelectedOptions(selected);
            setInputValue(selectedText[0]);
        },
        [options],
    );
    function AutocompleteExample(index) {
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
            <div >
                <Autocomplete
                    options={options}
                    selected={selectedOptions}
                    onSelect={updateSelection}
                    loading={loading}
                    textField={textField}
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
                                            onChange={handleTierRadioChange(idx, "type", "free_shipping")}
                                        />
                                    
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
               
                <Select
                        label="Position"
                        options={[
                            { label: 'Top of flyout', value: 'topflyout' },
                            { label: 'Bottom of lineitems', value: 'bottomflyout' },
                        ]}
                        onChange={handleField("announcement_position")}
                        value={setings.announcement_position}
                    />

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
                        onChange={handleField("shopping_btn")}
                        autoComplete="off"
                        value={setings.shopping_btn}
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
                        onChange={handleField("note_label")}
                        autoComplete="off"
                        value={setings.note_label}
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
                    <TextField
                        label="Provider"
                        onChange={handlePaymentFields("provider")}
                        autoComplete="off"
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
        <Layout.Section secondary>
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
