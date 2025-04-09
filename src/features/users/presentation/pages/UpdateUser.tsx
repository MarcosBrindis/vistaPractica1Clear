import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { UpdateUserModel } from "../viewmodels/UpdateUserModel";

type Props = {
  userId: number;
  viewModel: UpdateUserModel;
  closeModal: () => void;
  reloadUsers: () => void;
};

export const UpdateUser = observer(({ userId, viewModel, closeModal, reloadUsers }: Props) => {
  useEffect(() => {
    viewModel.fetchUser(userId);
  }, [userId, viewModel]);

  useEffect(() => {
    if (viewModel.isUpdated) {
      closeModal();
      reloadUsers();
      viewModel.reset();
    }
  }, [viewModel.isUpdated, closeModal, reloadUsers, viewModel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg relative animate-slide-in">
        <span 
          className="absolute top-5 right-5 text-gray-600 text-3xl font-light cursor-pointer transition-all duration-300 ease-in-out w-10 h-10 flex items-center justify-center rounded-full hover:text-red-500 hover:bg-gray-200 hover:scale-110" 
          onClick={closeModal}
        >
          &times;
        </span>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Update User</h2>
        {viewModel.error && <p className="text-red-500 text-center mt-2">{viewModel.error}</p>}
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); viewModel.updateUser(userId); }}>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Name:</label>
            <input 
              placeholder="Ingresa tu nombre"
              type="text" 
              value={viewModel.name} 
              onChange={(e) => viewModel.onChangeName(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Email:</label>
            <input 
              placeholder="Ingresa tu email"
              type="email" 
              value={viewModel.email} 
              onChange={(e) => viewModel.onChangeEmail(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
});

export default UpdateUser;