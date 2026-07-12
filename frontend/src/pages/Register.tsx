import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, Users } from 'lucide-react';
import type { AxiosError } from 'axios';
import apiClient from '../api/axiosClient';
import { registerSchema } from '../schemas/authSchemas';
import type { RegisterFormData } from '../schemas/authSchemas';

const Register = () => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student' },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setApiError('');
    setLoading(true);
    try {
      await apiClient.post('/auth/register', data);
      navigate('/login?registered=true');
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      setApiError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center p-6">
      <div className="glass rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 my-8">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="bg-indigo-500/20 p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-indigo-300" />
          </div>
          <span className="font-semibold text-lg text-white">Smart Attendance System</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-1 text-center">Create your account</h2>
        <p className="text-slate-400 text-sm mb-6 text-center">Get started in a few seconds</p>

        {apiError && (
          <div className="text-red-300 text-sm mb-4 bg-red-500/10 border border-red-400/20 rounded-lg p-3">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                {...register('name')}
                className="w-full bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                placeholder="Vikas Kumar"
              />
            </div>
            {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                {...register('email')}
                className="w-full bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                placeholder="you@institution.edu"
              />
            </div>
            {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                {...register('password')}
                className="w-full bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                placeholder="At least 6 characters"
              />
            </div>
            {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Role</label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <select
                {...register('role')}
                className="w-full bg-white/5 border border-white/15 text-white rounded-lg pl-10 pr-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              >
                <option value="student" className="bg-slate-800">Student</option>
                <option value="faculty" className="bg-slate-800">Faculty</option>
                <option value="admin" className="bg-slate-800">Admin</option>
              </select>
            </div>
            {errors.role && <p className="text-red-300 text-xs mt-1">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-400 transition-colors disabled:opacity-50 shadow-lg shadow-indigo-500/30"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-400">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-300 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
