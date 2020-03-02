import React from 'react'
import {StyledCell} from './StyledCell'
import {Tetrominos} from '../../tetrominos';
export default function Cell({type}) {
    return (
        <StyledCell type={type} color={Tetrominos[type].color}/>
         
    )
}
