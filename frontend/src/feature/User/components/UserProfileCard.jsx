const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        User Profile
      </h2>
      <div className="flex items-center">
        <img
          src="https://wallpapers.com/images/hd/beautiful-space-1793-x-1080-picture-5l69dcteti3sjdxz.jpg"
          alt="Profile"
          className="w-16 h-16 rounded-xl object-cover border-2 border-amber-400"
        />
        <div className="ml-4">
          <p className="text-xl font-bold text-gray-100">
            {user.firstName}
          </p>
          <p className="text-gray-400">{user.emailId}</p>
          <span className="inline-block mt-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium capitalize">
            {user.role}
          </span>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-4">
        <h3 className="text-md font-semibold text-gray-200 mb-2">
          Bio
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          I am 3rd year student at IET DAVV pursuing BTech in Information
          Technology, I am exploring Deep Learning and proficient in MERN.
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;