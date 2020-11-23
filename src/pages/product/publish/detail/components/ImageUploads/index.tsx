import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

import { Modal, Image } from 'antd';
import MediaSelector from '@/components/MediaSelector';

import { ImageFile } from '@/services/media';

// @ts-ignore
import style from './style.less';

export interface ImageUploadsProp {
  value?: ImageFile[];
  imageTitles: string[];
}

export interface ImageUploadProps {
  value?: ImageFile;
  imageTitle?: string;
  onClick?: () => void;
  onChange?: (value: ImageFile) => void;
}

export const ImageUpload = ({ onClick, value = {}, imageTitle = '' }: ImageUploadProps) => {
  const [photoSelectorVisible, setPhotoSelectorVisible] = useState(false);
  const [imageFile, setImageFile] = useState<ImageFile>(value);
  const { imageUrl } = imageFile;

  const handleClick = () => {
    setPhotoSelectorVisible(true);
    if (onClick) {
      onClick();
    }
  };

  const handleChange = () => {};

  const cancelSelector = () => {
    setPhotoSelectorVisible(false);
  };

  return (
    <>
      <div className={style.uploadItem} onClick={handleClick}>
        <span className={style.placeholder}>{imageTitle}</span>
        {(imageUrl && null) || (
          <div className={style.uploadIcon}>
            <PlusCircleOutlined />
          </div>
        )}
      </div>
      <Modal
        bodyStyle={{ padding: 20 }}
        title="上传图片"
        width={800}
        visible={photoSelectorVisible}
        onCancel={cancelSelector}
      >
        <MediaSelector />
      </Modal>
    </>
  );
};

const ImageUploads: React.FC<ImageUploadsProp> = ({
  value = [],
  imageTitles = [],
}: ImageUploadsProp) => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>(value);
  return (
    <>
      <div className={style.imageUpload}>
        {imageTitles.map((imageTitle, index) => (
          <ImageUpload
            key={imageTitle}
            imageTitle={imageTitle}
            value={imageFiles[index] ? imageFiles[index] : {}}
          />
        ))}
      </div>
    </>
  );
};

export default ImageUploads;
