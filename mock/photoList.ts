import { Request, Response } from 'express';
import { parse } from 'url';
import { MediaFile, MediaFileRequestParams } from '@/components/MediaSelector/data';

const genList = (current: number, pageSize: number) => {
  const list: MediaFile[] = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    list.push({
      fileId: index,
      fileType: 'img',
      fileName: `${index}商品图片商品图片商品`,
      folderId: 0,
      pixelX: 600,
      pixelY: 800,
      fileSize: 100,
      status: 'normal',
      createAt: '2020-09-09',
      modifiedAt: '2020-09-20',
      filePath: [
        'https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg',
        'https://img.alicdn.com/imgextra/i1/2207222472824/O1CN01fVajo31WjR5e6FGbw_!!2207222472824-0-lubanu-s.jpg',
        'https://img.alicdn.com/imgextra/i2/2124152022/TB2vjOjwH5YBuNjSspoXXbeNFXa_!!2124152022-0-item_pic.jpg',
        'https://img.alicdn.com/imgextra/i4/1782090849/O1CN01BgPiqt1I8spY3zokU_!!1782090849.jpg',
        'https://img.alicdn.com/imgextra/i1/2207303687771/O1CN01nFfVaA27HAQF6SjTf_!!2207303687771.jpg',
      ][i % 5],
    });
  }
  return list;
};

let photoDataSource = genList(1, 100);

function getPhoto(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as MediaFileRequestParams;

  let dataSource = [...photoDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  if (params.fileName) {
    dataSource = dataSource.filter((data) => data.fileName.includes(params.fileName || ''));
  }
  const result = {
    data: dataSource,
    total: photoDataSource.length,
    success: true,
    pageSize: parseInt(`${pageSize}`, 10),
    current: parseInt(`${pageSize}`, 10),
  };

  return res.json(result);
}

function postPhoto(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, fileName, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      photoDataSource = photoDataSource.filter((item) => key.indexOf(item.fileId) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newPhoto: MediaFile = {
          fileId: photoDataSource.length,
          fileType: 'img',
          fileName: `${photoDataSource.length}商品图片商品图片商品`,
          folderId: 0,
          pixelX: 600,
          pixelY: 800,
          fileSize: 100,
          status: 'normal',
          createAt: '2020-09-09',
          modifiedAt: '2020-09-20',
          filePath: [
            'https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg',
            'https://img.alicdn.com/imgextra/i1/2207222472824/O1CN01fVajo31WjR5e6FGbw_!!2207222472824-0-lubanu-s.jpg',
            'https://img.alicdn.com/imgextra/i2/2124152022/TB2vjOjwH5YBuNjSspoXXbeNFXa_!!2124152022-0-item_pic.jpg',
            'https://img.alicdn.com/imgextra/i4/1782090849/O1CN01BgPiqt1I8spY3zokU_!!1782090849.jpg',
            'https://img.alicdn.com/imgextra/i1/2207303687771/O1CN01nFfVaA27HAQF6SjTf_!!2207303687771.jpg',
          ][i % 5],
        };
        photoDataSource.unshift(newPhoto);
        return res.json(newPhoto);
      })();
      return;

    case 'update':
      (() => {
        let newPhoto = {};
        photoDataSource = photoDataSource.map((item) => {
          if (item.fileId === key) {
            newPhoto = { ...item, fileName };
            return { ...item, fileName };
          }
          return item;
        });
        return res.json(newPhoto);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: photoDataSource,
    pagination: {
      total: photoDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/photo': getPhoto,
  'POST /api/photo': postPhoto,
};
