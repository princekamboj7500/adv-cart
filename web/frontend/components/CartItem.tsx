import { Card, FormLayout, Select, DropZone, Stack, Thumbnail, Button, Tooltip, TextField } from '@shopify/polaris';
import React, { useEffect } from 'react';
import {NoteMinor, CircleInformationMajor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export function CartItem(props){
    var cartitem = props.settings.general_settings.cartitem.background_color;
    console.log('cartitemcartitem' , cartitem)

    const [padding, setPadding] = useState('');

    const updateFields = (index, val) => {
        props.settings.general_settings.cartitem[index] = val;
        setPadding(val);
    }

    return (<Card title="Cart Items " sectioned>
        <TextField 
            type='color'
            label="Background Color"
            value={props.settings.general_settings.cartitem.background_color}
            onChange={(e) => updateFields('background_color', e)}
        />
        <br />
        <b>Product Image</b>
        <Stack>
            <TextField 
                label="Size"
                placeholder='100% or 150px'
                value={props.settings.general_settings.cartitem.product_img_size}
                onChange={(e) => updateFields('product_img_size', e)}
            />
            <TextField 
                label="Padding"
                placeholder='10px 10px 10px 10px'
                value={props.settings.general_settings.cartitem.product_img_padding}
                onChange={(e) => updateFields('product_img_padding', e)}
            />
        </Stack>
        <br />
        <b>Title Typography</b>
        <Stack>
            <TextField 
                label="Size"
                placeholder='14px'
                value={props.settings.general_settings.cartitem.title_size}
                onChange={(e) => updateFields('title_size', e)}
            />
            <TextField 
                type='color'
                label="Color"
                value={props.settings.general_settings.cartitem.title_color}
                onChange={(e) => updateFields('title_color', e)}
            />
            <TextField 
                label="Weight"
                value={props.settings.general_settings.cartitem.title_weight}
                onChange={(e) => updateFields('title_weight', e)}
            />
        </Stack>
        <br />
        <b>Variant Typography</b>
        <Stack>
            <TextField 
                label="Size"
                placeholder='14px'
                value={props.settings.general_settings.cartitem.variant_size}
                onChange={(e) => updateFields('variant_size', e)}
            />
            <TextField 
                type='color'
                label="Color"
                value={props.settings.general_settings.cartitem.variant_color}
                onChange={(e) => updateFields('variant_color', e)}
            />
            <TextField 
                label="Weight"
                value={props.settings.general_settings.cartitem.variant_weight}
                onChange={(e) => updateFields('variant_weight', e)}
            />
        </Stack>
        <br />
        <b>Price Typography</b>
        <Stack>
            <TextField 
                label="Size"
                placeholder='14px'
                value={props.settings.general_settings.cartitem.price_size}
                onChange={(e) => updateFields('price_size', e)}
            />
            <TextField 
                type='color'
                label="Color"
                value={props.settings.general_settings.cartitem.price_color}
                onChange={(e) => updateFields('price_color', e)}
            />
            <TextField 
                label="Weight"
                value={props.settings.general_settings.cartitem.price_weight}
                onChange={(e) => updateFields('price_weight', e)}
            />
        </Stack>
        <br />
        <b>Discount Typography</b>
        <Stack>
            <TextField 
                label="Size"
                placeholder='14px'
                value={props.settings.general_settings.cartitem.discount_size}
                onChange={(e) => updateFields('discount_size', e)}
            />
            <TextField 
                type='color'
                label="Color"
                value={props.settings.general_settings.cartitem.discount_color}
                onChange={(e) => updateFields('discount_color', e)}
            />
            <TextField 
                label="Weight"
                value={props.settings.general_settings.cartitem.discount_weight}
                onChange={(e) => updateFields('discount_weight', e)}
            />
        </Stack>

    </Card>);
}