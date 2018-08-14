import isBlob from './isBlob';



const MSSave = 'msSaveBlob' in navigator;



export function fileSavingSupported() {
  return 'Blob' in window && (MSSave || 'download' in HTMLAnchorElement.prototype);
}



export default function saveFile(content, name, type) {
  if(!fileSavingSupported()) { return; }

  if(!isBlob(content)) {
    type = type || 'text/plain; charset=utf-8';
    content = new Blob([`${content}`], { type });
  }

  if(MSSave) {
    navigator.msSaveBlob(content);
  } else {
    const a = document.createElement('a');
    a.download = true;
    a.href = URL.createObjectURL(content);
    a.click();
  }
}
