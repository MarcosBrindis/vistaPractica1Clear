import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { UpdateFilmHubViewModel } from "../viewmodels/UpdateFilmHubViewModel";

type Props = {
  filmHubId: number;
  viewModel: UpdateFilmHubViewModel;
  closeModal: () => void;
  reloadFilms: () => void;
};

export const UpdateFilmHub = observer(({ filmHubId, viewModel, closeModal, reloadFilms }: Props) => {
  useEffect(() => {
    viewModel.fetchFilmHub(filmHubId);
  }, [filmHubId, viewModel]);

  useEffect(() => {
    if (viewModel.isUpdated) {
      closeModal();
      reloadFilms();
      viewModel.reset();
    }
  }, [viewModel.isUpdated, closeModal, reloadFilms, viewModel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg relative animate-slide-in">
        <span 
          className="absolute top-5 right-5 text-gray-600 text-3xl font-light cursor-pointer transition-all duration-300 ease-in-out w-10 h-10 flex items-center justify-center rounded-full hover:text-red-500 hover:bg-gray-200 hover:scale-110" 
          onClick={closeModal}
        >
          &times;
        </span>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Update Film</h2>
        {viewModel.error && <p className="text-red-500 text-center mt-2">{viewModel.error}</p>}
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); viewModel.doUpdateFilmHub(); }}>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Title:</label>
            <input 
              placeholder="Ingresa el título"
              type="text" 
              value={viewModel.title} 
              onChange={(e) => viewModel.onChangeTitle(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Type:</label>
            <input 
              placeholder="Ingresa el tipo"
              type="text" 
              value={viewModel.type} 
              onChange={(e) => viewModel.onChangeType(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Genre:</label>
            <input 
              placeholder="Ingresa el género"
              type="text" 
              value={viewModel.genre} 
              onChange={(e) => viewModel.onChangeGenre(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Duration:</label>
            <input 
              placeholder="Ingresa la duración"
              type="number" 
              value={viewModel.duration} 
              onChange={(e) => viewModel.onChangeDuration(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Release Year:</label>
            <input 
              placeholder="Ingresa el año de lanzamiento"
              type="number" 
              value={viewModel.releaseYear} 
              onChange={(e) => viewModel.onChangeReleaseYear(e.target.value)} 
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

export default UpdateFilmHub;