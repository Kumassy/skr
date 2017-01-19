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
    this.dx = 2;
    this.dy = 1;
    this.isJumping = false;
    this.walls = [];

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
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

    // createjs.Tween.get(circle, { loop: true })
    //   .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
    //   .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
    //   .to({ alpha: 0, y: 225 }, 100)
    //   .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
    //   .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
    // createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", this.stage);


    const wall = new createjs.Shape();
    wall.graphics.beginFill("Green").drawRect(0, 464, 800, 10);
    // wall.graphics.beginFill("Green").drawRect(0, 0, 800, 10);
    // wall.x = 0;
    // wall.y = 464;
    wall.setBounds(0, 464, 800, 10);
    this.stage.addChild(wall);
    this.stage.update();
    this.walls.push(wall);

    const wall2 = new createjs.Shape();
    wall2.graphics.beginFill("Green").drawRect(400, 380, 200, 10);
    // wall2.graphics.beginFill("Green").drawRect(0, 0, 400, 10);
    // wall.x = 400;
    // wall.y = 380;
    wall.setBounds(400, 380, 200, 10);
    this.stage.addChild(wall2);
    this.stage.update();
    this.walls.push(wall2);


    const player = new createjs.Bitmap("img/kumassy.jpg");
    this.stage.addChild(player);
    player.y = 400;
    this.player = player;


    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', () => {
        player.x += this.dx;
        player.y += this.dy;

        // colision detection
        for(let wall of this.walls){
          const wallRect = wall.getTransformedBounds();
          // const wallRect = wall;
          const playerRect = this.player.getTransformedBounds();

          // console.log(wallRect);
          // console.log(playerRect);
          // playerRect.x;


          if(wallRect && playerRect && wallRect.x - playerRect.width <= playerRect.x && playerRect.x <= (wallRect.x + wallRect.width) && wallRect.y - playerRect.height <= playerRect.y && playerRect.y <= (wallRect.y + wallRect.height)){
              console.log("hit");

          }


        }
        this.stage.update();
    });


  }

  componentWillMount (){
    // window.addEventListener('keydown', this._handleKeyDown);
    // window.addEventListener('keyup', this._handleKeyDown);
    // window.addEventListener('keypress', this._handleKeyDown);
    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('keyup', this._handleKeyUp);
    // document.addEventListener('keypress', this._handleKeyDown);
  }

  _handleKeyUp (event) {
    this.dx = this.dy = 0;
  }

  _handleKeyDown (event) {
    if(event.code === "ArrowLeft"){
      this.dx = -2;
    }
    else if(event.code === "ArrowRight"){
      this.dx = 2;
    }
    else if(event.code === "ArrowUp"){
      this.dy = -2;
    }
    else if(event.code === "ArrowDown"){
      this.dy = 2;
    }
    else if(event.code === "Space"){
      if(this.isJumping) return;
      this.isJumping = true;

      const y = this.player.y;
      const jump = 100;

      createjs.Tween.get(this.player)
        .to({y: y - jump}, 300, createjs.Ease.cubicOut)
        .to({y: y}, 300, createjs.Ease.cubicIn)
        .call(() => {
          this.isJumping = false;
        });

    }
    // console.log(event);
  }

  render () {
    return (
      <canvas ref="canvas" width="1000" height="600"></canvas>
    );
  }
}

render(<App/>, document.getElementById('app'));
