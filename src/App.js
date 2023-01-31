import './App.css';
import ClassApp from './Components/ClassComp';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FunctionalApp from './Components/FunctionalApp';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Nav className='dark' pills>
            <NavItem>
              <NavLink href="/">
                Functional Component
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">
                Class Componant
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <Routes>
          <Route path="/" element={<FunctionalApp />} />
          <Route path="about" element={<ClassApp /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
