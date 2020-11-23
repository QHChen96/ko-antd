import { Request, Response } from 'express';
import { parse } from 'url';
import { AttributeType, AttributeQueryParams, AttributeEdit } from '@/services/attribute';
import fs from 'fs';

let attributeDataSource: AttributeType[] = JSON.parse(
  fs.readFileSync(`${__dirname}/attribute.json`).toString(),
) as AttributeType[];

function getList(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const result = {
    data: attributeDataSource,
    success: true,
  };
  return res.json(result);
}

function get(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as AttributeQueryParams;

  let dataSource = [...attributeDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  if (params.attributeName) {
    dataSource = dataSource.filter((data) => data.attributeName === params.attributeName);
  }

  const result = {
    data: dataSource,
    total: attributeDataSource.length,
    success: true,
    pageSize: parseInt(`${pageSize}`, 10),
    current: parseInt(`${current}`, 10),
  };

  return res.json(result);
}

function post(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const body = (b && b.body) || req.body;
  const method = (b && b.method) || req.method;
  const { attributeId } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      attributeDataSource = attributeDataSource.filter((item) => attributeId !== item.attributeId);
      break;
    case 'POST':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newData: AttributeType = {
          ...(body as AttributeEdit),
          attributeId: i,
          status: 'NORMAL',
          createdDate: Date.now() - Math.floor(Math.random() * 1000),
          modifiedDate: Date.now() - Math.floor(Math.random() * 1000),
        };
        attributeDataSource.push(newData);
        return res.json({ data: newData });
      })();
      return;
    default:
      break;
  }

  const result = {
    list: attributeDataSource,
    pagination: {
      total: attributeDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/item/attribute': get,
  'POST /api/item/attribute': post,
  'GET /api/category/attributes': getList,
};
