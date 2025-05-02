// import "../searchbar.css";
// import { useState } from "react";
// import User from "./User";
// // import rental unit info, users

// interface Unit {
//     id: number;
//     title: string;
//     description: string;
//     feature: string;
//     price: number;
//     username: string;
//     date: string;
//   }

//   interface User {
//     username: string;
//     date: string;
//   }

// export function SubSearchBar() {
    
//       const filteredUsers = result.filter(unit => {
//         const title = unit.title.toLowerCase();
//         const feature = unit.feature.toLowerCase();
            
//         const matchesAdjacent = secondsearchTerm && thirdsearchTerm &&
//       (feature.includes(secondsearchTerm) || feature.includes(thirdsearchTerm))
//           //&& unit.date === unit.date; //must fix
      
//         // If both search modes are empty, show all
//         if (!secondsearchTerm && !thirdsearchTerm) return true;
//         else {
//             localStorage=true
//         }
//         return matchesAdjacent;
//       });
    
//              {filteredUsers.map((user) => {
      
//         return (
//           <>
//                 {/* <button>
//                   Search
//                 </button> */}
//           <br/>
//           <div key={Unit.id}>
//             <User
//               username = {Unit.username}
//             />
//           </div>
//           </>
//         );
//       })}
      
// }