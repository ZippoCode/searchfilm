import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//import logo from './logo.svg';
import { AppBarCustom, FooterCustom } from './components';
import RouterPages from './helpers/history';

// Importing from Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

// Importing Theme's component
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './Theme';

// Theme and CSS
import './App.css';

// Importing actions
import { AuthenticationActions } from './redux/actions/authentication.action';
import { getGenres } from './redux/actions/main.action';

function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token) || undefined;
  const loaded = useSelector(state => state.authentication.id) || false;

  useEffect(() => {
    const fetchData = () => { dispatch(AuthenticationActions.getInfoAccount(token)); }
    if (token && !loaded) { fetchData(); }
  }, [dispatch, token, loaded]);

  let loadedGenres = useSelector(state => state.main.loadedGenres) || false;

  useEffect(() => {
    const loadGenres = () => { dispatch(getGenres()); }
    if (!loadedGenres)
      loadGenres();
  }, [dispatch, loadedGenres]);

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <CssBaseline />
        <header className='App-header'>
          <AppBarCustom />
          <Toolbar />
        </header>
        <div className='App-container'>
          <RouterPages />
        </div>
        <div className='App-Footer'>
          <FooterCustom />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App;