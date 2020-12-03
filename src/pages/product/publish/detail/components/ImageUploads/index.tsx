import React, { useState, useEffect, useRef } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

import { Modal, Image } from 'antd';
import MediaSelector from '@/components/MediaSelector';

import { ImageFile, MediaFile } from '@/services/media';

// @ts-ignore
import { keyBy } from 'lodash';
import style from './style.less';

export interface ImageUploadsProp {
  value?: ImageFile[];
  onChange?: (value: ImageFile[]) => void;
  imageTitles: string[];
}

export interface ImageUploadProps {
  value?: ImageFile;
  imageTitle?: string;
  onClick?: () => void;
  onChange?: (value: ImageFile) => void;
}

export const ImageUpload = ({
  onClick,
  onChange,
  value = {},
  imageTitle = '',
}: ImageUploadProps) => {
  const [photoSelectorVisible, setPhotoSelectorVisible] = useState(false);
  const [imageFile, setImageFile] = useState<ImageFile>(value);
  const { imageUrl } = imageFile;

  const handleClick = () => {
    setPhotoSelectorVisible(true);
    if (onClick) {
      onClick();
    }
  };

  const handleSelect = (mediaFile: MediaFile) => {
    const newImageFile: ImageFile = {
      imageId: mediaFile.fileId,
      imageUrl: mediaFile.filePath,
    };
    setImageFile(newImageFile);
    if (onChange) {
      onChange(newImageFile);
    }
    setPhotoSelectorVisible(false);
  };

  const cancelSelector = () => {
    setPhotoSelectorVisible(false);
  };

  return (
    <>
      <div className={style.uploadItem} onClick={handleClick}>
        {(imageUrl && <Image width={100} height={100} src={imageUrl} />) || (
          <div className={style.uploadIcon}>
            <PlusCircleOutlined />
          </div>
        )}
        <div className={style.uploadItemMask}>
          <span className={style.placeholder}>{imageTitle}</span>
        </div>
      </div>
      <Modal
        bodyStyle={{ padding: 20 }}
        title="上传图片"
        width={800}
        visible={photoSelectorVisible}
        onCancel={cancelSelector}
      >
        <MediaSelector onSelect={handleSelect} />
      </Modal>
    </>
  );
};

const ImageUploads: React.FC<ImageUploadsProp> = ({
  value = [],
  imageTitles = [],
  onChange,
}: ImageUploadsProp) => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>(value);
  const mapRef = useRef<{ [key: number]: ImageFile }>({});
  useEffect(() => {
    const map = { ...imageFiles };
    mapRef.current = map;
  }, []);

  const handleChange = (index: number, imageFile: ImageFile) => {
    mapRef.current[index] = { ...imageFile } as ImageFile;
    const newValue: ImageFile[] = [...Object.values(mapRef.current)];
    setImageFiles(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <div className={style.imageUpload}>
        {imageTitles.map((imageTitle, index) => (
          <ImageUpload
            key={imageTitle}
            imageTitle={imageTitle}
            value={imageFiles[index] ? imageFiles[index] : {}}
            onChange={(newImage) => handleChange(index, newImage)}
          />
        ))}
      </div>
    </>
  );
};

export default ImageUploads;
