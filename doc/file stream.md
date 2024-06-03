# File Stream

## Blob

```js
// type MIME Type https://www.iana.org/assignments/media-types/media-types.xhtml
new Blob(array, { type: '', endings })
```

- arrayBuffer()
- slice()
- stream()
- text()

## File

`<input>` 元素选择文件后返回的 FileList 对象，或者拖拽生成的 DataTransfer 对象

## FileList

`<input>` 元素选择文件后返回的 FileList 对象，或者拖拽生成的 DataTransfer 对象

- item()

## FileReader

```js
document.querySelector("input[type=file]").files[0]
```

- readAsArrayBuffer(blob)
- readAsDataURL(blob)
- readAsText(blob[, encoding])
