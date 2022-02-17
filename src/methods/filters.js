// 加入千分號
export function currency(num) {
  const n = parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

// 轉換時間戳
export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}

// hide partof information string
export function userPhone(phone) {
  const nums = phone.length;
  const startNum = phone.substring(0, 3);
  const endNum = phone.substring(nums - 3, nums);
  const hiddenNums = '*'.repeat(4);

  return `${startNum}${hiddenNums}${endNum}`;
}

export function userEmail(email) {
  const [id, domain] = email.split('@');
  const remains = 2;
  let remainId; let hiddenId;

  if (id.length > remains) {
    remainId = id.substring(0, remains);
    hiddenId = '*'.repeat(id.length - remains);
  } else {
    remainId = id.substring(0, 1);
    hiddenId = '*'.repeat(5);
  }

  return `${remainId}${hiddenId}@${domain}`;
}

export function userName(name) {
  let startWords; let endWords; let hiddenWords;

  if (name.length === 3) {
    startWords = name.substring(0, 1);
    endWords = name.substring(2, 3);
    hiddenWords = '*';
  } else if (name.length === 2 || name.length === 1) {
    startWords = name.substring(0, 1);
    endWords = '';
    hiddenWords = '*';
  } else {
    startWords = name.substring(0, 2);
    endWords = name.substring(name.length - 1, name.length);
    hiddenWords = '*'.repeat(name.length - startWords.length - endWords.length);
  }

  return `${startWords}${hiddenWords}${endWords}`;
}

export function userAddress(address) {
  const remains = 3;
  let remainAddress; let hiddenAddress;

  if ((address.length - remains) > 3) {
    remainAddress = address.substring(0, remains);
    hiddenAddress = '*'.repeat(address.length - 3);
  } else {
    remainAddress = address.substring(0, remains - 1);
    hiddenAddress = '*'.repeat(address.length);
  }

  return `${remainAddress}${hiddenAddress}`;
}
