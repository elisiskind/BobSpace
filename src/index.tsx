import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import {Logger} from "./logging";

// import App from "App";
// import {BrowserRouter, Route, Routes} from "react-router-dom";
// import {Messaging} from "pages/messaging";
// import {Feed} from "pages/feed";
//
// ReactDOM.render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<App/>}>
//             <Route path="feed" element={<Feed/>}/>
//             <Route path="messaging" element={<Messaging/>}/>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </React.StrictMode>,
//     document.getElementById("root")
// );

const logger = new Logger('purple', 'index.tsx')

const App = () => {
  return (
    <div id="app">
      <h1>HOW TO REACT</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
