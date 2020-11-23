import React, { useState } from 'react';
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';

function getBase64(img: Blob, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


export interface ImageUploadProps {
  accepts?: string[],
  maxFileSize?: number,
  value?: string,
  fileName?: string,
  uploadAction?: string,
  width?: number|string,
  uploadButtonName?: string,
  onChange?: (imageUrl: string) => void;
}


export default ({
  accepts=['jepg', 'png', 'jpg'],
  maxFileSize=2,
  value,
  fileName="name",
  uploadAction="",
  uploadButtonName="上传",
  width="100%",
  onChange
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value);
  const [fileList, setFileList] = useState<UploadFile<any>[]>(() => {
    if (imageUrl) {
      return [{
        uid: 'image',
        name: imageUrl.substring(imageUrl.lastIndexOf("/") + 1),
        status: 'done',
        size: 0,
        type: 'image/jpg',
        url: imageUrl as string
      }]
    }
    return [];
  });

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
      if (imageUrl && onChange) {
        onChange(imageUrl);
      }
    }
    setFileList(info.fileList);
  }

  const beforeUpload = (file: any) => {
    const isInclude = accepts.map(type => `image/${type}`).indexOf(file.type) !== -1;
    if (!isInclude) {
      message.error(`You can only upload ${accepts.join("/")} file!`);
      return false;
    }
    const isLt = file.size / 1024 / 1024 < maxFileSize;
    if (!isLt) {
      message.error(`Image must smaller than ${maxFileSize}MB!`);
      return false;
    }
    return true;
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{uploadButtonName}</div>
    </div>
  );

  return (
    <Upload
      name={fileName}
      listType="picture-card"
      className="image-upload"
      showUploadList={false}
      fileList={fileList}
      action={uploadAction}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      { imageUrl ? <img src={imageUrl} alt="image" style={{ width }}/> : uploadButton }
    </Upload>
  );
}

