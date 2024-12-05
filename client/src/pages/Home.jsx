import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Railway Management System</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-xl mb-8">
          Book your train tickets easily and manage your reservations in one place.
        </p>
        <div className="space-y-4">
          {!user ? (
            <>
              <Link
                to="/register"
                className="block w-full sm:w-auto sm:inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="block w-full sm:w-auto sm:inline-block ml-0 sm:ml-4 bg-white text-indigo-600 px-6 py-3 rounded-lg border border-indigo-600 hover:bg-indigo-50"
              >
                Login
              </Link>
            </>
          ) : (
            <Link
              to="/trains"
              className="block w-full sm:w-auto sm:inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Search Trains
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;