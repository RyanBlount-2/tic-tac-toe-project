// Board Component.
let Board = () => {
   // This line uses destructuring. useState() is a function of React. This eliminates the need to write react before each useState().
   let {useState} = React;

   let [player, setPlayer] = useState(0);
   let [squares, setSquares] = useState(Array(9).fill(null));
   let [mark, setMark] = useState('X');
   let [color, setColor] = useState('blue');
   let [status, setStatus] = useState(`Player ${player}'s Turn`);


   console.log('Checking State');
   let winner = checkWinner(player, squares);
   function checkWinner(player, squares) {
      let win = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6]
      ]
      for (let i = 0; i < win.length; i++) {
         let [a, b, c] = win[i];
         // if (squares[a] == squares[b] && squares[a] == squares[c] && squares[a])
         // return squares[a];
         if (squares[a] == player && squares[b] == player && squares[c] == player) {
            return player;
         }
      }
      return null;
   }

   if (winner != null) {
      status = `Player ${winner} is the winner!`;
   }
   console.log(status);
   console.log(player);
   console.log(mark);
   console.log(color);


   let updatePlayer = (player) => {
      let nextPlayer = (player + 1) % 2;
      return nextPlayer;
   }

   let updateSquares = (player, id) => {
      squares[id] = player;
      return squares;
   }

   let updateMark = (player) => {
      if (player == 0) {
         return 'X';
      }
      else {
         return 'O';
      }
   }

   let updateColor = (player) => {
      let palet = ['blue', 'red'];
      if (player == 0) {
         return palet[0];
      }
      else {
         return palet[1];
      }
   };

   function renderSquare(i) {
      return <Square id={i} color={color} updateColor={updateColor} setColor={setColor} status={status} setStatus={setStatus} setSquares={setSquares} updateSquares={updateSquares} setMark={setMark} updateMark={updateMark} player={player} setPlayer={setPlayer} updatePlayer={updatePlayer} setMark={setMark} squares={squares}></Square>;
   }

   return (
      <div className="game-board">
         <div className="grid-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
         </div>
         <div className="grid-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
         </div>
         <div className="grid-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
         </div>
         <div id="info">
            <h1>{status}</h1>
         </div>
      </div>
   );
};

// Square Component.
let Square = ({player, id, updatePlayer, setPlayer, updateSquares, setSquares, updateMark, setMark, updateColor, setColor, setStatus}) => {

   return (
      <button
         onClick={(e) => {
            let nextPlayer = updatePlayer(player);
            setPlayer(nextPlayer);
            let nextSquares = updateSquares(nextPlayer, id);
            setSquares(nextSquares);
            let nextMark = updateMark(nextPlayer);
            setMark(nextMark);
            let nextColor = updateColor(nextPlayer);
            setColor(nextColor);
            setStatus(`Player ${nextPlayer}'s Turn`);
            e.target.innerHTML = nextMark;
            e.target.style.background = nextColor;
         }}
      >
      </button>
   );
};

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Board/>);
