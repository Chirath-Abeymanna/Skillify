'use client';

import { useState } from 'react';

export default function UserProfile() {
  const [selectedAvatar, setSelectedAvatar] = useState('/avatars/avatar1.png');
  const avatars = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png',
    '/avatars/avatar4.png',
    '/avatars/avatar5.png',
    '/avatars/avatar6.png',
    '/avatars/avatar7.png',
    '/avatars/avatar8.png',
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">User Profile</h2>
      
      {/* Avatar Selection */}
      <div className="text-center my-4">
        <img
          src={selectedAvatar}
          alt="Selected Avatar"
          className="w-24 h-24 mx-auto rounded-full border border-gray-300"
        />
        <p className="mt-2 text-sm text-gray-600">Choose Avatar</p>
        <div className="flex justify-center gap-3 mt-3">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                selectedAvatar === avatar ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => setSelectedAvatar(avatar)}
            />
          ))}
        </div>
      </div>
      
      {/* Forms */}
      <div className="space-y-4">
        {/* Personal Details */}
        <div className="border p-4 rounded-md">
          <h3 className="font-semibold mb-2">Change Personal Details</h3>
          <input type="text" placeholder="First Name" className="input" />
          <input type="text" placeholder="Last Name" className="input" />
          <input type="text" placeholder="Gender" className="input" />
          <input type="number" placeholder="Age" className="input" />
        </div>
        
        {/* Contact Details */}
        <div className="border p-4 rounded-md">
          <h3 className="font-semibold mb-2">Change Contact Details</h3>
          <input type="text" placeholder="Contact Number" className="input" />
          <input type="email" placeholder="Email Address" className="input" />
        </div>
        
        {/* Billing Details */}
        <div className="border p-4 rounded-md">
          <h3 className="font-semibold mb-2">Change Billing Details</h3>
          <input type="text" placeholder="Card Number" className="input" />
          <input type="text" placeholder="Expire Date" className="input" />
          <input type="text" placeholder="Secret Code" className="input" />
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button className="px-4 py-2 bg-gray-300 rounded">Cancel Changes</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
      </div>
    </div>
  );
}
