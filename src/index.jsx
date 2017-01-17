import React from 'react';
// import {render, ReactDOM} from 'react-dom';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render () {
    return (<div>
      <p> Hello React!</p>
      <Canvas />
    </div>);
  }
}

class Canvas extends React.Component {
  constructor (){
    super();
  }

  componentDidMount(){
   const canvas = ReactDOM.findDOMNode(this.refs.canvas);
   this.stage = new createjs.Stage(canvas);
   const circle = new createjs.Shape();
   circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
   circle.x = 100;
   circle.y = 100;
   this.stage.addChild(circle);
   this.stage.update();
  }

  render () {
    return <canvas ref="canvas"></canvas>;
  }
}

render(<App/>, document.getElementById('app'));
