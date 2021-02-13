import React, { useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '', password: ''
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      message(data.message);
    } catch (error) {}
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Project Name</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input 
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                />
                <label className="white-text" htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input 
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={changeHandler}
                />
                <label className="white-text" htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4 mr-1"
              disabled={loading}
              onClick={loginHandler}
            >
              Sign in
            </button>
            <button
              className="btn grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};