import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';


class EachStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const file = `../../${this.props.eachStudent.url}`;
    console.log(file);
    return (
      <div>
        <div className="backButton">
          <h2 onClick={this.props.goBack}>Click Here To Go Back</h2>
        </div>
        <div className="pdf">
          <Document file={file}>
            <Page width={this.state.width - 50} pageNumber={1} />
          </Document>
        </div>
      </div>
    );
  }
}

export default EachStudent;
