import isBlob from './isBlob';



const MSSave = 'msSaveBlob' in navigator;



export function fileSavingSupported() {
  return 'Blob' in window && (MSSave || 'download' in HTMLAnchorElement.prototype);
}



/**
 * Download a given content as a file.
 * (if the browser doesn't support file downloads, this method does nothing)
 * 
 * @param content - The content to download
 * @param name - The name to give the downloaded file
 * @param type - The type affiliated with the file
 */
export default function saveFile(
  content: Blob | string,
  name: string,
  type = 'text/plain; charset=utf-8'
): void {
  if (!fileSavingSupported()) { return; }

  if (!isBlob(content)) {
    content = new Blob([`${content}`], { type });
  }

  if (MSSave) {
    navigator.msSaveBlob(content);
  } else {
    const a = document.createElement('a');
    a.download = name;
    a.target = '_blank';
    a.href = URL.createObjectURL(content);
    a.click();
  }
}
