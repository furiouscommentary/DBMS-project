import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations/my-reservations');
      setReservations(response.data);
    } catch (error) {
      toast.error('Failed to fetch reservations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.pnr_no}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    PNR: {reservation.pnr_no}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {reservation.source} to {reservation.destination}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(reservation.date_time).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Class: {reservation.class_type}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-sm rounded bg-green-100 text-green-800">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservations;