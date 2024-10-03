import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import imageCar from './image.jpg';

function App() {
  const [formData, setFormData] = useState({
    buying: '',
    maint: '',
    doors: '',
    persons: '',
    lug_boot: '',
    safety: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        withCredentials: true, // Include credentials
      });
      setResult(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Car Evaluation</h2>
          <p className="mt-3">
            This application evaluates cars based on various parameters. 
            You can input the buying price, maintenance cost, number of doors, 
            number of persons, lug boot size, and safety rating to get an evaluation result.
          </p>
          <img src={imageCar} alt="Car Evaluation" className="img-fluid mt-3" />
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
            <div className="form-group">
              <label htmlFor="buying">Buying</label>
              <select name="buying" id="buying" className="form-control" onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="vhigh">Very High</option>
                <option value="high">High</option>
                <option value="med">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="maint">Maintenance</label>
              <select name="maint" id="maint" className="form-control" onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="vhigh">Very High</option>
                <option value="high">High</option>
                <option value="med">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="doors">Doors</label>
              <select name="doors" id="doors" className="form-control" onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5more">5 or more</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="persons">Persons</label>
              <select name="persons" id="persons" className="form-control" onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="more">More</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lug_boot">Lug Boot</label>
              <select name="lug_boot" id="lug_boot" className="form-control" onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="small">Small</option>
                <option value="med">Medium</option>
                <option value="big">Big</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="safety">Safety</label>
              <select name="safety" id="safety" className="form-control" onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="low">Low</option>
                <option value="med">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Evaluate</button>
          </form>

          {result && <h3 className="mt-3 text-center">Prediction: {result}</h3>}
          {error && <h3 className="mt-3 text-danger text-center">{error}</h3>}
        </div>
      </div>
    </div>
  );
}

export default App;
