- 每一个组件都至少有一个带有return的render
- 一个重要原则
当想从子组件收集数据或者想在两个子组件间进行数据交换,最好的办法就是把状态移动到父组件中,
然后将需要的状态从父组件中通过**props**传递到子组件中,这样能保证子组件中的信息始终保持和父组件以及其他子组件的同步.

- fill()函数
Array(9).fill(null);

- Board组件存储了所有squares的状态信息,需要有让Square更新Board组件的状态的方法,因为组件的状态是组件私有的,因此,Board组件的状态不能直接由Square来更新.这种情况通常是从父组件向子组件传递一个函数

  ````
    renderSquare(i) {
  return (
    <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
      />
    );
  }
  //board组件向square组件中传递两个参数,value和onClick. onClick是一个Square组件可以调用的函数,当square点击时,就会调用从Board中传递的函数.
  ````
- this.setState({squares: squares});
- `const squares = this.state.squares.slice();` 这行代码是复制一个squares出来
- 上述的这种子组件被称为**controlled components**
- 只包含render方法的组件可以使用一种语法:**functional components**
- 判断该是x还是o的方法,好简单!

  ````
    handleClick(i){
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  ````

- 判断输赢的这个算法也好厉害!!!
  ````
    function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  ````
  - Array.prototype.concat()
   concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

  - 关于[key](https://reactjs.org/tutorial/tutorial.html#keys)的描述
  **当创建动态列表时,要手动给每条list赋予一个合适的key**
  组件的list的key值不需要全局唯一,只要相对于它的兄弟list唯一即可