import { Avatar, Button, Card, DropZone, FormLayout, RangeSlider, ResourceItem, ResourceList, Select, Stack, TextField, Thumbnail} from '@shopify/polaris';
import React from 'react';
import {NoteMinor, CircleInformationMajor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export function Benefits(props){
    var settings = props.settings.benefit;
    console.log(settings);
    const [benefits, setBenefits] = useState(props.settings.benefit);
   
    const updateValue = (idx, field, value) => {
        console.log( idx, field, value);
        benefits.benefits[idx][field] = value;
        console.log("benefits:", benefits);
        setBenefits(benefits => ({
            ...benefits,
            ['benefits']:benefits.benefits
        }));
    }
   
    const updateLayout = (index, value) => {
        props.settings.benefit[index] = value;
        setBenefits(benefits => ({
            ...benefits,
            [index]:value
        }));
    }

    const addBenefits = () => {
        var placeholder = {
            image: '',
            size: '100',
            image_padding: '10px 10px 10px 10px',
            image_margin: '10px 10px 10px 10px',
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
    }

    const removeBenefits = (index) => {
        benefits.benefits.splice(index, 1);
        setBenefits(benefits => ({
            ...benefits,
            ['benefits']:benefits.benefits
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
                benefits.benefits[idx].image = json.filename;
                setBenefits(benefits => ({
                    ...benefits,
                    ['benefits']:benefits.benefits
                }));
            })
            .catch(error => {
              console.error('Error uploading file:', error);
            });
          }
          ,
        [],
      );

    return (<Card title="Benefits" sectioned primaryFooterAction={{content: 'Add Benefit', onAction: addBenefits, disabled: benefits.benefits.length > 3}}>
        <FormLayout>
            <Select
                label="Layout"
                options={[
                    { label: 'Stacked (1 Row for Each)', value: 'stacked' },
                    { label: 'Inline (2 Benefits Per Row)', value: 'inline' }
                ]}
                value={benefits.layout}
                onChange={(ly) => updateLayout('layout', ly)}
            />

            <TextField
                type='color'
                label="Section Background Color"
                onChange={(ly) => updateLayout('background_color', ly)}
                value={benefits.background_color}
            />

            <TextField
                label="Section Padding"
                onChange={(ly) => updateLayout('section_padding', ly)}
                value={benefits.section_padding}
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
                            <DropZone label="Icon" allowMultiple={false} onDrop={(_dropFiles, acceptedFiles, _rejectedFiles) => handleDropZoneDrop(_dropFiles, acceptedFiles, _rejectedFiles, idx)}>
                                {image == "" && (<DropZone.FileUpload />)}
                                {image != "" && (<img src={'/api/uploads/'+image} style={{width:"50px"}} />)}
                            </DropZone>
                        </div>
                        <FormLayout>
                            <RangeSlider
                                output
                                label="Icon Size"
                                min={20}
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
                                    {size}PX
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
                                    suffix="px"
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
                                <p>Font Color: </p>
                                <input className='colorInput' onChange={(txt) => updateValue(idx, 'font_color', txt.target.value)} type='color' value={font_color} />
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