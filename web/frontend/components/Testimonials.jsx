import { Avatar, Button, Card, Checkbox, DropZone, FormLayout, RangeSlider, ResourceItem, ResourceList, Select, Stack, TextField, Thumbnail} from '@shopify/polaris';
import React from 'react';
import {NoteMinor, StarFilledMinor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export function Testimonials(props){
    const [testimonials, setTestimonials] = useState(props.settings.testimonial);

    const updateValue = (idx, field, value) => {
        testimonials.testimonials[idx][field] = value;
        setTestimonials(testimonials => ({
            ...testimonials,
            ['testimonials']: testimonials.testimonials
        }));
    }

    const addBenefits = () => {
        var placeholder = {
            image: '',
            size: '100',
            image_padding: '10px 10px 10px 10px',
            image_margin: '10px 10px 10px 10px',
            name: 'Jhon',
            review: '',
            start: true,
            order_date: '',
            background_color: '#ffffff',
            font_color: '#000000',
            font_size: '16',
            font_weight: '400'
        };
        testimonials.testimonials.push(placeholder);
        setTestimonials(testimonials => ({
            ...testimonials,
            ['testimonials']: testimonials.testimonials
        }));
    }

    const updateLayout = (value) => {
        setTestimonials(testimonials => ({
            ...testimonials,
            ['position']: value
        }));
    }

    const removeBenefits = (index) => {
        testimonials.testimonials.splice(index, 1);
        setTestimonials(testimonials => ({
            ...testimonials,
            ['testimonials']: testimonials.testimonials
        }));
    }

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles, idx) => {
           const formData = new FormData();
           formData.append('file', acceptedFiles[0]);
          fetch('/api/upload', {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(json => {
                testimonials.testimonials[idx].image = json.filename;
                setTestimonials(testimonials => ({
                    ...testimonials,
                    ['testimonials']: testimonials.testimonials
                }));
            })
            .catch(error => {
              console.error('Error uploading file:', error);
            });
          }
          ,
        [],
      );

    return (<Card title="Testimonials" sectioned primaryFooterAction={{content: 'Add Testimonials', onAction: addBenefits}}>
        <FormLayout>
            <Select
                label="Position"
                options={[
                    { label: 'Top', value: 'top' },
                    { label: 'Bottom', value: 'bottom' }
                ]}
                value={testimonials.position}
                onChange={(ly) => updateLayout(ly)}
            />

            <ResourceList
                resourceName={{singular: 'Testimonial', plural: 'Testimonials'}}
                items={testimonials.testimonials}
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
                            <DropZone label="Image" allowMultiple={false} onDrop={(_dropFiles, acceptedFiles, _rejectedFiles) => handleDropZoneDrop(_dropFiles, acceptedFiles, _rejectedFiles, idx)}>
                                {image == "" && (<DropZone.FileUpload />)}
                                {image != "" && (<img src={'/api/uploads/'+image} style={{width:"50px"}} />)}
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
                                <input className='colorInput' type='color' value={background_color}  onChange={(txt) => updateValue(idx, 'background_color', txt.target.value)} />
                            </Stack>
                            <Stack>
                                <p>Font Color: </p>
                                <input className='colorInput' type='color' value={font_color} onChange={(txt) => updateValue(idx, 'font_color', txt.target.value)} />
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