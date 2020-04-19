import React, { useState } from "react";

import { CSSTransition } from 'react-transition-group';

// import ITodo from './interfaces/TodoInterface'

// import TodoList from './components/TodoList'
// import InputField from './components/InputField'

// function useForceUpdate(){ 
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => ++value); // update the state to force render
// }

// const App: React.FC = () => {

//   const [todos, setTodos] = useState <ITodo[] | []> ([]);
//   const forceUpdate = useForceUpdate();

//   const addTodo = (title: string): void => {
//     let newTodo: ITodo = {
//       id: Math.random(),
//       title,
//       date: new Date().toISOString()
//     }
//     setTodos([
//       ...todos,
//       newTodo
//     ])
//     forceUpdate();
//   }

//   return (
//     <div>
//       <h1>Todos</h1>
//       <InputField addTodo={ addTodo } />
//       <TodoList todos={ todos } />
//     </div>
//   )
// }

const App: React.FC = () => {

  return (
    <Navbar>
      <NavItem icon="😁" />
      <NavItem icon="😁" />
      <NavItem icon="😁" />
      <NavItem icon="⏬">
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
};

const Navbar: React.FC = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{ props.children }</ul>
    </nav>
  );
};

interface NavItemInterface {
  icon: string
}

const NavItem: React.FC <NavItemInterface> = (props) => {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={ () => setOpen(!open) }>
        { props.icon }
      </a>
      {
        open && props.children
      }
    </li>
  );
};

const DropdownMenu: React.FC = () => {

  const [activeMenu, setAcriveMenu] = useState <string> ('menu');

  return (
    <div className="dropdown">
      <CSSTransition  in={ activeMenu === 'main' }>
        <DropdownItem>My profile</DropdownItem>
        <DropdownItem leftIcon="😒" rightIcon="🔰">

        </DropdownItem>
      </CSSTransition>
      
    </div>
  )
}

interface DropdownItemInterface {
  leftIcon?: string,
  rightIcon?: string
}

const DropdownItem: React.FC <DropdownItemInterface> = (props) => {
  return (
    <a href="#" className="menu-item">
      <span className="icon-button">{ props.leftIcon }</span>
      { props.children }
      <span className="icon-right">{ props.rightIcon }</span>
    </a>
  )
}

export default App;
