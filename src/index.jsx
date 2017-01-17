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

    createjs.Tween.get(circle, { loop: true })
      .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
      .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
      .to({ alpha: 0, y: 225 }, 100)
      .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
      .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  render () {
    return <canvas ref="canvas" width="1000" height="600"></canvas>;
  }
}

render(<App/>, document.getElementById('app'));
