import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import "./inputPanel.css";
import { ImageConfig } from "../config/imageConfig";

const InputPanel = (props) => {
  // References
  const calcBtn = useRef(null);
  const wrapperRef = useRef(null);

  // States
  const [fileList, setFileList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState({});
  const [solution, setSolution] = useState({});

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const mathRegex = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

  const onFileDrop = (e) => {
	  const newFile = e.target.files[0];
	  if (newFile && newFile.name.split('.').pop() === "txt") {
		//   const updatedList = [...fileList, newFile];

		//   For single file upload
		  const updatedList = [newFile];
		  setFileList(updatedList);
		  props.onFileChange(updatedList);

      const reader = new FileReader();
      let finalAns = 0;
      reader.readAsText(newFile);
      try {
        reader.onload = async () => {
          if(mathRegex.test(reader.result)){
            const mathProblem = reader.result;
            const res = await axios.post('/api/solve-problem', mathProblem)
            .then(response => setSolution({ result: response.data.solution}))
            .catch(err => {
              console.error(err);
            });
  
            console.log(solution.result);
  
            if(!Number.isNaN(solution.result))
            {
              calcBtn.current.disabled = false;
            }
          }
          else
          {
            console.log("Not a math expression");
          }
        }

      } catch (err) {
        if(err.response.status === 500) {
          console.log('There was a problem with the server.');
        }
        else
        {
          console.log(err.response.data.msg);
        }
      }

      reader.onerror = () => {
        console.log('file error', reader.error);
      }
	  }
  }

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);

    if(updatedList.length == 0)
    {
      calcBtn.current.disabled = true;
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fileList.forEach(async file => {
      file.title = "default";
      formData.append('file', file);

      try {
        const res = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const { fileName, filePath } = res.data;
        setUploadedFile({ fileName, filePath });
      } catch (err) {
        if(err.response.status === 500) {
          console.log('There was a problem with the server.');
        }
        else
        {
          console.log(err.response.data.msg);
        }
      }
    });
  }

  return (
    <React.Fragment>
      <div
        className="input-panel responsive-width"
      >
        <h2 className="responsive-width">Input</h2>

        <div className="container">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="input-element"
              name="calculationTitle"
              placeholder="Calculation Title"
              
              required
            />
            <div
              ref={wrapperRef} 
              className="upload-img-form input-element"
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              >
              <img
                className="upload-file-img"
                src="/cloud-upload-regular-240.png"
                alt=""
              />
              <p className="upload-file-text">
                Drop your calculation text file (.txt) here
              </p>
              <input type="file" accept=".txt" value="" onChange={onFileDrop} />
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
            <button
              ref={calcBtn}
              className="cstm-btn-grn"
              disabled={true}
              type="submit"
              value="upload"
            >
              Calculate
            </button>
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
