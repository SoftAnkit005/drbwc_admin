import React from 'react';
import user1 from '../../assets/images/users/user4.jpg';

const ProfileDD = () => {
  const user = JSON.parse(localStorage.getItem('loggedUser'));

  console.log(user);
  
  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={user1} alt="user" className="rounded-circle" width="55" />
        <span>
          <h5 className="mb-0 fw-medium">{user.full_name}</h5>
          <small className='text-muted'>{user.email}</small>
        </span>
      </div>
    </div>
  );
};

export default ProfileDD;
