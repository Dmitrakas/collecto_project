import React from 'react';
import LogoutButton from '../components/Buttons/LogoutButton';
import CollectionForm from '../components/Collections/CollectionForm';

const ProfilePage = () => {
  const themes = ['Books', 'Signs', 'Silverware'];

  return (
    <div>
      <h1>Profile Page</h1>
      <LogoutButton />
      <CollectionForm themes={themes} />
    </div>
    
  );
};

export default ProfilePage;
