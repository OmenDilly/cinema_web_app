import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetail from './components/projects/ProjectDetail'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import AppDrawer from './components/dashboard/Drawer'
import BackDrop from '@material-ui/core/BackDrop'
import EditProfile from './components/profile/EditProfile'

function App() {

  const [drawerOpen, setDrawerOpen] = useState(false);

    // setState({ ...state, [anchor]: open });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    console.log(event)
    setDrawerOpen( event );
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          onLeftIconClick={() => setDrawerOpen(true)}
        />
        <AppDrawer 
          open={drawerOpen}
          onToggle={toggleDrawer()}
        />
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/project/:id' component={ProjectDetail}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/create' component={CreateProject}/>
          <Route path='/profile' component={EditProfile}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
