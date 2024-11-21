import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Interview from "../pages/interview"
import Calendar from "../pages/calendar"
import Record from "../pages/record"

const Header : React.FC = () => {
  return <BrowserRouter>
  <div>하이</div>
      <Routes>
        <div>interview<Route path='interview' element={<Interview />}/></div>
        <Route path='calendar' element={<Calendar />}/>
        <Route path='record' element={<Record />}/>
      </Routes>
  </BrowserRouter>;
};

export default Header;