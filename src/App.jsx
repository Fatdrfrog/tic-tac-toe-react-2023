import { useState, setState } from "react";
import MainLayout from "./layouts/MainLayout";
import Grid from "./components/Grid";

function App() {
  const gridFromLocalStorage = JSON.parse(localStorage.getItem("grid"));
  const emptyGrid = [
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
    { id: 5, text: "" },
    { id: 6, text: "" },
    { id: 7, text: "" },
    { id: 8, text: "" },
    { id: 9, text: "" },
  ];
  const [grid, setGrid] = useState(emptyGrid);
  const [user, setUser] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [options, setOptions] = useState(false);

  function handlePlay(elementID) {
    if(gameEnded){
      return;
    }
    //NO NO push splice pop shift unshift
    //OK map forEach slice  filter find some
    const newGrid = grid.map((item) => {
      if (item.id === elementID && !item.text) {
        setUser(!user);
        return { ...item, text: user ? "X" : "O" };
      } else return item;
    });
    setGrid(newGrid);
    localStorage.setItem("grid", JSON.stringify(newGrid));
  }

  const checkWinner = () => {
    // check if vertical
    for(let i = 0; i < 3; i++) {
      if(grid[i].text != "" && grid[i].text === grid[i+3].text && grid[i].text === grid[i+6].text) {
        if(!gameEnded)
          setGameEnded(true);
        return grid[i].text;
      }
    }
    // check if horizontal
    for(let i = 0; i < 9; i+=3) {
      if(grid[i].text != "" && grid[i].text === grid[i+1].text && grid[i].text === grid[i+2].text) {
        if(!gameEnded)
          setGameEnded(true);
        return grid[i].text;
      }
    }
    // check if diagonal
    if(grid[0].text != "" && grid[0].text === grid[4].text && grid[0].text === grid[8].text){
      if(!gameEnded)
          setGameEnded(true);
      return grid[0].text;
    }

    if(grid[2].text != "" && grid[2].text === grid[4].text && grid[2].text === grid[6].text){
      if(!gameEnded)
          setGameEnded(true);
      return grid[2].text;
    }

    if(grid.filter((item) => item.text != "").length === 9 && !gameEnded){
      setGameEnded(true);
      return "Nobody";
    }

    return null;
  };

  if(options){
    return (
      <MainLayout>
        <div className="flex flex-col w-full justify-center items-center">
          <button onClick={() => {setDarkTheme(!darkTheme)}}>{darkTheme ? "Make it white" : "Make it black"}</button>
          <button onClick={() => {setOptions(false)}}>Exit</button>
        </div>
      </MainLayout>
    );
  }

  if(!gameStarted){
    return (
      <MainLayout>
        <div className="flex flex-col w-full justify-center items-center">
          <button onClick={() => {setGameStarted(true); setGrid(emptyGrid)}}>Start Game</button>
          {gridFromLocalStorage != null ? <button onClick={() => {setGameStarted(true); setGrid(gridFromLocalStorage)}}>Resume Game</button> : "" }
          <button onClick={() => {setOptions(true)}}>Options</button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Grid grid={grid} handlePlay={handlePlay} darkTheme={darkTheme} />
      <div className="flex w-full justify-center items-center">{checkWinner() != null ? "Winner is " + checkWinner() : ""}</div>
      {gameEnded ? <div onClick={() => {setGameEnded(false); setGameStarted(false); setGrid(emptyGrid); localStorage.removeItem("grid")}} className="flex w-full justify-center items-center">Go to menu</div> : ""}
    </MainLayout>
  );
}

export default App;
