# React File Uploader

![npm (scoped)](https://img.shields.io/npm/v/@markopapic/file-upload-react) ![David](https://img.shields.io/david/markopapic/file-upload-react) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@markopapic/file-upload-react)

A React component that allows you to upload files to a specified server, with the progress indicator.

## Installation
```
npm install @markopapic/file-upload-react
```

## Usage

```js
import FileUpload from "@markopapic/file-upload-react";

<FileUpload
    requestData={{
        url: "https://your-server.com/upload"
    }}
    onUploaded={response => console.log(response)} />
```

### Configuration

You can configure the behavior of the file uploader by passing the following props:

**allowMultiple** - Specifies if selecting multiple files should be allowed. Default: `false`.

**btnLabel** - Text that will be displayed on the upload button. Default: `"Upload"`.

**disabled** - Specifies if the input should be disabled. Default: `false`.

**inputName** - Name of the input field. This name will be sent to the server. Default: `"file"`.

**onUploaded** - The callback that handles the upload result. The object that gets passed to this callback contains the following fields:
&nbsp;&nbsp;&nbsp; **status** - HTTP status code.
&nbsp;&nbsp;&nbsp; **responseType** - Response type.
&nbsp;&nbsp;&nbsp; **body** - Response body.

**requestData** - Information about the HTTP request that will be used for upload.
&nbsp;&nbsp;&nbsp; **url** - A URL to which the file should be uploaded. This URL should accept HTTP `POST` requests with `multipart/form-data` content type.
&nbsp;&nbsp;&nbsp; **headers** - An object containing HTTP request headers.

**uploadOnSelect** - If set to true, file selection will trigger the upload, instead of having a separate upload button. Default: `false`.

#### Example

```js
<FileUpload
    requestData={{
        url: "https://your-server.com/upload",
        headers: {
            Authorization: "Bearer eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
        }
    }}
    inputName="my-file"
    uploadOnSelect={false}
    disabled={false}
    onUploaded={response => console.log(response)} />
```