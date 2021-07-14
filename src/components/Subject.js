import React, { Component } from "react";

class Subject extends Component {
  render() {
    console.log("Subject render");
    // 이것도 함수다.
    return (
      <header>
        <h1>
          <a
            href="/"
            onClick={function (e) {
              // App.js의 onChangePage 함수가 props로 전달되어서 ,,
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;
