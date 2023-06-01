import { Card, FormLayout, Select, DropZone, Stack, Thumbnail, Button, Tooltip, TextField } from '@shopify/polaris';
import React from 'react';
import {NoteMinor, CircleInformationMajor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export function TrustPayment(){
    const [file, setFile] = useState<File>();

    const handleDropZoneDrop = useCallback(
      (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) =>
        setFile(acceptedFiles[0]),
      [],
    );
  
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  
    const fileUpload = !file && <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />;
    const uploadedFile = file && (
      <Stack vertical>
        <img src={
            validImageTypes.includes(file.type)
              ? window.URL.createObjectURL(file)
              : NoteMinor
          }
          style={{width: '95%'}}
        />
        <Button
            plain
            accessibilityLabel="Learn more"
        >Remove</Button>
      </Stack>
    );
   
    const title = (<Stack>
        <h2 className='Polaris-Heading'>Trust Payment Icons</h2>
        <Tooltip active content="This order has shipping labels."><Button
            plain
            icon={CircleInformationMajor}
            accessibilityLabel="Learn more"
        /></Tooltip>
    </Stack>);
    return (<Card title="Trust Payment Icons" sectioned>
        <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
        {uploadedFile}
        {fileUpload}
        </DropZone>

        {file && (<>
            <TextField 
                label="Padding"
                suffix="px"
            />
            
            <TextField 
                label="Margin"
                suffix="px"
            />
            <TextField 
                label="Width"
                value='100'
                suffix="%"
            />

        </>)}
    </Card>);
}