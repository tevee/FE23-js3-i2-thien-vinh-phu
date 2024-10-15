import { FaBomb } from "react-icons/fa";

export default function Cell({cell, onClick, isGameOver}) {

  const displayCellContent = (cell) => {
    const {hasMine, numberOfNeighbouringMines, visible} = cell;
    if(!visible) return '?';
    if(hasMine) return <FaBomb/>;
    else if(numberOfNeighbouringMines === 0) return null;
    else return numberOfNeighbouringMines;
  }

  const displayColoredNumbers = (cell) => {
    const {hasMine, numberOfNeighbouringMines, visible} = cell;
    const classNumberArr = [
      'cell',
      'cell one',
      'cell two',
      'cell three',
      'cell four'
    ];

    if(visible && !hasMine) return classNumberArr[numberOfNeighbouringMines] || 'cell';
    else return 'cell';
  }

  return(
    <button className={displayColoredNumbers(cell)} onClick={() => onClick(cell)} disabled={isGameOver}>{displayCellContent(cell)}</button>
  )
}