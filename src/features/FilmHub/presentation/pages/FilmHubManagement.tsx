import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CreateFilmHub } from "./CreateFilmHub";
import { UpdateFilmHub } from "./UpdateFilmHub";
import { FilmHubDetails } from "./FilmHubDetails";
import { CreateFilmHubViewModel } from "../viewmodels/CreateFilmHubViewModel";
import { UpdateFilmHubViewModel } from "../viewmodels/UpdateFilmHubViewModel";
import { FilmHubDetailsViewModel } from "../viewmodels/FilmHubDetailsViewModel";
import { FilmHubManagementModel } from "../viewmodels/FilmHubManagementModel";

const filmHubManagementModel = new FilmHubManagementModel();
const createFilmHubViewModel = new CreateFilmHubViewModel();
const updateFilmHubViewModel = new UpdateFilmHubViewModel();
const filmHubDetailsViewModel = new FilmHubDetailsViewModel();

export const FilmHubManagement = observer(() => {
  const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    filmHubManagementModel.fetchFilms();
  }, []);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openUpdateModal = (filmId: number) => {
    setSelectedFilmId(filmId);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const openDetailsModal = (filmId: number) => {
    setSelectedFilmId(filmId);
    setIsDetailsModalOpen(true);
  };
  const closeDetailsModal = () => setIsDetailsModalOpen(false);

  const handleDelete = (id: number) => {
    filmHubManagementModel.deleteFilm(id);
  };

  return (
    <div className="min-h-screen bg-black bg-cover bg-center flex items-center justify-center p-10" style={{ backgroundImage: 'url(https://wallpaperaccess.com/full/4644839.jpg)' }}>
      <div className="bg-white p-12 max-w-4xl w-full rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 relative pb-4">
          Film Management
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-500"></span>
        </h1>
        <button className="w-full py-3 mb-8 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out" onClick={openCreateModal}>
          Create Film
        </button>
        {filmHubManagementModel.error && <p className="text-red-500 text-center mt-2">{filmHubManagementModel.error}</p>}
        <ul className="list-none p-0 my-8">
          {filmHubManagementModel.films.map(film => (
            <li key={film.id} className="flex items-center justify-between bg-gray-50 p-4 mb-4 rounded-lg border border-gray-200 transition-all duration-200 ease-in-out hover:translate-x-1 hover:bg-white hover:shadow-lg">
              <span className="text-lg font-medium text-gray-700 flex-grow mr-4">{film.title}</span>
              <div className="flex gap-2">
                <button onClick={() => openDetailsModal(film.id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out">Details</button>
                <button onClick={() => openUpdateModal(film.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 ease-in-out">Update</button>
                <button onClick={() => handleDelete(film.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        {isCreateModalOpen && <CreateFilmHub viewModel={createFilmHubViewModel} closeModal={closeCreateModal} />}
        {isUpdateModalOpen && selectedFilmId !== null && (
          <UpdateFilmHub 
            filmHubId={selectedFilmId} 
            viewModel={updateFilmHubViewModel}
            closeModal={closeUpdateModal} 
            reloadFilms={filmHubManagementModel.fetchFilms.bind(filmHubManagementModel)} 
          />
        )}
        {isDetailsModalOpen && selectedFilmId !== null && (
          <FilmHubDetails 
            filmHubId={selectedFilmId} 
            viewModel={filmHubDetailsViewModel}
            closeModal={closeDetailsModal} 
          />
        )}
      </div>
    </div>
  );
});

export default FilmHubManagement;