import {Page, Card, ResourceList, Avatar, ResourceItem, Modal, TextContainer} from '@shopify/polaris';
import React, {useState} from 'react';

export default function upsell() {

    const [active, setActive] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const items = [
        {
            id: 101,
            url: '#',
            name: 'Recommended (Full Page)',
            location: 'Display items that customers also bought based on the items currently in the cart. Great for embedding on the cart page.',
        },
        {
            id: 201,
            url: '#',
            name: 'Recommended (Cart Flyout)',
            location: 'Display items that customers also bought based on the items currently in the cart. Great for embedding in existing cart drawers.',
        },
        {
            id: 301,
            url: '#',
            name: 'Top Sellers',
            location: "Display your store's best selling items, which automatically updates as your sales data changes.",
        },
        {
            id: 401,
            url: '#',
            name: 'Buy It Again',
            location: "Display previously purchased items, otherwise fallback to recommended items.",
        },
        {
            id: 501,
            url: '#',
            name: 'Recently Viewed',
            location: "Display cross-device browsing history and make it easy to buy previously viewed products.",
        },
        {
            id: 601,
            url: '#',
            name: 'Gift with Purchase',
            location: "Automatically add items to a customer's cart when they meet certain criteria.",
        },
        {
            id: 701,
            url: '#',
            name: 'Featured Items',
            location: "Display specific products or collections directly on your cart page such as new products, top sellers, sale items, etc.",
        },
    ];

    function renderItem(item) {
        const {id, url, name, location} = item;
        const media = <Avatar customer size="medium" name={name} />;
        
        return (
          <ResourceItem
            id={id}
            url={url}
            media={media}
            accessibilityLabel={`View details for ${name}`}
          >
            <p variant="bodyMd" fontWeight="bold" as="h3">
              {name}
            </p>
            <div>{location}</div>
          </ResourceItem>
        );
    }

    const promotedBulkActions = [
        {
            content: 'Add Widget',
            onAction: () => console.log('Todo: implement bulk edit'),
        },
    ];


    return (
        <Page
        breadcrumbs={[{content: 'Settings', url: '/cart'}]}
        title="Upsell"
        primaryAction={{content: 'Add Widget', onAction: () => setActive(!active)}}
        >
            <Card>
            <ResourceList
                resourceName={{singular: 'upsell', plural: 'upsell'}}
                items={[
                {
                    id: 110,
                    url: '#',
                    name: 'Mae Jemison',
                    location: 'Decatur, USA',
                    latestOrderUrl: '#',
                },
                {
                    id: 210,
                    url: '#',
                    name: 'Ellen Ochoa',
                    location: 'Los Angeles, USA',
                    latestOrderUrl: '#',
                },
                ]}
                renderItem={(item) => {
                const {id, url, name, location, latestOrderUrl} = item;
                const media = <Avatar customer size="medium" name={name} />;
                const shortcutActions = latestOrderUrl
                    ? [
                        {
                        content: 'View latest order',
                        accessibilityLabel: `View ${name}’s latest order`,
                        url: latestOrderUrl,
                        },
                    ]
                    : null;

                return (
                    <ResourceItem
                    id={id}
                    url={url}
                    media={media}
                    accessibilityLabel={`View details for ${name}`}
                    shortcutActions={shortcutActions}
                    persistActions
                    >
                    <p variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                    </p>
                    <div>{location}</div>
                    </ResourceItem>
                );
                }}
            />
            </Card>

            <div style={{height: '500px'}}>
                <Modal
                    open={active}
                    title="Select Widget"
                    onClose={()=>setActive(!active)}
                >
                    <ResourceList
                        resourceName={{
                            singular: 'widget',
                            plural: 'widgets',
                        }}
                        items={items}
                        renderItem={renderItem}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        promotedBulkActions={promotedBulkActions}
                        selectable
                    />
                </Modal>
            </div>

        </Page>
    );
}