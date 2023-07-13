import React from 'react';
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

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/collections/:collectionId" element={<CollectionDetails />} />
          <Route path="/collections/:collectionId/:itemId" element={<ItemDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;