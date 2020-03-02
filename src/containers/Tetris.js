import React, { useState } from 'react'

import './Tetris.css'
import {createStage,checkCollision} from '../gameHelper'
import {StyledTetrisWrapper,StyledTetris} from './StyledTetris'
import Stage from '../components/stage/Stage'
import StartButton from '../components/startbutton/StartButton'
import Display from '../components/display/Display'
//custom hooks
import {usePlayer} from '../hooks/usePlayer';
import {useStage} from '../hooks/useStage';




export default function Tetris () {

     const [dropTime,setDropTime] = useState(null);
     const [gameOver,setGameOver] = useState(false);

     const [player,updatePlayerPos,resetPlayer] = usePlayer();
     const [stage,setStage] = useStage(player);



      console.log('re-render');

      const movePlayer = dir=>{
        if(!checkCollision(player,stage,{x:dir,y:0})){
            updatePlayerPos({x:dir,y:0});
        }
      

      }
       
      const startGame =() =>{
          //Reset everything
          setStage(createStage());
          resetPlayer();
          setGameOver(false);
      }
      const drop = ()=>{
        if(!checkCollision(player,stage,{x:0,y:1})){
            updatePlayerPos({x:0,y:1,collided:false})
        }
        else{
            if(player.pos.y<1){
                console.log('Game over!!')
                setGameOver(true)
                setDropTime(null)
            }
            updatePlayerPos({x:0,y:0,collided:true});
        }
      
    }
      const dropPlayer =() =>{
          drop();
      }
     
     
      const move =({keyCode}) =>{
         if(!gameOver){
             if(keyCode ===37){
                 movePlayer(-1);
             }
             else if(keyCode ===39){
                 movePlayer(1);
             }
             else if(keyCode === 40){
                 dropPlayer();

             }
         }
      }
       
      return (
            <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e=>move(e)}>
                <StyledTetris>
               <Stage stage={stage}/>
               <aside>
                   {gameOver ? (
                       <Display gameOver={gameOver} text="Game Over"/>
                   ):(  <div>
                    <Display text="Score"/>
                    <Display text="Rows"/>
                    <Display text="level"/>
                </div>)}
                   <StartButton callback={startGame}/>
               </aside>
               </StyledTetris>
            </StyledTetrisWrapper>
        )
}

