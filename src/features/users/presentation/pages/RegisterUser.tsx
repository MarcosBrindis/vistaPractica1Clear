import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { RegisterUserModel } from "../viewmodels/RegisterUserModel";

type Props = {
  viewModel: RegisterUserModel;
};

export const RegisterUser = observer(({ viewModel }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    viewModel.reset();
  }, [viewModel]);

  useEffect(() => {
    if (viewModel.isValid) {
      navigate("/"); 
    }
  }, [viewModel.isValid, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">Registrar Usuario</h2>
        {viewModel.error && <p className="text-red-500 text-center mt-2">{viewModel.error}</p>}
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Nombre</label>
            <input
             placeholder="Ingresa tu nombre"
              type="text"
              value={viewModel.name}
              onChange={(e) => viewModel.onChangeName(e.target.value)}
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Correo Electrónico</label>
            <input
             placeholder="Ingresa tu email"
              type="email"
              value={viewModel.email}
              onChange={(e) => viewModel.onChangeEmail(e.target.value)}
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
            onClick={() => viewModel.doCreateUser()}
          >
            Registrar Usuario
          </button>
        </form>
      </div>
    </div>
  );
});

export default RegisterUser;