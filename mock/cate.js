// const fs = require('fs');

// const categorys = [];
// fs.readFile('/Users/chenqinhao/Dev/ko/ko-antd/mock/cate.json', 'utf-8', (error, result) => {
//   if (error) {
//     return console.log(error);
//   }
//   const list = JSON.parse(result).data;
//   list.forEach((item) => {
//     const { main, sub } = item;
//     categorys.push({
//       categoryName: main.name,
//       categoryId: +main.catid,
//       displayName: main.display_name,
//       parentCategoryId: +main.parent_category,
//       sortWeight: main.sort_weight,
//       depth: 1,
//       hasChildren: !!sub && sub.length > 0,
//       createdDate: Date.now() - Math.floor(Math.random() * 1000),
//       modifiedDate: Date.now() - Math.floor(Math.random() * 1000),
//     });
//     if (sub) {
//       sub.forEach((subItem) => {
//         const { sub_sub } = subItem;
//         categorys.push({
//           categoryName: subItem.name,
//           categoryId: +subItem.catid,
//           displayName: subItem.display_name,
//           parentCategoryId: +subItem.parent_category,
//           sortWeight: subItem.sort_weight,
//           depth: 2,
//           hasChildren: !!sub_sub && sub_sub.length > 0,
//           createdDate: Date.now() - Math.floor(Math.random() * 1000),
//           modifiedDate: Date.now() - Math.floor(Math.random() * 1000),
//         });
//         if (sub_sub) {
//           sub_sub.forEach((subSubItem) => {
//             categorys.push({
//               categoryName: subSubItem.display_name,
//               categoryId: +subSubItem.catid,
//               displayName: subSubItem.display_name,
//               parentCategoryId: +subItem.catid,
//               sortWeight: subItem.sort_weight,
//               depth: 3,
//               hasChildren: false,
//               createdDate: Date.now() - Math.floor(Math.random() * 1000),
//               modifiedDate: Date.now() - Math.floor(Math.random() * 1000),
//             });
//           });
//         }
//       });
//     }
//   });
//   fs.writeFile('/Users/chenqinhao/Dev/ko/ko-antd/mock/category.json', JSON.stringify(categorys), err => {
//     if (err) throw err;
//     console.log('成功了');
//   });
// });
