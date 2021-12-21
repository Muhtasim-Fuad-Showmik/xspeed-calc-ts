import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import "./inputPanel.css";
import { ImageConfig } from "../config/imageConfig";

const InputPanel = (props) => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');
  
  const onFileDrop = (e) => {
	  const newFile = e.target.files[0];
	  if (newFile) {
		  const updatedList = [...fileList, newFile];
		  setFileList(updatedList);
		  props.onFileChange(updatedList);
	  }
  }

  const fileRemove = (file) => {
	const updatedList = [...fileList];
	updatedList.splice(fileList.indexOf(file), 1);
	setFileList(updatedList);
	props.onFileChange(updatedList);
  }

  return (
    <React.Fragment>
      <div
        ref={wrapperRef}
        className="input-panel responsive-width"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <h2 className="responsive-width">Input</h2>

        <div className="container">
          <form action="/">
            <input
              type="text"
              className="input-element"
              name="calculationTitle"
              placeholder="Calculation Title"
              required
            />
            <div className="upload-img-form input-element">
              <img
                className="upload-file-img"
                src="/cloud-upload-regular-240.png"
                alt=""
              />
              <p className="upload-file-text">
                Drop your calculation text file here
              </p>
              <input type="file" value="" onChange={onFileDrop} />
            </div>

            {fileList.length > 0 ? (
              <div className="drop-file-preview">
                <p className="drop-file-preview__title">Ready to upload</p>
                {fileList.map((item, index) => (
                  <div key={index} className="drop-file-preview__item">
                    <img
                      src={
                        ImageConfig[item.type.split("/")[1]] ||
                        ImageConfig["default"]
                      }
                      alt=""
                    />
                    <div className="drop-file-preview__item__info">
                      <p>{item.name}</p>
                      <p>{item.size}B</p>
                    </div>
                    <span
                      className="drop-file-preview__item__del"
                      onClick={() => fileRemove(item)}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
            <button className="cstm-btn grn">Calculate</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

InputPanel.propTypes = {
	onFileChange: PropTypes.func
}

export default InputPanel;
