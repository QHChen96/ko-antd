import { Request, Response } from 'express';
import { parse } from 'url';
import { CategoryType, CategoryQueryParams } from '@/services/item-category';
import fs from 'fs';

let categoryDataSource: CategoryType[] = JSON.parse(
  fs.readFileSync(`${__dirname}/category.json`).toString(),
) as CategoryType[];

function getCate(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as CategoryQueryParams;

  let dataSource = [...categoryDataSource];
  if (params.parentCategoryId || Number(params.parentCategoryId) === 0) {
    dataSource = dataSource.filter(
      (data) => data.parentCategoryId === Number(params.parentCategoryId),
    );
  }
  if (params.categoryName) {
    dataSource = dataSource.filter((data) => data.categoryName.includes(params.categoryName || ''));
  }
  dataSource = [...dataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize: parseInt(`${pageSize}`, 10),
    current: parseInt(`${current}`, 10),
  };

  return res.json(result);
}

function postCate(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const method = (b && b.method) || req.method;
  const { categoryId, categoryName, parentCategoryId } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      categoryDataSource = categoryDataSource.filter((item) => categoryId !== item.categoryId);
      break;
    case 'POST':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const parent =
          parentCategoryId === 0
            ? { categoryId: 0, categoryName: '顶级分类' }
            : categoryDataSource.find((item) => item.categoryId === parentCategoryId);
        if (!parent) {
          return res.json({ success: false });
        }
        const newCate: CategoryType = {
          categoryId: i,
          categoryName,
          categoryImage: `https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg`,
          sortWeight: i,
          depth: 1,
          parentCategoryId: parent.categoryId,
          parentCategoryName: parent!.categoryName,
          hasChildren: true,
          createdDate: Date.now() - Math.floor(Math.random() * 1000),
          modifiedDate: Date.now() - Math.floor(Math.random() * 1000),
        };
        categoryDataSource.push(newCate);
        return res.json({ data: newCate });
      })();
      return;

    case 'update':
      (() => {
        let newCate = {};
        categoryDataSource = categoryDataSource.map((item) => {
          if (item.categoryId === categoryId) {
            newCate = { ...item, categoryName };
            return { ...item, categoryName };
          }
          return item;
        });
        return res.json(newCate);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: categoryDataSource,
    pagination: {
      total: categoryDataSource.length,
    },
  };

  res.json(result);
}

function getAll(req: Request, res: Response) {
  const result = {
    data: categoryDataSource,
    success: true,
  };
  return res.json(result);
}

export default {
  'GET /api/category': getCate,
  'POST /api/category': postCate,
  'GET /api/category/getAll': getAll,
};
