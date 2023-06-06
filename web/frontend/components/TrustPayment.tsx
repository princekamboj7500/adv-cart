import { Card, FormLayout, Select, DropZone, Stack, Thumbnail, Button, Tooltip, TextField } from '@shopify/polaris';
import React, { useEffect } from 'react';
import {NoteMinor, CircleInformationMajor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export function TrustPayment(props){
    var trust_badge = props.settings.trust_badge;
    console.log('trust_badge', trust_badge);
    const [file, setFile] = useState<File>();
    const [padding, setPadding] = useState('');

    const handleDropZoneDrop = useCallback(
      (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
         setFile(acceptedFiles[0])
         const formData = new FormData();
         formData.append('file', acceptedFiles[0]);
        fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(json => {
            props.settings.trust_badge.src = json.filename;
          })
          .catch(error => {
            console.error('Error uploading file:', error);
          });
        }
        ,
      [],
    );
  
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  
    const fileUpload = !file && <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />;

    const removeImg = () => {
      setFile('');
    }

    const uploadedFile = file && (
      <Stack vertical>
        <img src={
            validImageTypes.includes(file.type)
              ? window.URL.createObjectURL(file)
              : (trust_badge.src != "" ? '/api/uploads/'+trust_badge.src : NoteMinor)
          }
          style={{width: '95%' ,  height: '110px'}}
        />
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

    async function imageUrlToFile(url, filename) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], filename, { type: blob.type });
        return file;
      } catch (error) {
        console.error('Error converting image URL to file:', error);
        return null;
      }
    }

    const updateField = (key, val) => {
      props.settings.trust_badge[key] = val;
      setPadding(props.settings.trust_badge[key]);
    }

    useEffect(() => {
      if(trust_badge.src != ""){
        const fileName = 'trust.jpg';
        imageUrlToFile('/api/uploads/'+trust_badge.src, fileName)
          .then((trust) => {
            if (trust) {
              setFile(trust)
            } else {
              console.log('Conversion failed');
            }
          });
      }
    }, []);
    
    return (<Card title="Trust Payment Icons" sectioned>
        <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
        {uploadedFile}
        {fileUpload}
        </DropZone>

        {file && (<>
            <TextField 
                label="Padding"
                placeholder='10px 10px 10px 10px'
                value={props.settings.trust_badge.padding}
                onChange={(p) => updateField('padding', p)}
            />
            
            <TextField 
                label="Margin"
                placeholder='10px 10px 10px 10px'
                value={props.settings.trust_badge.margin}
                onChange={(p) => updateField('margin', p)}
            />
            <TextField 
                label="Width"
                suffix="%"
                value={props.settings.trust_badge.width}
                onChange={(p) => updateField('width', p)}
            />

            <Button destructive onClick={removeImg}>Remove</Button>

        </>)}
    </Card>);
}