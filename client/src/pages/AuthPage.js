import React from 'react';

export const AuthPage = () => {
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
                />
                <label className="white-text" htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input 
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                />
                <label className="white-text" htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4 mr-1">Sign in</button>
            <button className="btn grey lighten-1 black-text">Registration</button>
          </div>
        </div>
      </div>
    </div>
  );
};