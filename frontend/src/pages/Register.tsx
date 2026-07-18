import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, Building2 } from 'lucide-react';
import apiClient from '../api/axiosClient';

interface DepartmentRecord {
  id: number;
  name: string;
}

const Register = () => {
  const navigate = useNavigate();
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [department, setDepartment] = useState('');

  // UI Flow States
  const [departments, setDepartments] = useState<DepartmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch true live database departments upon page mount
  useEffect(() => {
    const fetchLiveDepartments = async () => {
      try {
        // Hits your public department list endpoint
        const response = await apiClient.get('/departments').catch(() => 
          // Fallback in case your route is structured under auth sub-paths
          apiClient.get('/auth/departments')
        );
        const data = response.data?.data ?? response.data ?? [];
        setDepartments(data);
      } catch (err) {
        console.error('Failed to load live structural units:', err);
      }
    };
    void fetchLiveDepartments();
  }, []);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!department) {
      setError('Please select your institutional department.');
      setLoading(false);
      return;
    }

    try {
      // Dispatches full structural parameters to your registration database controller
      await apiClient.post('/auth/register', {
        name,
        email,
        password,
        role,
        department // Sends the clean dynamic name string selected from the database list
      });

      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        
        {/* App Branding Head */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <GraduationCap className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold text-white tracking-wide">Smart Attendance System</span>
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

        {/* 🛠️ FIXED: Added random name values to completely block browser autofill heuristics */}
        <form onSubmit={handleRegisterSubmit} autoComplete="new-password" name="security-signup-form" className="space-y-4">
          
          {/* Full Name Input Slot */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vikas Kumar"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Email Address Input Slot */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Input Slot */}
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

          {/* Institutional Access Role Selection Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Role</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
              >
                <option value="student" className="bg-slate-900 text-white">Student</option>
                <option value="faculty" className="bg-slate-900 text-white">Faculty</option>
              </select>
            </div>
          </div>

          {/* 🌟 FIXED: Dynamic Department Field (Loads directly from database records) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Department</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="" disabled className="bg-slate-900 text-slate-500">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name} className="bg-slate-900 text-white">
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Registering Account...' : 'Register'}
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