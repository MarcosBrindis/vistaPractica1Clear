import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { UpdateUser } from "./UpdateUser";
import { UserManagementModel } from "../viewmodels/UserManagementModel";
import { UpdateUserModel } from "../viewmodels/UpdateUserModel";

const userManagementModel = new UserManagementModel();
const updateUserModel = new UpdateUserModel();

export const UserManagement = observer(() => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    userManagementModel.fetchUsers();
  }, []);

  const handleDelete = (id: number) => {
    userManagementModel.deleteUser(id);
  };

  const handleUpdate = (id: number) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
<div className="min-h-screen bg-black bg-cover bg-center flex items-center justify-center p-10" style={{ backgroundImage: 'url(https://wallpaperaccess.com/full/16680.jpg)' }}>
      <div className="bg-white p-12 max-w-4xl w-full rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 relative pb-4">
          User Management
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-500"></span>
        </h1>
        {userManagementModel.error && <p className="text-red-500 text-center mt-2">{userManagementModel.error}</p>}
        <ul className="list-none p-0 my-8">
          {userManagementModel.users.map(user => (
            <li key={user.id} className="flex items-center justify-between bg-gray-50 p-4 mb-4 rounded-lg border border-gray-200 transition-all duration-200 ease-in-out hover:translate-x-1 hover:bg-white hover:shadow-lg">
              <span className="text-lg font-medium text-gray-700 flex-grow mr-4">{user.name} ({user.email})</span>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(user.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out">Delete</button>
                <button onClick={() => handleUpdate(user.id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out">Update</button>
              </div>
            </li>
          ))}
        </ul>
        {isModalOpen && selectedUserId !== null && (
          <UpdateUser 
            userId={selectedUserId} 
            viewModel={updateUserModel}
            closeModal={closeModal} 
            reloadUsers={userManagementModel.fetchUsers.bind(userManagementModel)} 
          />
        )}
      </div>
    </div>
  );
});

export default UserManagement;