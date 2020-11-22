import React, { useState, useRef } from "react";

/**
 * @typedef {Object} RequestData
 * @property {string} url - A URL to which the file should be uploaded.
 * @property {Object} headers - An object containing HTTP request headers.
 */

/**
 * @typedef {Object} UploadResult
 * @property {number} status - HTTP status code.
 * @property {string} responseType - Response type.
 * @property {string} body - Response body.
 */

/**
* The callback that handles the upload result.
* @callback uploadedCallback
* @param {UploadResult} result - Upload result.
*/

const states = {
    IDLE: 0,
    BUSY: 1
}

const defaultInputName = "file";
const defaultBtnLabel = "Upload";

/**
 * 
 * @param {RequestData} requestData - Information about the HTTP request that will be used to upload the file.
 * @param {string} [inputName="file"] - Name of the input field. This name will be sent to the server.
 * @param {string} [btnLabel="Upload"] - Text that will be displayed on the upload button.
 * @param {Boolean} [allowMultiple=false] - Specifies if selecting multiple files should be allowed.
 * @param {Boolean} [uploadOnSelect=false] - If set to true, file selection will trigger the upload, instead of having a separate upload button.
 * @param {Boolean} [disabled=false] - Specifies if the input should be disabled.
 * @param {uploadedCallback} onUploaded - The callback that handles the upload result.
 */
export default function FuleUpload({ requestData, inputName, btnLabel, allowMultiple, uploadOnSelect, disabled, onUploaded }) {
    const [state, setState] = useState(states.IDLE);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const fileInputRef = useRef(null);

    function handleChange(e) {
        if (uploadOnSelect)
            submit();
    }

    function sendRequest() {
        return new Promise(resolve => {
            const files = fileInputRef.current.files;
            const formData = new FormData();
            for (let i = 0; i < files.length; i++)
                formData.append(inputName || defaultInputName, files[i]);
            const request = new XMLHttpRequest();
            request.open("POST", requestData.url);
            if (requestData.headers) {
                for (let header in requestData.headers)
                    request.setRequestHeader(header, requestData.headers[header]);
            }
            request.upload.onprogress = p => setProgress({ current: p.loaded, total: p.total });
            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    return resolve({
                        status: request.status,
                        responseType: request.responseType,
                        body: request.responseText
                    });
                }
            };
            request.send(formData);
        });
    }

    async function submit() {
        setProgress({ current: 0, total: 0 });
        setState(states.BUSY);
        const response = await sendRequest();
        setState(states.IDLE);
        onUploaded(response);
    }

    return (
        <div>
            <input
                ref={fileInputRef}
                type="file"
                name={inputName || defaultInputName}
                multiple={!!allowMultiple}
                onChange={handleChange}
                disabled={state === states.BUSY || disabled} />
            {uploadOnSelect ||
                <button
                    type="button"
                    disabled={state === states.BUSY || disabled}
                    onClick={submit}>{btnLabel || defaultBtnLabel}</button>
            }
            <div>
                {state === states.BUSY && <progress value={progress.current} max={progress.total}>{progress.current / progress.total * 100}%</progress>}
            </div>
        </div>
    );
}