import { isUrl } from '../utils/utils';

const menuData = [{
  name: '我的账户',
  path: 'personal/zh',
  children: [{
    name: '你的账户',
    path: 'aa',
  }, {
    name: '他的账户',
    path: 'aaa',
  }],
}, {
  name: '(*@ο@*)～',
  path: 'personal/ha',
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
