import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, Building2 } from 'lucide-react';
import apiClient from '../api/axiosClient';
import type { AxiosError } from 'axios';
import Spinner from '../components/Spinner';

interface DepartmentRecord {
  id: number;
  name: string;
}

const Register = () => {
  const navigate = useNavigate();

  // Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [departmentId, setDepartmentId] = useState(''); // Tracks the numeric ID string

  // UI Dataset States
  const [departments, setDepartments] = useState<DepartmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamically pull latest database departments created by Admin
  useEffect(() => {
    const fetchLiveDepartments = async () => {
      try {
        const response = await apiClient.get('/departments');
        const data = response.data?.data ?? response.data ?? [];
        setDepartments(Array.isArray(data) ? data : []);
      } catch {
        try {
          // Fallback route context check
          const fallbackRes = await apiClient.get('/auth/departments');
          const data = fallbackRes.data?.data ?? fallbackRes.data ?? [];
          setDepartments(Array.isArray(data) ? data : []);
        } catch (fallbackErr) {
          console.error('Could not load institutional departments:', fallbackErr);
        }
      }
    };
    void fetchLiveDepartments();
  }, []);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!departmentId) {
      setError('Please select your institutional department.');
      setLoading(false);
      return;
    }

    try {
      // 🎯 Fixed: Sends 'departmentId' as an integer and forces 'role' to 'student'
      await apiClient.post('/auth/register', {
        name,
        email,
        password,
        role: 'student',
        departmentId: Number(departmentId)
      });

      navigate('/login');
    } catch (err) {
      const errorPayload = err as AxiosError<{ error?: string }>;
      setError(errorPayload.response?.data?.error || 'Registration failed. Please check your entries.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Branding Title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <GraduationCap className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold text-white tracking-wide">EduFlow</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Create your account</h2>
          <p className="text-sm text-slate-400 mt-1">Get started in a few seconds</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
            {error}
          </div>
        )}

        {/* Security configuration prevents basic browser cache injection fields */}
        <form onSubmit={handleRegisterSubmit} autoComplete="new-password" name="signup-secure-matrix" className="space-y-4">

          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ayrton Senna"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ayrton.s@gmail.com"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="new-password"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Dynamic Database Dropdown Menu */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Department</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                required
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="" disabled className="bg-slate-900 text-slate-500">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id} className="bg-slate-900 text-white">
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submission Trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <Spinner inline size="sm" variant="light" label="Registering Account..." />
            ) : (
              'Register'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;