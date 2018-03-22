import React from 'react';

class Pr extends React.Component {
  render() {
    let individualUrl = this.props.location.pathname;
    return (
      <div>
        <h2>{`Individual PR with the url : ${individualUrl}`} </h2>
        <p>samo whey bajo moj</p>
      </div>
    );
  }
}

export default Pr;
