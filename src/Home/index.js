import React, { PureComponent } from "react";

class Home extends PureComponent {
  render() {
    return <div className="Home">Hello Image Proc!
      <img src="https://s3.amazonaws.com/imagebrowser.com/training-set/ROCO_CLEF_00000.jpg" />
    </div>;
  }
}

export default Home;