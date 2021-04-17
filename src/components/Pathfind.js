import React, {useEffect, useState} from 'react'
import Node from './Node.js'
import "./Pathfind.css"
import Astar from '../pathFinders/astar.js'
import Dijkstra from '../pathFinders/dijkstra.js'
function Pathfind() {
    const rows =29;
    const cols=69;
    const [grid,setGrid]=useState([]);
    const [path,setPath]=useState([]);
      const [state,setState]=useState('')
      const x=localStorage.getItem('name');
      if(x=='')
      localStorage.setItem('name','choose an option')
      const [name,setName]=useState(localStorage.getItem('name'));
    const [visitedNodes,setVisitedNodes]=useState([]);
    const start_row=10;
    const start_col=20;
    const end_row=20;
    const end_col=40;
    useEffect(()=>{
        const y=localStorage.getItem('name');
      initializeGrid(y)
    },[])
    
    const initializeGrid=(name)=>{
        console.log("hello ");
        console.log(name);
        const grid =new Array(rows);
        for(let i=0;i<rows;i++)
        {
           grid[i]=new Array(cols);
        }
        createSpot(grid);
        setGrid(grid);
        addneighbours(grid);
               const startNode=grid[start_row][start_col];
                const endNode=grid[end_row][end_col];
                 startNode.wall=false;
                endNode.wall=false;
                if(name==='AStar' || name===null)
                {let path=Astar(startNode,endNode)
                setPath(path.path);
                setVisitedNodes(path.visitedNodes);}
                if(name==='Dijkstra')
                 {console.log('name');
                    let path=Dijkstra(startNode,endNode)
                setPath(path.path);
                setVisitedNodes(path.visitedNodes);
            }



    }
    const createSpot=(grid)=>{

          for(let i=0;i<rows;i++)
        {
            for(let j=0;j<cols;j++)
          
          { grid[i][j]=new Spot(i,j);
          }
        }
    }
    const addneighbours=(grid)=>{

          for(let i=0;i<rows;i++)
        {
            for(let j=0;j<cols;j++)
          
          { grid[i][j].addneighbours(grid);
          }
        }
    }
    const inf=100000000;
    function Spot(i,j){
        this.distance=inf;
        this.x=i;
        this.y=j;
        this.g=0;
        this.isStart=this.x===start_row && this.y===start_col
        this.isEnd=this.x===end_row && this.y===end_col;
        this.f=0;
        this.h=0;
        this.neighbours=[];
        this.previous='';
        this.wall=false;
        // if(Math.random(i)<0.2){
        //     this.wall=true;
        // }
        this.addneighbours=function(grid)
        {
            let x=this.x;
            let y=this.y;
            if(x>0)
            this.neighbours.push(grid[x-1][y]);
            if(x<rows-1)
            this.neighbours.push(grid[x+1][y]);
            if(y>0)
            this.neighbours.push(grid[x][y-1]);
            if(y<cols-1)
            this.neighbours.push(grid[x][y+1]);
        }
    }
    // console.log(path)
    const gridWithNode=(
        <div >
            {
                grid.map((row,rowindex)=>{
                    return(
                        <div key={rowindex}  className="tota">
                            {
                                row.map((col,colindex)=>{
                                    //console.log(col);
                                    const {isStart ,isEnd,wall}=col
                                    return <Node key={colindex} isStart={isStart} isEnd={isEnd} row={rowindex} col={colindex} wall={wall}/>
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
        
     const visualizeshortestpath=(shortestPathnodes)=>{
         for (let i=0;i<shortestPathnodes.length;i++)
         {
             setTimeout(()=>{
                 const node=shortestPathnodes[i];
                 document.getElementById(`node-${node.x}-${node.y}`).className='node node-shortest-path'
             },10*i)
         }
     }
    const visualizepath=()=>{
        for (let i=0;i<=visitedNodes.length;i++)
         {
           if(i===visitedNodes.length){
               setTimeout(()=>{
                   visualizeshortestpath(path);
               },20*i)
           }
           else{
                setTimeout(()=>{
             const node=visitedNodes[i];
                 document.getElementById(`node-${node.x}-${node.y}`).className='node node-visited'               },20*i)

           }
         }
        
    }
    // useEffect(()=>{
    //     let path=Astar(startNode,endNode)
    //             setPath(path.path);
    //             startNode.wall=false;
    //             endNode.wall=false;
    //             setVisitedNodes(path.visitedNodes);
    // },[name])
    const handleChange=(event)=> {

   const x=event.target.value;
   localStorage.setItem('name', x);

  window.location.reload();

  }
  

    return (
        <div>
        <select name="Pathfinder" onChange={handleChange}>
            <option value="" selected disabled hidden>{name}</option>
            <option value="AStar">AStar</option>
            <option value="Dijkstra">Dijkstra</option>
          </select>
            <button onClick={visualizepath}>visualizepath</button>
            <h1>pathfinder</h1>
            {gridWithNode}
        </div>
    )
}

export default Pathfind

