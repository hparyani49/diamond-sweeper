import React from 'react';
import DiceGif from '../../../assets/dice.gif';
import './game.scss';
import { useState } from 'react';
import { useEffect } from 'react';

const Game = (props) => {

    const GAMEROW = 8, GAMECOL = 8, MAX_DIAMONDS = 8;

    //Initial data
    let initialGame = [];
    const [gameState, setGameState] = useState([]);
    const [openCards, setOpenCards] = useState([]);
    const [revealedDiamondCount, setRevealedDiamondCount] = useState(0);
    const [isFinish, setFinish] = useState(false);

    //Utills
    const getPlaceholder = (row, col) => {
        let pos = row+''+col;
        if(openCards.indexOf(pos) != -1){
            if(gameState[row][col]){
                return <div className='board-place'><i className='fa fa-diamond'></i></div>
            }else{
                return <div className='board-place'></div>
            }
        }else{
            return <div className='board-place'><i className='fa fa-question'></i></div>
        }
    }

    const randomNumber = (min, max) => {  
        return Math.round(Math.random() * (max - min) + min); 
    }

    const openCard = (rowIndex, colIndex) => {
        if(isFinish){
            return;
        }
        let newArr = [...openCards];
        newArr.push(rowIndex+''+colIndex);
        setOpenCards(newArr);

        if(gameState[rowIndex][colIndex]){
            if(revealedDiamondCount == 7){
                setFinish(true);
            }else{
                setRevealedDiamondCount(revealedDiamondCount + 1);
            }
        }   
    }

    useEffect(() => {
        let diamondPos = [];
        for(let i = 0; i < MAX_DIAMONDS; i++){
            diamondPos.push(randomNumber(10*i, 10*i+(GAMECOL - 1)));
        }
        for (let i = 0; i < GAMEROW; i++) {
            initialGame[i] = [];
            for (let j = 0; j < GAMECOL; j++) {
                if (diamondPos.indexOf(Number(i+''+j)) != -1) {
                    initialGame[i][j] = true;
                } else {
                    initialGame[i][j] = false;
                }
            }
        }
        setGameState(initialGame)
    }, [])

    return (
        <>
            <div className='game-container'>
                <h2 className='heading'>Diamond Sweeper</h2>
                {isFinish ? <h3 className='green-heading'>You won! Your score is : {(GAMEROW*GAMECOL) - openCards.length}</h3> : null}
                <div className='board'>
                    {gameState.map((row, rowIndex) => {
                        return <div className='row' key={rowIndex+''}>
                            {row.map((col, colIndex) => {
                                return <div className={'col'} key={rowIndex+''+colIndex} onClick={() => openCard(rowIndex, colIndex)}>
                                    {getPlaceholder(rowIndex, colIndex)}
                                </div>
                            })}
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Game;