import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth, logout } from './actions/user';
import Header from './components/Header/Header'
import Main from './pages/Main/Main';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Collection from './pages/Collection/Collection';
import Profile from './pages/Profile/Profile';
import CollectionDetails from './pages/CollectionDetails/CollectionDetails';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import ItemDetails from './pages/ItemDetails/ItemDetails';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAdmin = useSelector((state) => state.user?.currentUser?.isAdmin);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(auth()).unwrap();
      } catch (error) {
        dispatch(logout());
      }
    };

    fetchData();
  }, [dispatch]);

  if (error === 'User is blocked. Please contact our support team for more information.') {
    dispatch(logout());
  }

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {isAuth && (
            <>
              <Route path="/" element={<Main />} />
              <Route path="/collections" element={<Collection />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          <Route path="/" element={<Main />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collections/:collectionId" element={<CollectionDetails />} />
          <Route path="/collections/:collectionId/:itemId" element={<ItemDetails />} />
          <Route path="/*" element={<NotFoundPage />} />
          {isAuth && isAdmin && <Route path="/admin" element={<AdminPanel />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
