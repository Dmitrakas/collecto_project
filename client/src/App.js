import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header'
import Main from './components/Main/Main';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Collection from './components/Collection/Collection';
import Profile from './components/Profile/Profile';
import CollectionDetails from './components/CollectionDetails/CollectionDetails';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ItemDetails from './components/ItemDetails/ItemDetails';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './actions/user';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {!isAuth && (
            <>
              <Route path="/" element={<Main />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route path="/" element={<Main />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/collections/:collectionId" element={<CollectionDetails />} />
          <Route path="/collections/:collectionId/:itemId" element={<ItemDetails />} />
          <Route path="/profile" element={<Profile />} />

          {isAuth && isAdmin && <Route path="/admin" element={<AdminPanel />} />}

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
