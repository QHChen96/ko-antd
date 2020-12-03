import React, { useRef, ReactText, useState, useEffect } from 'react';

import classnames from 'classnames';
import {
  Table,
  Pagination,
  Card,
  Image,
  Space,
  Menu,
  Dropdown,
  Typography,
  Button,
  Progress,
  Checkbox,
  Radio,
  Spin,
  Modal,
  Upload,
  Alert,
  Form,
  Input,
  TreeSelect,
  Row,
  Col,
} from 'antd';

import {
  AppstoreOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  CloudUploadOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  FolderTwoTone,
  FormOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { GridContent } from '@ant-design/pro-layout';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

import { prettySize } from '@/utils/utils';

import { ItemPagination, MediaFile, queryPhotos, UploadResult, ViewType } from '@/services/media';

// @ts-ignore
import styles from './style.less';

const { Text } = Typography;
const { Dragger } = Upload;

export interface MediaSelectorProps {
  className?: string;
  style?: React.CSSProperties;
  pagination?: ItemPagination;
}

const MediaGallery = (props: MediaSelectorProps) => {
  const {
    className: propsClassName,
    pagination: propsPagination = {
      total: 20,
      current: 1,
      pageSize: 32,
    },
    style: propsStyle,
  } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<MediaFile[]>([]);
  const [current, setCurrent] = useState(propsPagination.current);
  const [pageSize] = useState(propsPagination.pageSize);
  const [total, setTotal] = useState(propsPagination.total);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Array<ReactText>>([]);
  const [viewType, setViewType] = useState<ViewType>('table');
  const [newFolderForm] = Form.useForm();
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<UploadResult>({
    total: 0,
    uploadedCount: 0,
    successCount: 0,
    errorCount: 0,
  });
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);

  // const [uploadResultList, setUploadResultList] = useState([]);

  const [selectedItems, setSelectedItems] = useState(() => {
    if (!selectedKeys.length) {
      return [];
    }
    return data.filter((item) => selectedKeys.indexOf(item.fileId) !== -1);
  });

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const newData = await queryPhotos({
        current,
        pageSize,
      });
      setData(newData.list);
      setTotal(newData.total);
      setLoading(false);
    }
    getData();
  }, [current]);

  const setSelectedKeysAndItems = (keys: ReactText[], items: MediaFile[]) => {
    setSelectedKeys(keys);
    setSelectedItems(items);
  };

  const handleSelectChange = (keys: ReactText[], items: MediaFile[]) => {
    setSelectedKeysAndItems(keys, items);
  };

  const handleDeleteItem = (record: MediaFile) => {
    console.log('deleted: {1}', record.fileId);
  };

  const handleEditItem = (record: MediaFile) => {
    console.log('edit: {1}', record.fileId);
  };

  const tableDom = (
    <Table<MediaFile>
      loading={loading}
      pagination={false}
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys: selectedKeys,
        onChange: handleSelectChange,
      }}
      rowKey={(record) => record.fileId}
      size="small"
      dataSource={data || []}
      style={{ height: '100%', overflowY: 'scroll' }}
      columns={[
        {
          title: '图片',
          align: 'center',
          render: (text, record: MediaFile) => {
            if (record.fileType === 'folder') {
              return <FolderTwoTone style={{ fontSize: '60px' }} />;
            }
            return <Image src={record.filePath} width={60} height={60} />;
          },
        },
        {
          title: '图片名称',
          align: 'center',
          width: 200,
          ellipsis: true,
          dataIndex: 'fileName',
        },
        {
          title: '图片大小',
          align: 'center',
          colSpan: 2,
          render: (text, record: MediaFile) => (
            <div>{(record.fileSize && `${record.fileSize}KB`) || '-'}</div>
          ),
        },
        {
          title: '图片尺寸',
          align: 'center',
          colSpan: 0,
          render: (text, record: MediaFile) => (
            <div>
              {(record.pixelX && record.pixelY && `${record.pixelX}x${record.pixelY}`) || '-'}
            </div>
          ),
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createAt',
        },
        {
          title: '修改时间',
          align: 'center',
          dataIndex: 'modifiedAt',
        },
        {
          title: '操作',
          align: 'center',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={() => handleEditItem(record)}>编辑</a>
              <Dropdown
                overlay={
                  <Menu style={{ width: '120px' }}>
                    <Menu.Item
                      style={{ padding: '4px 16px' }}
                      onClick={() => handleDeleteItem(record)}
                    >
                      删除
                    </Menu.Item>
                  </Menu>
                }
              >
                <a type="link">
                  <EllipsisOutlined />
                </a>
              </Dropdown>
            </Space>
          ),
        },
      ]}
    />
  );

  const handleItemSelect = (mediaFile: MediaFile, checked: boolean) => {
    if (checked) {
      const newSelectedKeys = [...selectedKeys, mediaFile.fileId];
      const newSelectedItems = [...selectedItems, { ...mediaFile }];
      setSelectedKeysAndItems(newSelectedKeys, newSelectedItems);
    } else {
      const newSelectedKeys = selectedKeys.filter((key) => key !== mediaFile.fileId);
      const newSelectedItems = selectedItems.filter((item) => item.fileId !== mediaFile.fileId);
      setSelectedKeysAndItems(newSelectedKeys, newSelectedItems);
    }
  };

  const gridDom = (
    <div style={{ height: '100%', overflowY: 'scroll' }}>
      <Spin spinning={loading}>
        <div className={styles.mediaGrid}>
          {data.map((item) => {
            const isSelected = selectedKeys.indexOf(item.fileId) !== -1;
            const gridClassName = classnames(
              styles.mediaGridItem,
              isSelected && styles.mediaGridItemSelected,
            );
            return (
              <div key={item.fileId} className={gridClassName}>
                <div className={styles.mediaImageContainer}>
                  <div
                    style={{ height: '100%' }}
                    onClick={() => handleItemSelect(item, !isSelected)}
                  >
                    {(item.fileType === 'folder' && (
                      <FolderTwoTone style={{ fontSize: '128px' }} />
                    )) || <Image preview={false} src={item.filePath} width={128} height={128} />}
                    <Checkbox
                      className={classnames(
                        styles.mediaItemCheck,
                        isSelected && styles.gridItemSelected,
                      )}
                      checked={isSelected}
                      onChange={(e) => handleItemSelect(item, e.target.checked)}
                    />
                  </div>
                  <div className={styles.mediaItemToolbar}>
                    <FormOutlined
                      className={styles.mediaItemToolbarAction}
                      onClick={() => handleEditItem(item)}
                    />
                    <DeleteOutlined
                      className={styles.mediaItemToolbarAction}
                      onClick={() => handleDeleteItem(item)}
                    />
                  </div>
                </div>
                <div className={styles.mediaFileName}>{item.fileName}</div>
              </div>
            );
          })}
        </div>
      </Spin>
    </div>
  );

  const handlePaginationChange = (page: number, size?: number) => {
    setCurrent(page);
    if (propsPagination.onChange) {
      propsPagination.onChange(page, size);
    }
  };

  const handleViewTypeChange = (e: RadioChangeEvent) => {
    setViewType(e.target.value);
  };

  const handleAddNewFolder = () => {
    setShowNewFolderModal(true);
  };

  const className = classnames(styles.photoSelector, propsClassName);
  const toolbarDom = (
    <div className={styles.mediaToolbar}>
      <div className={styles.mediaTotal}>{total} 项文件</div>
      <div className={styles.mediaFree}>
        <Progress percent={30} className={styles.mediaFreeProgress} />
        <div className={styles.mediaFreeDesc}>
          <Text type="secondary">容量 322MB / 2GB</Text>
          <Text type="secondary">
            <InfoCircleOutlined />
          </Text>
        </div>
      </div>

      <Space className={styles.mediaToolbarActions}>
        <Button type="default" onClick={handleAddNewFolder}>
          新建文件夹
        </Button>
        <Button type="primary" onClick={() => setShowUploadModal(true)}>
          上传图片
        </Button>
        <Radio.Group value={viewType} buttonStyle="solid" onChange={handleViewTypeChange}>
          <Radio.Button value="table">
            <UnorderedListOutlined />
          </Radio.Button>
          <Radio.Button value="grid">
            <AppstoreOutlined />
          </Radio.Button>
        </Radio.Group>
      </Space>
    </div>
  );
  const handleFooterChange = (event: CheckboxChangeEvent) => {
    if (event.target.checked) {
      const newSelectedItems = [...data];
      const newSelectedKeys = newSelectedItems.map((item) => item.fileId);
      setSelectedKeysAndItems(newSelectedKeys, newSelectedItems);
      // handleSelectChange(newSelectedKeys, newSelectedItems);
      return;
    }
    handleSelectChange([], []);
  };

  useEffect(() => {
    const successCount = fileList.filter((item) => item.status && item.status === 'done').length;
    const errorCount = fileList.filter((item) => item.status && item.status === 'error').length;
    const uploadedCount = fileList.filter((item) => item.status && item.status !== 'uploading')
      .length;
    setUploadResult({
      total: fileList.length,
      successCount,
      errorCount,
      uploadedCount,
    });
  }, [fileList]);

  const uploadProps = {
    name: 'file',
    accept: '.jepg,.jpg,.png,.JEPG,.JPG,.PNG',
    multiple: true,
    showUploadList: false,
    maskClosable: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    fileList: [...fileList],
    beforeUpload: (file: RcFile, _fileList: RcFile[]) => {
      if (!showResultModal) {
        setFileList([..._fileList]);
        setShowResultModal(true);
        setShowUploadModal(false);
      }
      return true;
    },
    onChange({ file, fileList: FileList }: UploadChangeParam) {
      if (file.status && file.status !== 'uploading') {
        setFileList([...FileList]);
      }
    },
  };

  const isSuccess = (_uploadResult: UploadResult) => {
    const { successCount, errorCount } = _uploadResult;
    return successCount > 0 && errorCount === 0;
  };

  const isError = (_uploadResult: UploadResult) => {
    const { errorCount } = _uploadResult;
    return errorCount > 0;
  };

  const handleCloseUploadResult = () => {
    setShowResultModal(false);
  };

  const handleRetryUpload = () => {
    setShowUploadModal(true);
    setShowResultModal(false);
  };

  return (
    <GridContent>
      <div className={className} style={propsStyle} ref={rootRef}>
        <Card>
          <Form>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="图片名称">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="图片名称">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="图片名称">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Button type="primary">查询</Button>
                <Button type="primary" style={{ margin: '0 8px' }}>
                  重置
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card style={{ height: '100%' }} bodyStyle={{ padding: 0, height: '100%' }}>
          {toolbarDom}
          <div className={styles.mediaContent}>{(viewType === 'table' && tableDom) || gridDom}</div>
        </Card>
        <div className={styles.mediaSelectorFooter}>
          <div className={styles.footerToolbar}>
            <Checkbox
              indeterminate={selectedKeys.length > 0 && selectedKeys.length !== data.length}
              checked={selectedKeys.length === data.length}
              className={styles.footerCheckbox}
              onChange={handleFooterChange}
            >
              全选
            </Checkbox>
            {selectedKeys.length > 0 && (
              <>
                <Text>已选择 {selectedKeys.length} 项</Text>
                <Button size="small" type="link">
                  删除
                </Button>
              </>
            )}
          </div>
          <Pagination
            disabled={loading}
            className={styles.mediaListPagination}
            current={current}
            pageSize={pageSize}
            total={total}
            defaultCurrent={1}
            defaultPageSize={10}
            hideOnSinglePage={false}
            showSizeChanger={false}
            size="small"
            onChange={handlePaginationChange}
          />
        </div>
        <Modal
          className={styles.uploadModal}
          visible={showUploadModal}
          title="上传图片"
          width={800}
          footer={null}
          onCancel={() => setShowUploadModal(false)}
        >
          <Dragger {...uploadProps}>
            <p>
              <CloudUploadOutlined style={{ fontSize: '48px' }} />
            </p>
            <p style={{ margin: '8px auto' }}>
              您可以选择图片或上传整个文件夹,一次最多只能选择一个文件夹
            </p>
            <p style={{ fontSize: 12 }}>
              <Text type="secondary">文件上限2MB,只支持JEPG/JPG/PNG格式</Text>
            </p>
            <p style={{ margin: '8px auto' }}>
              <Button type="primary">选择图片</Button>
            </p>
          </Dragger>
          <div className={styles.uploadFooterDesc}>
            <Text type="secondary">您一次可以最多上传60张图片,请留意不要上传重复的图片</Text>
          </div>
        </Modal>
        <Modal
          className={styles.resultModal}
          title="上传中"
          visible={showResultModal}
          width={800}
          maskClosable={false}
          onCancel={() => setShowResultModal(false)}
          footer={
            <div className={styles.uploadResultFooter}>
              <div className={styles.uploadResultDesc}>
                {(uploadResult.total > 0 &&
                  `上传完成 ${uploadResult.uploadedCount}/${uploadResult.total}`) ||
                  null}
              </div>
              <div className={styles.uploadResultFooterActions}>
                <Button
                  onClick={handleCloseUploadResult}
                  className={styles.uploadResultFooterAction}
                >
                  关闭
                </Button>
                <Button
                  onClick={handleRetryUpload}
                  className={styles.uploadResultFooterAction}
                  type="primary"
                >
                  继续
                </Button>
              </div>
            </div>
          }
        >
          {isSuccess(uploadResult) && (
            <Alert message={`${uploadResult.errorCount} 张图片上传成功`} type="success" showIcon />
          )}
          {isError(uploadResult) && (
            <Alert
              message={`${uploadResult.errorCount} 张图片上传失败, 请查看失败原因并再试一次`}
              type="error"
              showIcon
            />
          )}
          <Table
            size="small"
            rowKey="uid"
            dataSource={fileList}
            pagination={false}
            scroll={{ y: 400 }}
            columns={[
              {
                title: '图片名称',
                dataIndex: 'name',
                key: 'name',
                render: (name, record) => {
                  return <Space>{record.name}</Space>;
                },
              },
              {
                title: '图片大小',
                dataIndex: 'size',
                key: 'size',
                render: (text) => prettySize(text),
              },
              {
                title: '状态',
                dataIndex: 'percent',
                render: (text, record) => {
                  if (record.status) {
                    if (record.status === 'error') {
                      return (
                        <Text style={{ fontSize: 12, color: '#ff4d4f' }}>
                          <CloseCircleFilled /> 上传失败
                        </Text>
                      );
                    }
                    if (record.status === 'done') {
                      return (
                        <Text style={{ fontSize: 12, color: '#52c41a' }}>
                          <CheckCircleFilled /> 上传成功
                        </Text>
                      );
                    }
                  }
                  return (
                    <Text style={{ fontSize: 12, color: '#1890ff' }}>
                      <LoadingOutlined /> 上传中
                    </Text>
                  );
                },
              },
            ]}
          />
        </Modal>
        <Modal
          title="新建文件夹"
          width={400}
          visible={showNewFolderModal}
          onCancel={() => setShowNewFolderModal(false)}
        >
          <Form form={newFolderForm} layout="vertical">
            <Form.Item name="folderParent" label="文件夹路径">
              <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                defaultValue={0}
                value={0}
                treeData={[
                  {
                    title: '媒体库',
                    value: 0,
                  },
                ]}
                treeDefaultExpandAll
              />
            </Form.Item>
            <Form.Item name="folderName" label="文件夹名称">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </GridContent>
  );
};

export default MediaGallery;
