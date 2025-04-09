import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { FilmHubDetailsViewModel } from "../viewmodels/FilmHubDetailsViewModel";

type Props = {
  filmHubId: number;
  viewModel: FilmHubDetailsViewModel;
  closeModal: () => void;
};

export const FilmHubDetails = observer(({ filmHubId, viewModel, closeModal }: Props) => {
  useEffect(() => {
    viewModel.fetchFilmHubDetails(filmHubId);
  }, [filmHubId, viewModel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg relative animate-slide-in">
        <span 
          className="absolute top-5 right-5 text-gray-600 text-3xl font-light cursor-pointer transition-all duration-300 ease-in-out w-10 h-10 flex items-center justify-center rounded-full hover:text-red-500 hover:bg-gray-200 hover:scale-110" 
          onClick={closeModal}
        >
          &times;
        </span>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Film Details</h2>
        {viewModel.error && <p className="text-red-500 text-center mt-2">{viewModel.error}</p>}
        {viewModel.filmDetails ? (
          <div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700 text-sm">Title:</label>
              <p className="text-lg text-gray-600">{viewModel.filmDetails.title}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700 text-sm">Type:</label>
              <p className="text-lg text-gray-600">{viewModel.filmDetails.type}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700 text-sm">Genre:</label>
              <p className="text-lg text-gray-600">{viewModel.filmDetails.genre}</p>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700 text-sm">Duration:</label>
              <p className="text-lg text-gray-600">{viewModel.filmDetails.duration} mins</p>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700 text-sm">Release Year:</label>
              <p className="text-lg text-gray-600">{viewModel.filmDetails.releaseYear}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
});

export default FilmHubDetails;