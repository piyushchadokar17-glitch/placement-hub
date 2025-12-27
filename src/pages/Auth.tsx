import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import heroCampus from '@/assets/hero-campus.jpg';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, isLoading } = useAuthStore();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLoginMode) {
        await login(email, password, role);
      } else {
        await signup(email, password, name, role);
      }
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <img
          src={heroCampus}
          alt="Campus"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl">Placement Portal</span>
          </div>

          {/* Hero Text */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight mb-4 animate-fade-in">
              Launch Your Career<br />With Confidence.
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 animate-fade-in stagger-1 opacity-0">
              Access exclusive placement drives, manage your resume, prepare for mock interviews, and connect with top recruiters directly from your campus dashboard.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-12 animate-fade-in stagger-2 opacity-0">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-primary-foreground/70 text-sm">Companies Hiring</p>
            </div>
            <div>
              <p className="text-3xl font-bold">92%</p>
              <p className="text-primary-foreground/70 text-sm">Placement Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">
              Please enter your details to access your dashboard.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-muted rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                isLoginMode
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                !isLoginMode
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                I am a
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="input-field"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Name (signup only) */}
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="input-field"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Password
                </label>
                {isLoginMode && (
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLoginMode ? 'Log In to Dashboard' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="btn-outline w-full"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-primary font-medium hover:underline"
            >
              {isLoginMode ? 'Register your College ID' : 'Log in'}
            </button>
          </p>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
}
