function ProfileModal({ isOpen, setIsOpen, user, setUser }) {

  if (!isOpen) return null;

  const handleChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-80">

        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

        <input
          type="text"
          value={user.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          onClick={() => setIsOpen(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Save
        </button>

      </div>

    </div>
  );
}

export default ProfileModal;