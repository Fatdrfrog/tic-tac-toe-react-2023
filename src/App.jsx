import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Zagruzka from "./components/Zagruzka";
import Grid from "./components/Grid";
import Winner from "./components/Winner";

function App() {
  const [grid, setGrid] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
    { id: 5, text: "" },
    { id: 6, text: "" },
    { id: 7, text: "" },
    { id: 8, text: "" },
    { id: 9, text: "" },
  ]);
  const [user, setUser] = useState(true);
  const [winnerName, setWinnerName] = useState('');

  function handlePlay(elementID) {
    //NO NO push splice pop shift unshift
    //OK map forEach slice  filter find some
    const newGrid = grid.map((item) => {
      if (item.id === elementID && !item.text) {
        return { ...item, text: user ? "X" : "O" };
      } else return item;
    });
    setUser(!user);
    setGrid(newGrid);
    const winner = checkWinner(newGrid);
    setWinnerName(winner);
  }


  function checkWinner(grid) {
    // массив всех возможных выигрышных комбинаций
    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
  
    // проверяем каждую выигрышную комбинацию
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      const elementA = grid.find((element) => element.id === a);
      const elementB = grid.find((element) => element.id === b);
      const elementC = grid.find((element) => element.id === c);
  
      // если все три ячейки в комбинации имеют одинаковый текст (и он не пуст), то это победная комбинация
      if (
        elementA.text &&
        elementA.text === elementB.text &&
        elementA.text === elementC.text
      ) {
        return elementA.text; // есть победитель
      }
    }
  
    return ''; // победителя нет
  }
  

  if (winnerName) {
    return (
      <MainLayout>
        <Winner winnerName = {winnerName}/>
      </MainLayout>
      
    );
  }

  return (
    <MainLayout>
      <Grid grid={grid} handlePlay={handlePlay} />
    </MainLayout>
  );
}

export default App;
