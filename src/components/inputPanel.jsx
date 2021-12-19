import React, { Component } from 'react';

class InputPanel extends React.Component {
    render() { 
        return (
        <div className="input-panel responsive-width">
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
                  src="data:image/png;base64,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"
                  alt=""
                />
                <p className="upload-file-text">
                  Drop your calculation text file here
                </p>
              </div>

              <button className="cstm-btn grn">Calculate</button>
            </form>
          </div>
        </div>
        );
    }
}
 
export default InputPanel;