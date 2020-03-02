import React from 'react'
import {StyledStartButton} from './StyledStartButton';
export default function StartButton({callback}) {
    return (
        <StyledStartButton onClick={callback}>
            Start Game
        </StyledStartButton>
    )
}
