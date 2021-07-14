import React, { Component } from "react";
import "./App.css";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/Updatecontent";
import Subject from "./components/Subject";
import Control from "./components/Control";

class App extends Component {
  constructor(props) {
    // 컴포넌트가 실행될때 얘가 실행되서 초기화 담당한다.
    super(props);
    this.max_content_id = 3;
    this.state = {
      // 내부적인 상태는 state로 사용.
      mode: "welcome",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web !" },
      welcome: { title: "Welcome", desc: "Hello, React !!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is HyperText ..." },
        { id: 2, title: "CSS", desc: "CSS is for design ..." },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive ... " },
      ],
    };
  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }
  getContent() {
    // 모드의 값에 따라서 만들어지는 컴포넌트를 바꿔주게
    var _title,
      _desc,
      _article = null;

    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            // add content to this.state.contents
            this.max_content_id = this.max_content_id + 1;

            var _contents = Array.from(this.state.contents);
            _contents.push({ id: this.max_content_id, title: _title, desc: _desc });

            // var _contents = this.state.contents.concat({
            //   id: this.max_content_id,
            //   title: _title,
            //   desc: _desc,
            // });

            // var newContents = Array.from(this.state.contents);
            // newContents.push({
            //   id: this.max_content_id,
            //   title: _title,
            //   desc: _desc,
            // });

            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            });

            console.log(_title, _desc);
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents); // 새로운 배열.

            //컨텐츠 원소 하나하나를 뒤져서 id값이 우리가 수정하고자 하는 값과 같은 원소 찾는다.
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }

              i = i + 1;
            }

            this.setState({
              contents: _contents,
              mode: "read",
            });

            console.log(_title, _desc);
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }
  render() {
    console.log("App render");
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            // 이벤트를 우리가 만들었다 !, 그리고 함수 설치 !
            this.setState({
              mode: "welcome",
            });
          }.bind(this)}
        ></Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("really ?")) {
                // confirm : true, cancle : false
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1); // splice(~, !) : ~ 부터 ! 까지 지운다.
                    break;
                  }

                  i = i + 1;
                }
                this.setState({
                  contents: _contents,
                  mode: "welcome",
                });
                alert("delete successfully");
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
