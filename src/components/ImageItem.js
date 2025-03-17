import React from "react";
//import "../styles.css";
import myImage from '../IMG_0828.jpg';
export default class ImageItem extends React.Component {
  state = { isOpen: false };

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("cliked");
  };

  render() {
    return (
      <div>
        
        
        {this.state.isOpen && (
          <dialog
            className="dialog"
            style={{ position: "absolute" }}
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image"
              src={myImage}
              onClick={this.handleShowDialog}
              alt="no image"
              height="50" width="50" 
            />
          </dialog>
        )}
      </div>
    );
  }
}
