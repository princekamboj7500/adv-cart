import { Avatar, Button, Card, DropZone, FormLayout, RangeSlider, ResourceItem, ResourceList, Select, Stack, TextField, Thumbnail} from '@shopify/polaris';
import React from 'react';
import {NoteMinor, CircleInformationMajor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export function Benefits(props){
    var settings = props.settings.benefit;
    console.log('settings' , settings)
    // const [benefits, setBenefits] = useState([{
    //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Globe_icon.svg/420px-Globe_icon.svg.png',
    //     size: '100',
    //     image_padding: '',
    //     image_margin: '',
    //     text: 'Made in USA',
    //     background_color: '#ffffff',
    //     font_color: '#000000',
    //     font_size: '16',
    //     font_weight: '400'
    // }]);
    const [benefits, setBenefits] = useState(settings);
   
    const updateValue = (idx, field, value) => {
        console.log( idx, field, value);
        benefits.benefits[idx][field] = value;
        console.log("benefits:", benefits);
        setBenefits(benefits => ({
            ...benefits,
            ['benefits']:benefits.benefits
        }));
        // setBenefits(benefits => ([
        //     ...benefits
        // ]));
    }

    const addBenefits = () => {
        var placeholder = {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Globe_icon.svg/420px-Globe_icon.svg.png',
            size: '100',
            image_padding: '',
            image_margin: '',
            text: 'Made in USA',
            background_color: '#ffffff',
            font_color: '#000000',
            font_size: '16',
            font_weight: '400'
        };
        benefits.benefits.push(placeholder);
        setBenefits(benefits => ({
            ...benefits,
            ['benefits']:benefits.benefits
        }));
        // setBenefits(benefits => ([
        //     ...benefits
        // ]));
    }

    const removeBenefits = (index) => {
        benefits.benefits.splice(index, 1);
        // setBenefits(benefits => ([
        //     ...benefits
        // ]));
        setBenefits(benefits => ({
            ...benefits,
            ['benefits']:benefits.benefits
        }));
    }

    return (<Card title="Benefits" sectioned primaryFooterAction={{content: 'Add Benefit', onAction: addBenefits, disabled: benefits.benefits.length > 3}}>
        <FormLayout>
            <Select
                label="Layout"
                options={[
                    { label: 'Stacked (1 Row for Each)', value: 'stacked' },
                    { label: 'Inline (2 Benefits Per Row)', value: 'inline' }
                ]}
            />

            <ResourceList
                resourceName={{singular: 'Benefit', plural: 'Benefits'}}
                items={benefits.benefits}
                renderItem={(item, idx) => {
                const {image, text, size, background_color, font_color, font_size, font_weight, image_padding, image_margin} = item;
                const media = <Thumbnail
                    source={NoteMinor}
                    size='small'
                />;

                return (
                    <ResourceItem
                        id={idx}
                        accessibilityLabel={`View details for ${text}`}
                        media={media}
                    >
                        <div style={{width: 50, height: 80}}>
                            <DropZone label="Icon">
                                <DropZone.FileUpload />
                            </DropZone>
                        </div>
                        <FormLayout>
                            <RangeSlider
                                output
                                label="Icon Size"
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
                                label="Text"
                                onChange={(txt) => updateValue(idx, 'text', txt)}
                                autoComplete="off"
                                value={text}
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
                                <input className='colorInput' type='color'  onChange={(txt) => updateValue(idx, 'background_color', txt)} value={background_color} />
                            </Stack>
                            <Stack>
                                <p>Font Color: </p>
                                <input className='colorInput' onChange={(txt) => updateValue(idx, 'font_color', txt)} type='color' value={font_color} />
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