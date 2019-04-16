import React, { PureComponent } from "react";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dictionary: {},
      validation: {},
      training: {}
    };
  }
  render() {
    return (
      <div className="Home">
        <h1>Hello Image Proc!</h1>

        <img src="https://s3.amazonaws.com/imagebrowser.com/training-set/ROCO_CLEF_00000.jpg" />
      </div>
    );
  }
}

export default Home;
