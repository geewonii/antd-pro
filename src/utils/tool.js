import forge from 'node-forge';

// const forge = require('node-forge');

// ISO 8601 转化固定格式时间
export function dateChangeStandard(str) {
  const date = str;
  if (date) return date.substring(0, 16).replace(/T/, ' ');
}

export function urlByAppendingParams(url, params) {
  let result = url;
  if (result.substr(result.length - 1) !== '?') {
    result = `${result}?`;
  }

  for (const key in params) {
    if ({}.hasOwnProperty.call(params, key)) {
      const value = params[key];
      result += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
    }
  }

  result = result.substring(0, result.length - 1);
  return result;
}

// GET时不支持传递body，调用时 p = null
export function getFetchOptions(method, p) {
  if (method === 'GET') {
    return {
      credentials: 'include',
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  } else {
    return {
      credentials: 'include',
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(p),
    };
  }
}

// 获取MD5
export function getMD5(value) {
  const md = forge.md.md5.create();
  md.update(value);
  const ret = md.digest().toHex();
  return ret;
}

// 获取AES-CBC加密串
export function getAESEncrypt(value) {
  // generate a random key and IV
  // Note: a key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256
  // 这两个值，可以考虑从后台传过来
  const key = 'GuangZhouLance90';
  const iv = 'TincleBell875333';
  // encrypt some bytes using CBC mode
  // (other modes include: ECB, CFB, OFB, CTR, and GCM)
  // Note: CBC and ECB modes use PKCS#7 padding as default
  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv });
  const s = forge.util.encodeUtf8(value);
  cipher.update(forge.util.createBuffer(s));
  cipher.finish();
  const encrypted = cipher.output;
  // outputs encrypted hex
  // console.log(encrypted.toHex())
  return encrypted.toHex();
}

// 获取AES-CBC解密串
export function getAESDecrypt(value) {
  // decrypt some bytes using CBC mode
  // (other modes include: CFB, OFB, CTR, and GCM)
  const key = 'GuangZhouLance90';
  const iv = 'TincleBell875333';
  const decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({ iv });
  try {
    const bytes = forge.util.hexToBytes(value);
    const encrypted = forge.util.createBuffer(bytes);
    decipher.update(encrypted);
    const result = decipher.finish(); // check 'result' for true/false
    // outputs decrypted hex
    if (result) {
      // console.log('decrypt result: ' + decipher.output.data)
      const encoded = decipher.output.data;
      return forge.util.decodeUtf8(encoded); // 需要转化，否则中文乱码
    } else {
      return '';
    }
  } catch (e) {
    return '';
  }
}

// 不是真正的guid，只是多个随机数组合。separator 分隔符，是'-'或空
export function createGuid(separator) {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    separator +
    s4() +
    separator +
    s4() +
    separator +
    s4() +
    separator +
    s4() +
    s4() +
    s4()
  );
}

// 版本比较，如果ver1 > ver2，返回true
export function versionCompare(ver1, ver2) {
  const version1pre = parseFloat(ver1);
  const version2pre = parseFloat(ver2);
  // const version1next = ver1.replace(`${version1pre}.`, '');
  // const version2next = ver2.replace(`${version2pre}.`, '');

  if (version1pre > version2pre) {
    return true;
  } else if (version1pre < version2pre) {
    return false;
  } else {
    // if (version1next >= version2next) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}
