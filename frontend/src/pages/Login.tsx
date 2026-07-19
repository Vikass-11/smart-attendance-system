import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { loginSchema } from '../schemas/authSchemas';
import type { LoginFormData } from '../schemas/authSchemas';
import Spinner from '../components/Spinner';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
        
        {/* Branding Title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <GraduationCap className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold text-white tracking-wide">Campus360</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Welcome back</h2>
          <p className="text-sm text-slate-400 mt-1">Sign in to continue to your dashboard</p>
        </div>

        {justRegistered && (
          <div className="mb-4 flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Account created successfully. Please log in.
          </div>
        )}

        {apiError && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                {...register('email')}
                placeholder="you@institution.edu"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <Spinner inline size="sm" variant="light" label="Signing in..." />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
