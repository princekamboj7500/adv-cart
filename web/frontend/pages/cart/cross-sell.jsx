import {Page, Card, ResourceList, ResourceItem, Modal, Button, Stack, TextField, IndexTable, useIndexResourceState, Badge, Loading} from '@shopify/polaris';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from "react-router-dom";

export default function crossSell() {

    const [active, setActive] = useState(false);
    const [nameModal, setNameModal] = useState(false);
    const [widgetName, setWidgetName] = useState("");
    const [widgetId, setWidgetId] = useState("");
    const [widgetNameValidation, setWidgetNameValidation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [widgets, setWidgets] = useState([]);
    const [pageload, setPageload] = useState(true);

    const navigate = useNavigate();
 
    const items = [
        {
            id: "recommended_full_page)",
            url: '#',
            name: 'Recommended (Full Page)',
            location: 'Display items that customers also bought based on the items currently in the cart. Great for embedding on the cart page.',
        },
        {
            id: 'recommended_cart_flyout',
            url: '#',
            name: 'Recommended (Cart Flyout)',
            location: 'Display items that customers also bought based on the items currently in the cart. Great for embedding in existing cart drawers.',
        },
        {
            id: 'top_sellers',
            url: '#',
            name: 'Top Sellers',
            location: "Display your store's best selling items, which automatically updates as your sales data changes.",
        },
        {
            id: 'buy_it_again',
            url: '#',
            name: 'Buy It Again',
            location: "Display previously purchased items, otherwise fallback to recommended items.",
        },
        {
            id: 'recently_viewed',
            url: '#',
            name: 'Recently Viewed',
            location: "Display cross-device browsing history and make it easy to buy previously viewed products.",
        },
        {
            id: 'gift_with_purchase',
            url: '#',
            name: 'Gift with Purchase',
            location: "Automatically add items to a customer's cart when they meet certain criteria.",
        },
        {
            id: 'featured_items',
            url: '#',
            name: 'Featured Items',
            location: "Display specific products or collections directly on your cart page such as new products, top sellers, sale items, etc.",
        },
    ];

    const openNamePop = (id) => () => {
        console.log(id);
        var item_name = items.find(x => x.id == id).name;
        setWidgetName(item_name);
        setWidgetId(id);
        setActive(false);
        setNameModal(true);
    }

    function renderItem(item) {
        const {id, url, name, location} = item;    
        return (
          <ResourceItem
            id={id}
            accessibilityLabel={`View details for ${name}`}
          >
                <Stack wrap={false}>
                    <Stack.Item fill>
                        <b>{name}</b>
                        <p>{location}</p>
                    </Stack.Item>
                    <Stack.Item>
                        <Button onClick={openNamePop(id)}>Add</Button>
                    </Stack.Item>
                </Stack>
          </ResourceItem>
        );
    }

    const saveName = async() =>  {
        if(widgetName == ""){ 
            setWidgetNameValidation('Name required!');
            return false;
        }
        setWidgetNameValidation(false);
        setLoading(true);
        var auth = Cookies.get('auth');
        var dataPost = {
            name:widgetName,
            type: widgetId,
            status:1,
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
            collection:{
                name:"test"
            }
        };
        await fetch("/api/widgets", {
            method: 'post',
            body: JSON.stringify(dataPost),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+auth 
            }
        }).then(()=>setLoading(false), setNameModal(false), loadWidgets()).catch(()=>setLoading(false));
    }

    async function loadWidgets(){
        var auth = Cookies.get('auth');
        var response = await fetch("/api/widgets", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+auth 
            }
        });
        var widgetObj = await response.json().then((widgetObj) => {setWidgets(widgetObj), setPageload(false)});
    } 

    useEffect(() => {
       loadWidgets();
       console.log('useEffect');
    }, []);

    const {selectedResources, allResourcesSelected, handleSelectionChange} =  useIndexResourceState(widgets);

    const rowMarkup = widgets.map(
        ({_id, name, type, status, created_date}, index) => (
          <IndexTable.Row
            id={_id}
            key={_id}
            selected={selectedResources.includes(_id)}
            position={index}
          >
            <IndexTable.Cell>{name}</IndexTable.Cell>
            <IndexTable.Cell>{type}</IndexTable.Cell>
            <IndexTable.Cell>{created_date}</IndexTable.Cell>
            <IndexTable.Cell>{status ? <Badge status="success">Acive</Badge> : <Badge status="warning">In-Active</Badge>}</IndexTable.Cell>
            <IndexTable.Cell> <Button onClick={() => {navigate('/cart/cross-sell/'+_id)}}>Edit</Button> </IndexTable.Cell>    
          </IndexTable.Row>
        ),
    );

    return (
        <Page
        breadcrumbs={[{content: 'Settings', onAction: () => navigate('/cart')}]}
        title="Cross-sell"
        primaryAction={{content: 'Add Widget', onAction: () => setActive(!active)}}
        >
            {pageload ? <Loading /> : '' }
            <Card>
                <IndexTable
                    resourceName={{singular: 'Widget', plural: 'Widgets'}}
                    itemCount={widgets.length}
                    selectedItemsCount={
                        allResourcesSelected ? 'All' : selectedResources.length
                    }
                    selectable={false}
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        {title: 'Name'},
                        {title: 'Type'},
                        {title: 'Created'},
                        {title: 'Status'},
                        {title: 'Action'},
                    ]}
                >
                {rowMarkup}
                </IndexTable>
            </Card>

            <div style={{height: '500px'}}>
                <Modal
                    open={active}
                    title="Select Widget"
                    onClose={()=>setActive(!active)}
                >
                    <ResourceList
                        resourceName={{
                            singular: 'widgetList',
                            plural: 'widgetList',
                        }}
                        items={items}
                        renderItem={renderItem}
                    />
                </Modal>
            </div>

            <Modal
                open={nameModal}
                title="New Widget"
                onClose={()=>setNameModal(!nameModal)}
                small
                primaryAction={{
                    content: 'Create it',
                    onAction: saveName,
                    loading: loading
                }}
            >
                <Modal.Section>
                    <TextField
                        label="What would you like your widget to be named?"
                        value={widgetName}
                        onChange={(e) => {setWidgetName(e),setWidgetNameValidation(false)}}
                        autoComplete="off"
                        error={widgetNameValidation}
                    />
                </Modal.Section>
            </Modal>

        </Page>
    );
}