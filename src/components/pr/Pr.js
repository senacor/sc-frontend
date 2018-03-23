import React from 'react';

class Pr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: props.prs
    };
  }
  render() {
    return (
      <div>
        <p>samo whey bajo moj</p>
      </div>
    );
  }
}

export default Pr;
