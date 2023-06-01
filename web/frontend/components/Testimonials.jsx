import { Avatar, Button, Card, Checkbox, DropZone, FormLayout, RangeSlider, ResourceItem, ResourceList, Select, Stack, TextField, Thumbnail} from '@shopify/polaris';
import React from 'react';
import {NoteMinor, StarFilledMinor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export function Testimonials(props){
    var settings = props.settings;
    const [testimonials, setTestimonials] = useState([{
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Globe_icon.svg/420px-Globe_icon.svg.png',
        size: '100',
        image_padding: '',
        image_margin: '',
        name: 'Jhon',
        review: '',
        star: true,
        order_date: '',
        background_color: '#ffffff',
        font_color: '#000000',
        font_size: '16',
        font_weight: '400'
    }]);

    const updateValue = (idx, field, value) => {
        testimonials[idx][field] = value;
        setTestimonials(testimonials => ([
            ...testimonials
        ]));
    }

    const addBenefits = () => {
        var placeholder = {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Globe_icon.svg/420px-Globe_icon.svg.png',
            size: '100',
            image_padding: '',
            image_margin: '',
            name: 'Jhon',
            review: '',
            start: true,
            order_date: '',
            background_color: '#ffffff',
            font_color: '#000000',
            font_size: '16',
            font_weight: '400'
        };
        testimonials.push(placeholder);
        setTestimonials(testimonials => ([
            ...testimonials
        ]));
    }

    const removeBenefits = (index) => {
        testimonials.splice(index, 1);
        setTestimonials(testimonials => ([
            ...testimonials
        ]));
    }

    return (<Card title="Testimonials" sectioned primaryFooterAction={{content: 'Add Testimonials', onAction: addBenefits}}>
        <FormLayout>
            <Select
                label="Position"
                options={[
                    { label: 'Top', value: 'top' },
                    { label: 'Bottom', value: 'bottom' }
                ]}
            />

            <ResourceList
                resourceName={{singular: 'Testimonial', plural: 'Testimonials'}}
                items={testimonials}
                renderItem={(item, idx) => {
                const {image, name, review, size, background_color, font_color, font_size, font_weight, image_padding, image_margin, star, order_date} = item;
                const media = <Thumbnail
                    source={StarFilledMinor}
                    size='small'
                />;

                return (
                    <ResourceItem
                        id={idx}
                        media={media}
                    >
                        <div style={{width: 50, height: 80}}>
                            <DropZone label="Image">
                                <DropZone.FileUpload />
                            </DropZone>
                        </div>
                        <FormLayout>
                            <RangeSlider
                                output
                                label="Image Size"
                                min={0}
                                max={100}
                                value={size}
                                onChange={(txt) => updateValue(idx, 'size', txt)}
                                suffix={
                                <p
                                    style={{
                                    minWidth: '24px',
                                    textAlign: 'right',
                                    }}
                                >
                                    {size}
                                </p>
                                }
                            />
                            <Stack>
                                <TextField
                                    label="Image Padding"
                                    onChange={(txt) => updateValue(idx, 'image_padding', txt)}
                                    placeholder='10px 10px 10px 10px'
                                    autoComplete="off"
                                    value={image_padding}
                                />
                                <TextField
                                    label="Image Margin"
                                    onChange={(txt) => updateValue(idx, 'image_margin', txt)}
                                    placeholder='10px 10px 10px 10px'
                                    autoComplete="off"
                                    value={image_margin}
                                />
                            </Stack>
                            <TextField
                                label="Name"
                                onChange={(txt) => updateValue(idx, 'name', txt)}
                                autoComplete="off"
                                value={name}
                            />
                            <TextField
                                label="Review"
                                multiline={4}
                                onChange={(txt) => updateValue(idx, 'review', txt)}
                                autoComplete="off"
                                value={review}
                            />
                            <Checkbox
                                label="Show 5 Star Image"
                                checked={star}
                                onChange={(txt) => updateValue(idx, 'star', txt)}
                            />
                            <TextField
                                label="Order Date"
                                type='date'
                                onChange={(txt) => updateValue(idx, 'order_date', txt)}
                                autoComplete="off"
                                value={order_date}
                            />
                            <Stack>
                                <TextField
                                    label="Font Size"
                                    onChange={(txt) => updateValue(idx, 'font_size', txt)}
                                    placeholder='10px'
                                    autoComplete="off"
                                    value={font_size}
                                />
                                <TextField
                                    label="Font Weight"
                                    onChange={(txt) => updateValue(idx, 'font_weight', txt)}
                                    placeholder='600'
                                    autoComplete="off"
                                    value={font_weight}
                                />
                            </Stack>
                            <Stack>
                                <p>Section Background Color: </p>
                                <input className='colorInput' type='color' value={background_color} />
                            </Stack>
                            <Stack>
                                <p>Font Color: </p>
                                <input className='colorInput' type='color' value={font_color} />
                            </Stack>
                            <Button destructive onClick={() => removeBenefits(idx)}>Remove</Button>
                        </FormLayout>
                    </ResourceItem>
                );
                }}
            />
            
        </FormLayout>
    </Card>);
}