export const openNewWidowWithHTML = (html: string) => {
  const anchor = document.createElement('a');
  anchor.href = window.URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  anchor.target = '_blank';
  anchor.click();
};

export const downloadFile = (url: string) => {
  let eleLink = document.createElement('a');
  eleLink.target = '_blank';
  eleLink.style.display = 'none';
  eleLink.href = process.env.REACT_APP_BASE_API + url;
  // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
  document.body.appendChild(eleLink);
  // 触发点击
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};
