import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../../styles/auth.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords don't match");
    }

    setLoading(true);
    const { success, error } = await register({ name, email, password });
    setLoading(false);
    
    if (success) {
      navigate('/');
    } else {
      setError(error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>Create Account</h1>
          <p className={styles.authSubtitle}>
            Already have an account?{' '}
            <Link to="/login" className={styles.authLink}>
              Sign in
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
            <label htmlFor="name" className={styles.formLabel}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={styles.formInput}
              placeholder="John Doe"
              value={name}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={styles.formInput}
              placeholder="you@example.com"
              value={email}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className={styles.formInput}
              placeholder="••••••••"
              value={password}
              onChange={handleChange}
            />
            <div className={styles.passwordStrength}>
              <div 
                className={styles.passwordStrengthBar}
                style={{
                  width: password.length > 0 
                    ? (password.length < 6 
                        ? '33%' 
                        : (password.length < 10 ? '66%' : '100%'))
                    : '0%',
                  backgroundColor: password.length > 0
                    ? (password.length < 6 
                        ? '#ef4444' 
                        : (password.length < 10 ? '#f59e0b' : '#10b981'))
                    : 'transparent'
                }}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className={`${styles.formInput} ${confirmPassword && password !== confirmPassword ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={handleChange}
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-sm text-red-600">Passwords don't match</p>
            )}
          </div>

          <div className={styles.formGroup} style={{ marginTop: '2rem' }}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? (
                <>
                  <span className={styles.loadingSpinner}></span>
                  Creating Account...
                </>
              ) : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
