import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export function prettySize(bytes: number, separator = '', postFix = '') {
  if (bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(
      parseInt((Math.floor(Math.log(bytes) / Math.log(1024)) as unknown) as string, 10),
      sizes.length - 1,
    );
    return `${(bytes / 1024 ** i).toFixed(i ? 2 : 0)}${separator}${sizes[i]}${postFix}`;
  }
  return 'n/a';
}

export const getPageQuery = () => {
  const { href } = window.location;
  const qsIndex = href.indexOf('?');
  const sharpIndex = href.indexOf('#');

  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) {
      return parse(href.split('?')[1]);
    }

    return parse(href.slice(qsIndex + 1, sharpIndex));
  }

  return {};
};

export const charIsNumber = (char?: string) => {
  return !!(char || '').match(/\d/);
};

export const escapeRegExp = (str: string) => {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
};

export const getThousandsGroupRegex = (thousandsGroupStyle: string) => {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g;
    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
};

export const applyThousandSeparator = (
  str: string,
  thousandSeparator: string,
  thousandsGroupStyle: string,
) => {
  const thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  let index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return (
    str.substring(0, index) +
    str.substring(index, str.length).replace(thousandsGroupRegex, `$1${thousandSeparator}`)
  );
};

export const splitDecimal = (numStr: string, allowNegative: boolean = true) => {
  const hasNagation = numStr[0] === '-';
  const addNegation = hasNagation && allowNegative;
  const newNumStr = numStr.replace('-', '');

  const parts = newNumStr.split('.');
  const beforeDecimal = parts[0];
  const afterDecimal = parts[1] || '';

  return {
    beforeDecimal,
    afterDecimal,
    hasNagation,
    addNegation,
  };
};

export const fixLeadingZero = (numStr?: string) => {
  if (!numStr) return numStr;
  let ownNumStr = numStr;
  const isNegative = numStr[0] === '-';
  if (isNegative) ownNumStr = ownNumStr.substring(1, ownNumStr.length);
  const parts = ownNumStr.split('.');
  const beforeDecimal = parts[0].replace(/^0+/, '') || '0';
  const afterDecimal = parts[1] || '';

  return `${isNegative ? '-' : ''}${beforeDecimal}${afterDecimal ? `.${afterDecimal}` : ''}`;
};

export const limitToScale = (numStr: string, scale: number, fixedDecimalScale: boolean) => {
  let str = '';
  const filler = fixedDecimalScale ? '0' : '';
  for (let i = 0; i <= scale - 1; i += 1) {
    str += numStr[i] || filler;
  }
  return str;
};

export const roundToPrecision = (numStr: string, scale: number, fixedDecimalScale: boolean) => {
  const shouldHaveDecimalSeparator = numStr.indexOf('.') !== -1 && scale;
  const { beforeDecimal, afterDecimal, hasNagation } = splitDecimal(numStr);
  const roundedDecimalParts = parseFloat(`0.${afterDecimal || '0'}`)
    .toFixed(scale)
    .split('.');
  const intPart = beforeDecimal
    .split('')
    .reverse()
    .reduce((roundedStr, current, idx) => {
      if (roundedStr.length > idx) {
        return (
          (Number(roundedStr[0]) + Number(current)).toString() +
          roundedStr.substring(1, roundedStr.length)
        );
      }
      return current + roundedStr;
    }, roundedDecimalParts[0]);

  const decimalPart = limitToScale(
    roundedDecimalParts[1] || '',
    Math.min(scale, afterDecimal.length),
    fixedDecimalScale,
  );
  const negation = hasNagation ? '-' : '';
  const decimalSeparator = shouldHaveDecimalSeparator ? '.' : '';
  return `${negation}${intPart}${decimalSeparator}${decimalPart}`;
};

export const omit = (obj: Object, keyMaps: Object) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (!keyMaps[key]) filteredObj[key] = obj[key];
  });
  return filteredObj;
};
