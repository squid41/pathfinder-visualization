import React from 'react'
import "./Node.css"
function Node({isStart,isEnd,row,col,wall}) {
            const x=wall?"wall":isStart?"start":isEnd?"end":"node"
           

    return (
        <div className={`${x}`} id={`node-${row}-${col}`} >
            
        </div>
    )
}

export default Node

