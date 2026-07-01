import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/account';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Mock successful login
    login({ name: email.split('@')[0], email });
    navigate(redirectUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-porcelain px-4 py-12 font-body relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-champagne/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display text-ink mb-4 italic">Welcome Back</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50">Enter your credentials to continue.</p>
        </div>

        {error && (
          <div className="garment-tag bg-orchid/10 border-orchid text-orchid mb-8 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30"
              placeholder="EMAIL ADDRESS"
            />
          </div>
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30"
              placeholder="PASSWORD"
            />
            <div className="mt-4 text-right">
              <a href="#" className="font-mono text-[10px] uppercase tracking-widest text-ink/40 hover:text-orchid transition-colors">Forgot password?</a>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full h-14 bg-ink text-porcelain font-mono text-xs uppercase tracking-[0.1em] hover:bg-velvet transition-colors mt-8"
          >
            SIGN IN
          </button>
        </form>

        <p className="mt-16 text-center font-mono text-[10px] uppercase tracking-widest text-ink/50">
          Don't have an account? <Link to={`/signup${location.search}`} className="text-ink hover:text-orchid border-b border-ink/30 hover:border-orchid pb-1 ml-2 transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
