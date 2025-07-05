import React from 'react';
import { useSelector } from 'react-redux';

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user || currentUser;

  const displayName = user?.displayName || user?.username || 'User';
  const email = user?.email || '';
  const photoURL = user?.photoURL;

  const avatar =
    photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;

  const inputStyles =
    'bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400';

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={avatar}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={displayName}
          readOnly
          className={inputStyles}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={email}
          readOnly
          className={inputStyles}
        />
        <input
          type="password"
          id="password"
          placeholder="Change password"
          className={inputStyles}
        />
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Logout </span>
      </div>
    </div>
  );
};

export default DashProfile;
