import {useState,useEffect} from 'react';
import {createStage} from '../gameHelper';
import Stage from '../components/stage/Stage';

export const useStage = (player,resetPlayer) =>{
   
    const [stage,setStage] =useState(createStage());
    useEffect(()=>{
      const updateStage = prevStage =>{
          //First flash the stage
          const newStage = prevStage.map(row =>row.map(cell=>(cell[1]=== 'clear' ? [0,'clear']:cell))
          );
          //The draw the tetromino
          player.tetromino.map((row,y)=>{
              row.map((value,x)=>{
                  if(value !==0){
                      newStage[y + player.pos.y][x + player.pos.x]=[
                          value,
                          `${player.collided ? 'merged':'clear'}`,
                      ]
                  }
              })
          });
            //Then check if we collided
            if(player.collided){
                resetPlayer();
            }

          return newStage;
      }
      setStage(prev=>updateStage(prev));

    },[player,resetPlayer]);
    return[stage,setStage];
}