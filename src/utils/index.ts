export const openNewWidowWithHTML = (html: string) => {
  const anchor = document.createElement('a');
  anchor.href = window.URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  anchor.target = '_blank';
  anchor.click();
};
