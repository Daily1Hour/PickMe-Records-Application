import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Record from "./record"

const Header : React.FC = () => {
  return <BrowserRouter>
  <div>하이</div>
      <Routes>
        <Route path='record' element={<Record />}/>
      </Routes>
  </BrowserRouter>;
};

export default Header;