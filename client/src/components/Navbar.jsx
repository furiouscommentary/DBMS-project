import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold text-xl">
            Railway System
          </Link>
          <div className="flex space-x-4">
            <Link to="/trains" className="text-white hover:text-indigo-200">
              Search Trains
            </Link>
            {user ? (
              <>
                <Link to="/reservations" className="text-white hover:text-indigo-200">
                  My Reservations
                </Link>
                <button
                  onClick={logout}
                  className="text-white hover:text-indigo-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-indigo-200">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:text-indigo-200">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;