import {Page, Card, ResourceList, ResourceItem, Modal, Button, Stack, TextField, Toast, useIndexResourceState, Badge, Layout, FormLayout, Select, Label, Checkbox, RangeSlider, PageActions, Loading} from '@shopify/polaris';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {
    ChevronDownMinor,
    ChevronUpMinor
  } from '@shopify/polaris-icons';
  import { useParams, useNavigate } from "react-router-dom"

export default function editWidget() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [widget, setWidget] = useState({
        name: "Cross-sell",
        product_type: "both",
        redirects:{
            learn_more: "product",
            add_to_cart: "none",
            modal_redirect: "none"
        },
        language:{
            super_title: 'Crowd Pleaser!',
            title: "Our customer's favorites",
            description: "",
            variant_option: "{{option_name}}",
            variant_options: "Options",
            add_to_cart: "Add to Cart",
            adding_to_cart: "Adding...",
            added_to_cart: "Added!",
            decline_offer: "No Thanks",
            checkout_label: "Continue to Checkout",
            continue: "Continue",
            sold_out: "Sold Out"
        },
        timer:{
            status: false,
            title:  "Hurry -- your special offer ends in:",
            minutes: 2,
            seconds:30,
            action:"dismiss"
        },
        layout:{
            variant_selector_type: 'select',
            show_continue_button: false,
            large_screens:{
                display_style: "grid",
                display_as_carousel: false,
                grid_columns:3
            },
            medium_screens:{
                display_style: "grid",
                display_as_carousel: false,
                grid_columns:3
            },
            small_screens:{
                display_style: "grid",
                display_as_carousel: false,
                grid_columns:3
            },
        },
        images:{
            fixed_height: false,
            image_height: 300,
            fixed_width: false,
            image_width: 300,
            image_radius_unit: "Pixels",
            image_radius: 0,
            image_source: 'product'
        },
        style:{
            css: ""
        },
        coll:{
            col_name:"test",
        }
    });

    const [collapse, setCollapse] = useState({
        general: false,
        language: false,
        discount: false,
        timer: false,
        layout: false,
        placement: false,
        images: false,
        styles: false,
    });

    const [saveState, setSaveState] = useState(false);
    const [saveProcess, setSaveProcess] = useState(false);
    const [toastState, setToastState] = useState(false);

    function updateObject(object, path, newValue){
        var stack = path.split('.');
        console.log(stack);
        while(stack.length>1){
          object = object[stack.shift()];
        }
        object[stack.shift()] = newValue;
        setWidget(widget => ({
            ...widget,
            [stack.shift()]: newValue,
        }));
    }     

    const handleWidget = (key) => (e) => {
        console.log(key, e);
        updateObject(widget, key, e);
        setSaveState(true);
    };
    

    const handleToggle = (field) => (e) => {
        setCollapse(collapse => ({
            ...collapse,
            [field]: !collapse[field],
        }));
       
        console.log(prodata.prodata)
    };
   
    const [prodata , setPro] = useState({
        prodata:{}
    })

    async function loadWidget(){
        var auth = Cookies.get('auth');
        var response = await fetch(`/api/widgets/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+auth 
            }
        });
        var widgetObj = await response.json();
        setWidget(widgetObj);
        var obj = [];
        fetch('https://cart.brandlift.io/api/api/getcollection/'+widgetObj.store+'')
        .then(function (response) {
            return response.json();
        })
        .then(function (payload) {
            var allpro = payload.custom_collections;
            allpro.map(
                (item) =>
                    ( 
                        obj.push({value:item.title,label:item.title,id:item.id})
                    ));
        })
        window.allcol = obj;
        setPro({prodata:obj});
    } 

    async function saveWidget(){
        var auth = Cookies.get('auth');
        setSaveProcess(true);
        var response = await fetch(`/api/widgets/${id}`, {
            method: 'post',
            body: JSON.stringify(widget),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+auth 
            }
        });
        await response.json().then(() => setSaveProcess(false), setToastState(true),setSaveState(false));
    } 

    useEffect(() => {
        loadWidget();
     }, []);

    return (<Page
        breadcrumbs={[{content: 'Settings', onAction: () => navigate('/cart/cross-sell')}]}
        title="Edit Widget"
        primaryAction={{content: 'Save', disabled: !saveState, onAction: saveWidget, loading: saveProcess}}
        >
            { saveProcess ? <Loading /> : ''}
            <Layout>
                <Layout.Section>
                    <Card title="Live Preview" sectioned>
                        <p>Preview</p>
                    </Card>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card>
                        <Card.Header
                            title="General">
                            <Stack>
                                <Button plain icon={collapse.general ? ChevronUpMinor:ChevronDownMinor} onClick={handleToggle('general')}></Button>
                            </Stack>
                        </Card.Header>
                        { collapse.general ? <Card.Section>
                            <FormLayout>
                                <TextField
                                    label="Name"
                                    onChange={handleWidget('name')}
                                    autoComplete="off"
                                    value={widget.name}
                                />
                                <Select
                                    label="Product Type"
                                    options={[
                                        { label: 'One-Time Only', value: 'one-time' },
                                        { label: 'Subscription Only', value: 'subscription' },
                                        { label: 'Both (One-Time & Subscription)', value: 'both' },
                                    ]}
                                    onChange={handleWidget('product_type')}
                                    value={widget.product_type}
                                />

                                <b>Redirects</b>
                                <Select
                                    label="Learn More"
                                    options={[
                                        { label: 'Product Page', value: 'product' },
                                        { label: 'Disabled', value: 'none' },
                                    ]}
                                    onChange={handleWidget('redirects.learn_more')}
                                    value={widget.redirects.learn_more}
                                />
                                <Select
                                    label="Add to Cart Redirect"
                                    options={[
                                        { label: 'Redirect to Cart', value: 'cart' },
                                        { label: 'Redirect to Checkout', value: 'checkout' },
                                        { label: 'None (Stay on Current Page)', value: 'none' },
                                        { label: 'Close widget modal', value: 'close' },
                                    ]}
                                    onChange={handleWidget('redirects.add_to_cart')}
                                    value={widget.redirects.add_to_cart}
                                />
                                <Select
                                    label="Close Modal Redirect"
                                    options={[
                                        { label: 'Redirect to Cart', value: 'cart' },
                                        { label: 'Redirect to Checkout', value: 'checkout' },
                                        { label: 'None (Stay on Current Page)', value: 'none' },
                                    ]}
                                    onChange={handleWidget('redirects.modal_redirect')}
                                    value={widget.redirects.modal_redirect}
                                />


                            </FormLayout>
                        </Card.Section>: <p>&nbsp;</p>}
                    </Card>

                    <Card>
                        <Card.Header
                            title="Language">
                            <Stack>
                                <Button plain icon={collapse.language ? ChevronUpMinor:ChevronDownMinor} onClick={handleToggle('language')}></Button>
                            </Stack>
                        </Card.Header>
                        { collapse.language ? <Card.Section>
                            <FormLayout>
                                <TextField
                                    label="Super Title"
                                    autoComplete="off"
                                    onChange={handleWidget('language.super_title')}
                                    value={widget.language.super_title}
                                />
                                <TextField
                                    label="Title"
                                    autoComplete="off"
                                    onChange={handleWidget('language.title')}
                                    value={widget.language.title}
                                />
                                <TextField
                                    label="Description"
                                    multiline={3}
                                    autoComplete="off"
                                    onChange={handleWidget('language.description')}
                                    value={widget.language.description}
                                />
                                <TextField
                                    label="Variant Option"
                                    autoComplete="off"
                                    onChange={handleWidget('language.variant_option')}
                                    value={widget.language.variant_option}
                                    helpText="{{option_name}} is replaced with the actual option name."
                                />
                                <TextField
                                    label="Variant Options"
                                    autoComplete="off"
                                    onChange={handleWidget('language.variant_options')}
                                    value={widget.language.variant_options}
                                />
                                <TextField
                                    label="Add to Cart"
                                    autoComplete="off"
                                    onChange={handleWidget('language.add_to_cart')}
                                    value={widget.language.add_to_cart}
                                />
                                <TextField
                                    label="Adding to Cart"
                                    autoComplete="off"
                                    onChange={handleWidget('language.adding_to_cart')}
                                    value={widget.language.adding_to_cart}
                                />
                                <TextField
                                    label="Added to Cart"
                                    autoComplete="off"
                                    onChange={handleWidget('language.added_to_cart')}
                                    value={widget.language.added_to_cart}
                                />
                                <TextField
                                    label="Decline Offer"
                                    autoComplete="off"
                                    onChange={handleWidget('language.decline_offer')}
                                    value={widget.language.decline_offer}
                                />
                                <TextField
                                    label="Checkout Label"
                                    autoComplete="off"
                                    onChange={handleWidget('language.checkout_label')}
                                    value={widget.language.checkout_label}
                                />
                                <TextField
                                    label="Continue"
                                    autoComplete="off"
                                    onChange={handleWidget('language.continue')}
                                    value={widget.language.continue}
                                />
                                <TextField
                                    label="Sold Out"
                                    autoComplete="off"
                                    onChange={handleWidget('language.sold_out')}
                                    value={widget.language.sold_out}
                                />
                            </FormLayout>
                        </Card.Section>: <p>&nbsp;</p>}
                    </Card>

                    <Card>
                        <Card.Header
                            title="Timer">
                            <Stack>
                                <Button plain icon={collapse.timer ? ChevronUpMinor:ChevronDownMinor} onClick={handleToggle('timer')}></Button>
                            </Stack>
                        </Card.Header>
                        { collapse.timer ? <Card.Section>
                            <FormLayout>
                                <Checkbox
                                    label="Enabled Timer"
                                    checked={widget.timer.status}
                                    onChange={handleWidget('timer.status')}
                                />
                                {widget.timer.status ? <><TextField
                                    type='number'
                                    min={1}
                                    max={60}
                                    label="Minutes"
                                    autoComplete="off"
                                    onChange={handleWidget('timer.minutes')}
                                    value={widget.timer.minutes}
                                />
                                <TextField
                                    type='number'
                                    min={1}
                                    max={60}
                                    label="Seconds"
                                    autoComplete="off"
                                    onChange={handleWidget('timer.seconds')}
                                    value={widget.timer.seconds}
                                />
                                <Select
                                    label="Actions when timer ends"
                                    options={[
                                        { label: 'Redirect to Cart', value: 'cart' },
                                        { label: 'Redirect to Checkout', value: 'checkout' },
                                        { label: 'Dismiss Widget', value: 'dismiss' },
                                        { label: 'Stop Timer', value: 'stop' },
                                    ]}
                                    onChange={handleWidget('timer.action')}
                                    value={widget.timer.action}
                                /></> : ''}
                            </FormLayout>
                        </Card.Section>: <p>&nbsp;</p>}
                    </Card>

                    <Card>
                        <Card.Header
                            title="Layout">
                            <Stack>
                                <Button plain icon={collapse.layout ? ChevronUpMinor:ChevronDownMinor} onClick={handleToggle('layout')}></Button>
                            </Stack>
                        </Card.Header>
                        { collapse.layout ? <Card.Section>
                            <Select
                                label="Variant Selector Type"
                                options={[
                                    { label: 'Select', value: 'select' },
                                    { label: 'Buttons', value: 'button' },
                                ]}
                                onChange={handleWidget('layout.variant_selector_type')}
                                value={widget.layout.variant_selector_type}
                            />
                            <div style={{margin:'10px 0px'}}>
                                <Checkbox
                                    label="Show continue button"
                                    checked={widget.layout.show_continue_button}
                                    onChange={handleWidget('layout.show_continue_button')}
                                />
                            </div>
                            <hr style={{margin:'10px 0px'}}></hr>
                            <div><strong>Number Of Items To Show</strong></div>
                            <p>&nbsp;</p>
                            <label style={{fontWeight:'bold'}}>Large Screens</label>
                            <p>These settings take affect when the device screen is larger than 768px.</p>
                            <p>&nbsp;</p>
                            <Select
                                label="Display Style"
                                options={[
                                    { label: 'List', value: 'list' },
                                    { label: 'Grid', value: 'grid' },
                                    { label: 'Line', value: 'line' },
                                ]}
                                onChange={handleWidget('layout.large_screens.display_style')}
                                value={widget.layout.large_screens.display_style}
                            />
                            <div style={{margin:'10px 0px'}}>
                                <Checkbox
                                    label="Display as carousel"
                                    checked={widget.layout.large_screens.display_as_carousel}
                                    onChange={handleWidget('layout.large_screens.display_as_carousel')}
                                />
                            </div>
                            <RangeSlider
                                output
                                label="Grid Columns"
                                min={1}
                                max={6}
                                value={widget.layout.large_screens.grid_columns}
                                onChange={handleWidget('layout.large_screens.grid_columns')}
                            />

                            <hr style={{margin:'10px 0px'}}></hr>
                            <p>&nbsp;</p>
                            <label style={{fontWeight:'bold'}}>MEDIUM SCREENS</label>
                            <p>These settings take affect when the device screen is smaller than 768px and larger than 480px.</p>
                            <p>&nbsp;</p>
                            <Select
                                label="Display Style"
                                options={[
                                    { label: 'List', value: 'list' },
                                    { label: 'Grid', value: 'grid' },
                                    { label: 'Line', value: 'line' },
                                ]}
                                onChange={handleWidget('layout.medium_screens.display_style')}
                                value={widget.layout.medium_screens.display_style}
                            />
                            <div style={{margin:'10px 0px'}}>
                                <Checkbox
                                    label="Display as carousel"
                                    checked={widget.layout.medium_screens.display_as_carousel}
                                    onChange={handleWidget('layout.medium_screens.display_as_carousel')}
                                />
                            </div>
                            <RangeSlider
                                output
                                label="Grid Columns"
                                min={1}
                                max={6}
                                value={widget.layout.medium_screens.grid_columns}
                                onChange={handleWidget('layout.medium_screens.grid_columns')}
                            />

                            <hr style={{margin:'10px 0px'}}></hr>
                            <p>&nbsp;</p>
                            <label style={{fontWeight:'bold'}}>SMALL SCREENS</label>
                            <p>These settings take affect when the device screen is smaller than 480px.</p>
                            <p>&nbsp;</p>
                            <Select
                                label="Display Style"
                                options={[
                                    { label: 'List', value: 'list' },
                                    { label: 'Grid', value: 'grid' },
                                    { label: 'Line', value: 'line' },
                                ]}
                                onChange={handleWidget('layout.small_screens.display_style')}
                                value={widget.layout.small_screens.display_style}
                            />
                            <div style={{margin:'10px 0px'}}>
                                <Checkbox
                                    label="Display as carousel"
                                    checked={widget.layout.small_screens.display_as_carousel}
                                    onChange={handleWidget('layout.small_screens.display_as_carousel')}
                                />
                            </div>
                            <RangeSlider
                                output
                                label="Grid Columns"
                                min={1}
                                max={6}
                                value={widget.layout.small_screens.grid_columns}
                                onChange={handleWidget('layout.small_screens.grid_columns')}
                            />
                        </Card.Section>: <p>&nbsp;</p>}
                    </Card>

                    <Card>
                        <Card.Header
                            title="Images">
                            <Stack>
                                <Button plain icon={collapse.images ? ChevronUpMinor:ChevronDownMinor} onClick={handleToggle('images')}></Button>
                            </Stack>
                        </Card.Header>
                        { collapse.images ? <Card.Section>
                            <FormLayout>
                                
                                <Label style={{fontWeight:'bold'}}>PRODUCT IMAGES</Label>
                                <p>Setting fixed height images will normalize and reduce variation when your products have different image sizes and aspect ratios.</p>
                                
                                <Checkbox
                                    label="Used fixed height images"
                                    checked={widget.images.fixed_height}
                                    onChange={handleWidget('images.fixed_height')}
                                />
                                {widget.images.fixed_height ? <TextField
                                    type='number'
                                    min={1}
                                    label="Image Height"
                                    autoComplete="off"
                                    suffix="Pixels"
                                    value={widget.images.image_height}
                                    onChange={handleWidget('images.image_height')}
                                /> : ''}
                                
                                <Checkbox
                                    label="Used fixed width images"
                                    checked={widget.images.fixed_width}
                                    onChange={handleWidget('images.fixed_width')}
                                />

                                {widget.images.fixed_width ? <TextField
                                    type='number'
                                    min={1}
                                    label="Image Width"
                                    autoComplete="off"
                                    suffix="Pixels"
                                    value={widget.images.image_width}
                                    onChange={handleWidget('images.image_width')}
                                /> : ''}

                                <TextField
                                    type='number'
                                    min={1}
                                    label="Image Radius"
                                    autoComplete="off"
                                    connectedLeft={<Select
                                        label="Weight unit"
                                        labelHidden
                                        options={['Pixels', 'Percentage']}
                                        value={widget.images.image_radius_unit}
                                        onChange={handleWidget('images.image_radius_unit')}
                                      />
                                    }
                                    value={widget.images.image_radius}
                                    onChange={handleWidget('images.image_radius')}
                                />

                                <Select
                                    label="Image Source"
                                    options={[
                                        { label: 'Variant', value: 'variant' },
                                        { label: 'Product', value: 'product' }
                                    ]}
                                    value={widget.images.image_source}
                                    onChange={handleWidget('images.image_source')}
                                />
                            
                            </FormLayout>
                        </Card.Section>: <p>&nbsp;</p>}
                    </Card>

                    <Card>
                        <Card.Header
                            title="Styles">
                            <Stack>
                                <Button plain icon={collapse.styles ? ChevronUpMinor:ChevronDownMinor} onClick={handleToggle('styles')}></Button>
                            </Stack>
                        </Card.Header>
                        { collapse.styles ? <Card.Section>
                            <FormLayout>
                                <TextField
                                    multiline={4}
                                    type='text'
                                    placeholder=':roo{

                                    }'
                                    label="Custom CSS"
                                    value={widget.style.css}
                                    onChange={handleWidget('style.css')}
                                />
                            </FormLayout>
                        </Card.Section>: <p>&nbsp;</p>}
                    </Card>
                    
                    {widget.name == 'Featured Items' ?  
                   
                        <Card>
                        <Card.Header
                            title="Collection">
                            <Stack>
                                <Button plain icon={collapse.coll ? ChevronUpMinor:ChevronDownMinor} onClick={handleToggle('coll')}></Button>
                            </Stack>
                        </Card.Header>
                        { collapse.coll ? 
                        <Card.Section>
                            <FormLayout>
                                <Select
                                    label="Select collection"
                                    options={window.allcol}
                                    value={widget.coll}
                                    onChange={handleWidget('coll.col_name')}
                                />
                            </FormLayout>
                        </Card.Section> : <p>&nbsp;</p>}
                    </Card>
                   
                   : <p>&nbsp;</p>}
                    <p>&nbsp;</p>
                </Layout.Section>
            </Layout>
            <PageActions
                primaryAction={{content: 'Save', disabled: !saveState, onAction: saveWidget, loading: saveProcess}}
            />
            
            { toastState ? <Toast content="Updated" onDismiss={() => setToastState(false)} duration={4500} /> : '' }
        </Page>);
}