import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




function Square(props){//在functional component中,props要作为参数传入函数
  return (
    <button className="square" onClick={props.onClick}>{props.value}</button>//注意此处函数传递的写法!!!此处执行的props.onClick是已经赋了i值的handleClick()函数
  );//注意!上述props.onClick不能带有括号,带括号会立即调用
}

// 判断输赢
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}


class Board extends React.Component {
  // 传入一个squares数组,在渲染时再具体赋值
  renderSquare(i) {
  return (
    <Square 
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}//注意此处函数传递的写法!!!
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);//slice返回的数组不包含第二个参数,所以此处用了+1,此处定义history使用了const,在整个handleClick函数中都不会再发生变化
    const current = history[history.length - 1];//注意!此处的current是history[history.length - 1]
    const squares = current.squares.slice();//复制了当前的square

    if(calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,//此处的history是未增加前的,history.length刚好是增加了一个{squares: squares}的数量
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,//若想改变app的状态只需在条件满足的地方重新给状态赋值
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];//此处的current是history[this.state.stepNumber]
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {//step对应history中单个的{square: square}, move对应这个对象的index值
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if(winner){
      status = 'Winner: ' + winner;
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // 注意下面的<ol>{moves}</ol>,列表会自动根据数组项展开
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}//注意此处函数传递的写法!!!
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
