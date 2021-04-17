function Astar(startNode,endNode)
{
    let openSet=[]
    let closeSet=[]
    let path=[];
    openSet.push(startNode);
    let visitedNodes=[];
    while(openSet.length>0)
    {
        let l=0;
        for(let i=0;i<openSet.length;i++)
        {
            if(openSet[i].f<openSet[l].f){
                l=i;
            }
        }
        let current =openSet[l];
        visitedNodes.push(current)
        if(current===endNode)
        {
            let temp=current;
            path.push(temp)
                  while(temp.previous)
            {
                path.push(temp.previous);
                temp=temp.previous;
            }
            // console.log(path)
            return {path,visitedNodes};
            // console.log('path found')
        }
        openSet=openSet.filter((elt)=>elt!==current);
        closeSet.push(current);
        let neighbours=current.neighbours;
        for(let i=0;i<neighbours.length;i++)
        {
            let neighbour=neighbours[i];
            if(!closeSet.includes(neighbour) && !neighbour.wall)
            {
                let tempG=current.g+1;
                let newPath=false;
                if(openSet.includes(neighbour))
                {
                    if(tempG<neighbour.g){
                        neighbour.g=tempG;
                        newPath=true;
                    }
                }
                    else{
                        neighbour.g=tempG;
                        newPath=true;
                        openSet.push(neighbour);
                    }
                    if(newPath)
                    {
                        neighbour.h=heruistic(neighbour,endNode)
                        neighbour.f=neighbour.g+neighbour.h
                        neighbour.previous=current;
                    }
                
            }
        }
        
    }
  return {path,visitedNodes,error:'no path found'};

}
function heruistic(a,b)
  {
      let d=Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
      return d;
  }

export default Astar