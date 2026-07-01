import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/account';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Mock successful signup
    login({ name, email });
    navigate(redirectUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-porcelain px-4 py-12 font-body relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orchid/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display text-ink mb-4 italic">Create Account</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50">Register for exclusive access.</p>
        </div>

        {error && (
          <div className="garment-tag bg-orchid/10 border-orchid text-orchid mb-8 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30"
              placeholder="FULL NAME"
            />
          </div>
          <div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30"
              placeholder="EMAIL ADDRESS"
            />
          </div>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30 pr-10"
              placeholder="CREATE PASSWORD"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors"
            >
              {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
            </button>
          </div>
          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30 pr-10"
              placeholder="CONFIRM PASSWORD"
            />
            <button 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
            </button>
          </div>

          <div className="flex items-start pt-2">
            <input type="checkbox" id="terms" required className="mt-1 appearance-none w-4 h-4 border border-ink/30 checked:bg-orchid checked:border-orchid transition-colors" />
            <label htmlFor="terms" className="ml-3 font-mono text-[10px] uppercase tracking-widest text-ink/50 leading-relaxed">
              I agree to the <a href="#" className="text-ink hover:text-orchid border-b border-ink/30 hover:border-orchid transition-colors pb-0.5">Terms</a> and <a href="#" className="text-ink hover:text-orchid border-b border-ink/30 hover:border-orchid transition-colors pb-0.5">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit"
            className="w-full h-14 bg-ink text-porcelain font-mono text-xs uppercase tracking-[0.1em] hover:bg-velvet transition-colors mt-8"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="mt-16 text-center font-mono text-[10px] uppercase tracking-widest text-ink/50">
          Already have an account? <Link to={`/login${location.search}`} className="text-ink hover:text-orchid border-b border-ink/30 hover:border-orchid pb-1 ml-2 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
