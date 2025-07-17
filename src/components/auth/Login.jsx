import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import styles from '../../styles/auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { success } = await login({ email, password });
    setLoading(false);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Left Side - Image/Branding */}
      <div className={styles.authImageContainer}>
        <div className={styles.authImageContent}>
          <h1>Welcome to Our Store</h1>
          <p>Sign in to access your account and enjoy a seamless shopping experience with exclusive deals and personalized recommendations.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className={styles.authFormContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1 className={styles.authTitle}>Sign In</h1>
            <p className={styles.authSubtitle}>
              Don't have an account?{' '}
              <Link to="/register" className={styles.authLink}>
                Sign up <FiArrowRight style={{ verticalAlign: 'middle' }} />
              </Link>
            </p>
          </div>
          
          {error && (
            <div className={styles.errorMessage} role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className="relative">
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Email address"
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className="relative">
                <FiLock className={styles.inputIcon} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className={styles.loadingSpinner}></span>
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
            
            <div className={styles.divider}>
              <span>or continue with</span>
            </div>
            
            <div className={styles.socialButtons}>
              <button type="button" className={styles.socialButton}>
                <FaGoogle className="mr-2" /> Google
              </button>
              <button type="button" className={styles.socialButton}>
                <FaGithub className="mr-2" /> GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
