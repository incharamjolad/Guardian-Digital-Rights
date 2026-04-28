import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email, password } : { name, email, password };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        if (data.email) {
          localStorage.setItem('email', data.email);
        } else {
          localStorage.setItem('email', email); // fallback
        }
        navigate('/profile');
      } else {
        // Auto login after register or just switch to login
        setIsLogin(true);
        setError('Registration successful. Please log in.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-28 pb-12 flex flex-col justify-center select-none">
      <div className="max-w-md w-full mx-auto px-4 z-10 fade-up is-visible">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-6">
            <span className="font-display font-bold text-3xl text-brand-text">Guard</span>
            <span className="font-display font-bold text-3xl text-brand-accent">ian</span>
          </Link>
          <h2 className="font-display font-bold text-3xl text-brand-text">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="font-sans text-brand-muted mt-2">
            {isLogin ? 'Log in to manage your digital rights cases.' : 'Join the defense network.'}
          </p>
        </div>

        <div className="bg-brand-bg2 border border-brand-border rounded-[20px] p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className={`p-4 rounded-xl text-sm ${error.includes('successful') ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {error}
              </div>
            )}
            {!isLogin && (
              <div>
                <label className="block text-sm font-sans font-medium text-brand-text mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="w-5 h-5 flex items-center justify-center text-brand-muted">@</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 bg-brand-bg3 border border-brand-border rounded-xl py-3 text-brand-text font-sans focus:outline-none focus:border-brand-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-sans font-medium text-brand-text mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-brand-muted" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 bg-brand-bg3 border border-brand-border rounded-xl py-3 text-brand-text font-sans focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans font-medium text-brand-text mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-brand-muted" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 bg-brand-bg3 border border-brand-border rounded-xl py-3 text-brand-text font-sans focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-brand-muted hover:text-brand-text cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-brand-border bg-brand-bg accent-brand-accent" />
                Remember me
              </label>
              {isLogin && <a href="#" onClick={(e) => { e.preventDefault(); setError('Password reset link sent to your email address.'); }} className="font-medium text-brand-accent hover:text-brand-accent/80 transition-colors">Forgot password?</a>}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold font-sans text-white bg-brand-accent hover:bg-brand-accent/90 focus:outline-none transition-colors"
            >
              {isLogin ? 'Log in' : 'Create account'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-brand-bg2 text-brand-muted font-sans">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setError('Google login is not currently configured.')}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-brand-border rounded-xl shadow-sm bg-brand-bg hover:bg-brand-bg3 text-sm font-medium text-brand-text transition-colors"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setError('Apple login is not currently configured.')}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-brand-border rounded-xl shadow-sm bg-brand-bg hover:bg-brand-bg3 text-sm font-medium text-brand-text transition-colors"
              >
                <span className="sr-only">Sign in with Apple</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm0 18.571a8.571 8.571 0 1 1 0-17.142 8.571 8.571 0 0 1 0 17.142zM10 2.857A7.143 7.143 0 0 0 2.857 10a7.086 7.086 0 0 0 1.256 4.02L9.4 8.73A1.424 1.424 0 0 1 10 7.857a1.43 1.43 0 0 1 1.43 1.43c0 .351-.122.673-.327.915l-5.69 5.69A7.143 7.143 0 1 0 10 2.857zm4.248 10.988l-6.236-6.236A1.42 1.42 0 0 1 7.857 7.143a1.43 1.43 0 0 1 .42-1.01A7.143 7.143 0 0 1 17.143 10a7.088 7.088 0 0 1-2.895 3.845z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm font-sans">
            <span className="text-brand-muted">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-brand-accent hover:text-brand-accent/80 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-accent2/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}
