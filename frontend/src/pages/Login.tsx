import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { loginSchema } from '../schemas/authSchemas';
import type { LoginFormData } from '../schemas/authSchemas';

const Login = () => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const justRegistered = searchParams.get('registered') === 'true';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError('');
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err: unknown) {
      let message = 'Invalid email or password';

      if (typeof err === 'object' && err !== null && 'response' in err) {
        const response = (err as { response?: unknown }).response;
        if (typeof response === 'object' && response !== null && 'data' in response) {
          const dataObj = (response as { data?: unknown }).data;
          if (typeof dataObj === 'object' && dataObj !== null && 'error' in dataObj) {
            const errorValue = (dataObj as { error?: unknown }).error;
            if (typeof errorValue === 'string') {
              message = errorValue;
            } else if (
              typeof errorValue === 'object' &&
              errorValue !== null &&
              'message' in errorValue &&
              typeof (errorValue as { message?: unknown }).message === 'string'
            ) {
              message = (errorValue as { message: string }).message;
            }
          }
        }
      }

      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center p-6">
      <div className="glass rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="bg-indigo-500/20 p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-indigo-300" />
          </div>
          <span className="font-semibold text-lg text-white">Smart Attendance System</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-1 text-center">Welcome back</h2>
        <p className="text-slate-400 text-sm mb-6 text-center">Sign in to continue to your dashboard</p>

        {justRegistered && (
          <div className="flex items-center gap-2 text-emerald-300 text-sm mb-4 bg-emerald-500/10 border border-emerald-400/20 rounded-lg p-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Account created successfully. Please log in.
          </div>
        )}

        {apiError && (
          <div className="text-red-300 text-sm mb-4 bg-red-500/10 border border-red-400/20 rounded-lg p-3">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-400 transition-colors disabled:opacity-50 shadow-lg shadow-indigo-500/30"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-400">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-300 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
