import React from 'react';
import PropTypes from 'prop-types';
import user1 from '../../assets/images/users/user4.jpg';

const ProfileDD = ({ user }) => {
  
  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={user1} alt="user" className="rounded-circle" width="55" />
        <span>
          <h5 className="mb-0 fw-medium">{user?.full_name}</h5>
          <small className='text-muted'>{user?.email}</small>
        </span>
      </div>
    </div>
  );
};

ProfileDD.propTypes = {
  user: PropTypes.object,
};
export default ProfileDD;
