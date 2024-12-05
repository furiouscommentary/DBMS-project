import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      login(response.data.token);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register('p_name')}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Age</label>
          <input
            type="number"
            {...register('age')}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            {...register('dob')}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <textarea
            {...register('address')}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            {...register('phone_no')}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;