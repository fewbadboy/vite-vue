export function downloadFile(fileName, data) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(data, fileName);
  } else {
    const url = window.URL.createObjectURL(new Blob([data], { type: "" }));
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", fileName);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

export function downloadURL(fileName, url) {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", fileName);
  a.click();
}
