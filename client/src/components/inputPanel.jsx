import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import "./inputPanel.css";
import { ImageConfig } from "../config/imageConfig";

const InputPanel = (props) => {
  // References
  const inputRef = useRef(null);
  const calcBtn = useRef(null);
  const wrapperRef = useRef(null);

  // States
  const [fileList, setFileList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState({});
  const [solution, setSolution] = useState({ result: 0, updated: false });

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const mathRegex = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

  const onFileDrop = (e) => {
	  const newFile = e.target.files[0];

    fileRemove(fileList[0]);
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
            const mathProblem = {
              problem: reader.result
            };

            const res = await axios.post('/api/solve-problem', mathProblem)
            .then(response => setSolution({ result: response.data.solution, updated: true }))
            .catch(err => {
              console.error(err);
            });
  
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
    setSolution({ result: 0, updated: false });

    if(updatedList.length == 0)
    {
      calcBtn.current.disabled = true;
    }
  }

  
  const fetchData = () => {
    fetch("/api/results").then(res => {
        if(res.ok) {
            return res.json();
        }
    }).then(
        (jsonRes) => {
            const newState = {
                results: {},
                columns: {
                    'column-1': {
                        id: 'column-1',
                        title: 'Results',
                        resultIds: [],
                    }
                }
            };
            jsonRes.forEach(result => {
                const resultId = result._id.toString();
                newState.results[resultId] = {}
                newState.results[resultId].id = resultId;
                newState.results[resultId].result = result.solution;
                newState.results[resultId].title = result.title;
                newState.results[resultId].filePath = result.filePath;
                newState.columns['column-1'].resultIds.push(resultId);
            });

            props.handler(newState);
        }
    )
  };

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fileList.forEach(async file => {
      formData.append('file', file);
      formData.append('solution', solution.result);

      try {
        const res = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const { fileName, filePath } = res.data;
        setUploadedFile({ fileName, filePath });
        fileRemove(file);
        setSolution({ result: 0, updated: false });
        inputRef.current.value = '';
        fetchData();
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
              ref={inputRef}
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
                      <p>{item.name} - {item.size}B</p>
                      <p>{(solution.updated) ? solution.result : 'Calculating, Please wait'}</p>

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
