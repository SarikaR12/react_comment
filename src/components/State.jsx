// import React, { useState } from 'react'

// const State = () => {
//     const [count, setcount] = useState(0)

//     let plus = () => {
//         setcount(count - 1)
//     }
//     let mins = () => {
//         setcount(count + 1)
//     }

//     return (
//         <div>
//             <div className="count">
//                 <button onClick={plus}>-</button>
//                 <div className="number">
//                     {count}
//                 </div>
//                 <button onClick={mins}>+</button>
//             </div>
//         </div>
//     )
// }

// export default State;

import React, { useState } from 'react'

const State = () => {
let [count,setCount]=useState(0)


  return (
    <div>
        
      <button onClick={()=>setCount(count+1)}>+</button>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count-1)}>-</button>
    </div>
  )
}

export default State;
