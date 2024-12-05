import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function BookingForm({ train, onClose }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post('/reservations', {
        trainNo: train.train_no,
        ...data
      });
      toast.success('Booking successful!');
      navigate('/reservations');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Class Type</label>
        <select {...register('classType')} className="w-full border rounded p-2">
          <option value="General">General</option>
          <option value="1 AC">1 AC</option>
          <option value="2 AC">2 AC</option>
          <option value="Sleeper">Sleeper</option>
        </select>
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
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
}

export default BookingForm;