import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user || currentUser;
  const [imageFile, setImageFile] = useState(null); // preview
  const [rawFile, setRawFile] = useState(null); // actual file
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  const displayName = user?.displayName || user?.username || 'User';
  const email = user?.email || '';
  const photoURL = user?.photoURL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
      setRawFile(file);
    }
  };

  useEffect(() => {
    if (rawFile) {
      uploadImage(rawFile);
    }
  }, [rawFile]);

  const uploadImage = async (file) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));

          // Auto-clear progress bar when upload completes
          if (progress.toFixed(0) === '100') {
            setTimeout(() => setImageFileUploadProgress(null), 1200);
          }
        },
        (error) => {
          console.error(error);
          setImageFileUploadError(
            'Could not upload image. File must be an image and less than 2MB.'
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setRawFile(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFile(downloadURL);
          });
        }
      );
    } catch (error) {
      console.error('Upload error:', error);
      setImageFileUploadError('Unexpected error during upload.');
    }
  };

  const avatar =
    imageFile ||
    photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=random`;

  const inputStyles =
    'bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400';

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
          onClick={() => filePickerRef.current.click()}
        >
          {/* Show circular progress bar if upload is ongoing */}
          {imageFileUploadProgress && imageFileUploadProgress < 100 && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/60 rounded-full">
              <CircularProgressbar
                value={imageFileUploadProgress}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={6}
                styles={{
                  path: {
                    stroke: `#3e98c7`,
                    strokeLinecap: 'round',
                  },
                  text: {
                    fill: '#3e98c7',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  },
                  trail: {
                    stroke: '#d6d6d6',
                  },
                }}
              />
            </div>
          )}

          {/* Avatar Image */}
          <img
            src={avatar}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        {/* Upload error alert */}
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

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
        <Button>Update</Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Logout</span>
      </div>
    </div>
  );
};

export default DashProfile;
