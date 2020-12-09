export const downloadFile = (name: string, content: string): void => {
  const event = document.createEvent('MouseEvents');
  event.initEvent('click', true, true);

  const anchor = document.createElement('a');
  anchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  anchor.setAttribute('download', name);
  anchor.dispatchEvent(event);
};
