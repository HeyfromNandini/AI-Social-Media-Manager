import React, { useState } from 'react';
import { generateSocialMediaPost } from '../services/geminiService';
import './SocialMediaPostGenerator.css';

const SocialMediaPostGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const platforms = [
    { id: 'twitter', name: 'Twitter', maxLength: 280 },
    { id: 'linkedin', name: 'LinkedIn', maxLength: 3000 },
    { id: 'instagram', name: 'Instagram', maxLength: 2200 },
    { id: 'facebook', name: 'Facebook', maxLength: 63206 }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateSocialMediaPost(prompt, platform);
      setResult(response);
    } catch (err) {
      setError('Failed to generate post. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-generator">
      <h2>Social Media Post Generator</h2>
      
      <form onSubmit={handleSubmit} className="generator-form">
        <div className="form-group">
          <label>Select Platform:</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="form-control"
          >
            {platforms.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} (max {p.maxLength} chars)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Your Prompt:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="form-control"
            placeholder="Enter your topic or idea..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Generating...' : 'Generate Post'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {result && (
        <div className="result-container">
          <h3>Generated Post:</h3>
          <p className="post-content">{result.content}</p>
          
          {result.hashtags && result.hashtags.length > 0 && (
            <div className="hashtags-container">
              <p className="hashtags-title">Hashtags:</p>
              <div className="hashtags-list">
                {result.hashtags.map((tag, index) => (
                  <span key={index} className="hashtag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="character-count">
            Character count: {result.characterCount}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaPostGenerator; 