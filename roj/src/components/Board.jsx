import '../App.css';
import React from 'react';
import createBoard from '../utils/utils.js';
import Cell from './Cell.jsx';

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: createBoard(25, 7),
      isGameOver: false,
      isGameWon: false
    }
    console.log(this.state);
    
  }

  componentDidUpdate(prevProps, prevState) {
     if(prevState.board !== this.state.board) {
      console.log(this.state);
      this.isGameWon(this.state.board);
     }
  }

  onClick = (cell) => {
    if(this.state.isGameOver) return;

    this.setState(prevState => {
      const newBoard = [...prevState.board];
      newBoard[cell.index] = {
        ...newBoard[cell.index],
        visible: true
      }

      const currentCell = newBoard[cell.index];
      if(currentCell.visible && currentCell.hasMine) {
        return {
          ...prevState,
          isGameOver: true,
          board: newBoard
        }
      }

      const gameWon = this.isGameWon(newBoard)
      return {
        ...prevState,
        board: newBoard,
        isGameWon: gameWon
      }
    })
  }

  isGameWon = (board) => {
    const nonVisibleCells = board.filter(cell => cell.visible === false);
    console.log(nonVisibleCells);
    
    const cellsHasMine = (cell) => cell.hasMine === true;
    return nonVisibleCells.every(cellsHasMine);
  }

  render() {
    return(
      <div className="boardWrapper">
        <h2>{(this.state.isGameOver && 'Game Over') || (this.state.isGameWon && 'Game Won')}</h2>
        <div className='board'>
          {this.state.board.map(cell => (
            <Cell key={cell.index} cell={cell} onClick={this.onClick} isGameOver={this.state.isGameOver}/>
          ))}
        </div>
      </div>
    )
  }
}