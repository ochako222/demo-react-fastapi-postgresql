import { Flex, Box, Image, Input } from '@chakra-ui/react';
import React from 'react';
import { convertBase64File } from '../helpers/utils';

interface ThumbnailPreviewProps {
    color: string;
    thumbnail: string;

    onFileChange(value: any): void;

    onColorChange(value: string): void;
}

export const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
    onFileChange,
    onColorChange,
    color,
    thumbnail
}: ThumbnailPreviewProps) => {
    const changeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files) {
            const base64 = await convertBase64File(files[0]);
            onFileChange(base64);
        }
    };

    const changeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onColorChange === 'function') {
            onColorChange(event.target.value);
        }
    };

    return (
        <Flex padding={'10px 0'} alignItems={'center'}>
            <input type="file" onChange={changeFile} />
            <Flex gap={'1em'} alignItems={'center'}>
                <Input type="text" value={color} onChange={changeColor} size={'sm'} width={'50%'} />
                <input type="color" value={color} onChange={changeColor} />
            </Flex>
            <Box
                id="thumbnail"
                style={{ backgroundColor: color, marginLeft: '3em ' }}
                borderRadius={'5px'}
            >
                <Image src={thumbnail} className={'preview'} />
            </Box>
        </Flex>
    );
};

export default ThumbnailPreview;
