import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Modal from '../components/Modal';
import BookingForm from '../components/BookingForm';

function TrainSearch() {
  const { register, handleSubmit } = useForm();
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await api.get('/trains', { params: data });
      setTrains(response.data);
    } catch (error) {
      toast.error('Failed to fetch trains');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (train) => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }
    setSelectedTrain(train);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Trains</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Source</label>
            <input
              type="text"
              {...register('source')}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Destination</label>
            <input
              type="text"
              {...register('destination')}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              {...register('date')}
              className="w-full border rounded p-2"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {trains.length > 0 && (
        <div className="space-y-4">
          {trains.map((train) => (
            <div
              key={train.train_no}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold">{train.train_name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Departure</p>
                  <p>{train.dept_time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Arrival</p>
                  <p>{train.arr_time}</p>
                </div>
              </div>
              <button
                onClick={() => handleBooking(train)}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedTrain}
        onClose={() => setSelectedTrain(null)}
        title="Book Ticket"
      >
        {selectedTrain && (
          <BookingForm
            train={selectedTrain}
            onClose={() => setSelectedTrain(null)}
          />
        )}
      </Modal>
    </div>
  );
}

export default TrainSearch;