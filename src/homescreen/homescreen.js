import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext.js';
import Header from '../components/Header.js';
import Sidebar from '../components/Sidebar.js';
import SchedulePage from '../components/SchedulePage.js';
import './homescreen.css';
import { generateSocialMediaPost } from '../services/geminiService.js';

const Homescreen = () => {
  const { theme } = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSelectedPlatforms, setShowSelectedPlatforms] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showGeneratedPosts, setShowGeneratedPosts] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);
  const [showSchedulePage, setShowSchedulePage] = useState(false);
  const fileInputRef = useRef(null);

  const [generatedPosts, setGeneratedPosts] = useState({});
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  const handleGetStarted = () => {
    setShowJourney(true);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCreatePost = () => {
    if (showSelectedPlatforms) {
      setShowGeneratedPosts(true);
    } else {
      setShowCreatePost(true);
    }
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      }
      return [...prev, platform];
    });
  };

  const handleContinue = async () => {
    setShowSelectedPlatforms(true);
    setLoadingPosts(true);
    setGenerationError(null);
    setGeneratedPosts({});
    try {
      const results = {};
      for (const platform of selectedPlatforms) {
        try {
          const post = await generateSocialMediaPost(prompt, platform);
          results[platform] = post;
        } catch (err) {
          results[platform] = { error: 'Failed to generate post.' };
        }
      }
      setGeneratedPosts(results);
      setShowGeneratedPosts(true);
    } catch (err) {
      setGenerationError('Failed to generate posts. Please try again.');
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddMore = () => {
    setShowSelectedPlatforms(false);
  };

  const handleBack = () => {
    setShowCreatePost(false);
    setSelectedPlatforms([]);
  };

  const handleSavePost = () => {
    setShowSaveModal(true);
    setShowGeneratedPosts(false);
  };

  const handleSaveConfirm = () => {
    if (postTitle.trim()) {
      const newSavedPost = {
        id: Date.now(),
        title: postTitle,
        content: prompt,
        platforms: selectedPlatforms,
        attachments: attachments,
        createdAt: new Date().toISOString()
      };
      setSavedPosts(prev => [...prev, newSavedPost]);
      setShowSaveModal(false);
      setPostTitle('');
      setShowCreatePost(false);
    }
  };

  const handleSchedule = () => {
    setShowSchedulePage(true);
  };

  const handleBackFromSchedule = () => {
    setShowSchedulePage(false);
  };

  const socialPlatforms = [
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'pinterest', name: 'Pinterest', icon: '📌' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'youtube', name: 'YouTube', icon: '🎥' },
    { id: 'reddit', name: 'Reddit', icon: '🔴' }
  ];

  if (showCreatePost) {
    return (
      <div className="create-post-page" style={{ backgroundColor: theme.background, color: theme.text }}>
        <div className="create-post-container">
          <div className="create-post-header">
            <button className="back-button" onClick={handleBack}>
              ← Back
            </button>
            <h1>Create New Post</h1>
          </div>

          {!showSelectedPlatforms ? (
            <>
              {/* Prompt Section */}
              <div className="prompt-section">
                <h2>What would you like to post?</h2>
                <div className="prompt-input-container">
                  <textarea
                    className="prompt-input"
                    placeholder="Write your post content or describe what you want to create..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                  />
                  <div className="attachment-section">
                    <div className="attachment-preview">
                      {attachments.map((file, index) => (
                        <div key={index} className="attachment-item">
                          <span className="file-name">{file.name}</span>
                          <button 
                            className="remove-attachment"
                            onClick={() => handleRemoveAttachment(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="add-attachment"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="attachment-icon">📎</span>
                      Add Files
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      multiple
                      style={{ display: 'none' }}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                  </div>
                </div>
              </div>

              {/* Platform Selection Section */}
              <div className="platform-selection-section">
                <h2>Select Social Media Platforms</h2>
                <p>Choose where you want to post your content</p>
                
                <div className="platform-grid">
                  {socialPlatforms.map(platform => (
                    <div
                      key={platform.id}
                      className={`platform-card ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
                      onClick={() => handlePlatformSelect(platform.id)}
                    >
                      <div className="platform-icon">{platform.icon}</div>
                      <h3>{platform.name}</h3>
                    </div>
                  ))}
                </div>

                <div className="action-buttons">
                  <button 
                    className="continue-button"
                    onClick={handleContinue}
                    disabled={selectedPlatforms.length === 0 || !prompt.trim()}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          ) : !showGeneratedPosts ? (
            <div className="selected-platforms-section">
              <h2>Generating posts for selected platforms...</h2>
              {loadingPosts && <p>Generating posts, please wait...</p>}
              {generationError && <p style={{ color: 'red' }}>{generationError}</p>}
            </div>
          ) : (
            <div className="generated-posts-section">
              <h2>Generated Posts</h2>
              <div className="generated-posts-grid">
                {selectedPlatforms.map(platformId => {
                  const platform = socialPlatforms.find(p => p.id === platformId);
                  const post = generatedPosts[platformId];
                  return (
                    <div key={platformId} className="generated-post-card">
                      <div className="platform-header">
                        <div className="platform-icon">{platform.icon}</div>
                        <h3>{platform.name}</h3>
                      </div>
                      <div className="post-content">
                        {post ? (
                          post.error ? (
                            <span style={{ color: 'red' }}>{post.error}</span>
                          ) : (
                            <>
                              <p>{post.content}</p>
                              {post.hashtags && post.hashtags.length > 0 && (
                                <div className="hashtags-list">
                                  {post.hashtags.map((tag, idx) => (
                                    <span key={idx} className="hashtag">#{tag}</span>
                                  ))}
                                </div>
                              )}
                              <div className="character-count">
                                Character count: {post.characterCount}
                              </div>
                            </>
                          )
                        ) : (
                          <span>Loading...</span>
                        )}
                      </div>
                      <div className="post-actions">
                        <button className="action-icon regenerate-icon" title="Regenerate">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="action-icon edit-icon" title="Edit">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="action-icon custom-prompt-icon" title="Custom Prompt">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="action-buttons">
                <button className="add-more-platform" onClick={handleAddMore}>
                  Add/Remove Platforms
                </button>
                <button className="save-button" onClick={handleSavePost}>
                  Save Post
                </button>
                <button className="schedule-button" onClick={handleSchedule}>
                  Schedule
                </button>
                <button className="post-button">
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showSaveModal) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Save Post</h2>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Enter post title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="title-input"
            />
          </div>
          <div className="modal-actions">
            <button className="cancel-button" onClick={() => setShowSaveModal(false)}>
              Cancel
            </button>
            <button 
              className="save-button"
              onClick={handleSaveConfirm}
              disabled={!postTitle.trim()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showSchedulePage) {
    return <SchedulePage onBack={handleBackFromSchedule} />;
  }

  return (
    <div className="homescreen" style={{ backgroundColor: theme.background, color: theme.text }}>
      {!showJourney && <Header onLoginClick={handleLoginClick} />}
      
      <main className={`main-content ${showJourney ? 'journey-active' : ''}`}>
        {!showJourney ? (
          <>
            {/* Hero Section */}
            <section id="home" className="hero">
              <div className="hero-content">
                <h1>AI-Powered Social Media Management</h1>
                <p>Streamline your social media presence with our intelligent automation platform</p>
                <button className="cta-button" onClick={handleGetStarted}>
                  Get Started
                </button>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
              <h2>Key Features</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3>AI Content Generation</h3>
                  <p>Create engaging posts automatically with our advanced AI algorithms</p>
                </div>
                <div className="feature-card">
                  <h3>Smart Scheduling</h3>
                  <p>Optimize your posting schedule for maximum engagement</p>
                </div>
                <div className="feature-card">
                  <h3>Analytics Dashboard</h3>
                  <p>Track performance and gain insights with detailed analytics</p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="cta-section">
              <h2>Ready to Transform Your Social Media?</h2>
              <p>Join thousands of businesses already using our platform</p>
              <button className="cta-button" onClick={handleGetStarted}>
                Get Started Now
              </button>
            </section>
          </>
        ) : (
          <>
            {/* Menu Toggle Button */}
            <button 
              className="menu-toggle"
              onClick={() => setIsSidebarOpen(true)}
              style={{ 
                backgroundColor: theme.cardBg,
                color: theme.text,
                border: `2px solid ${theme.primary}`
              }}
            >
              ☰
            </button>

            {/* Sidebar */}
            <Sidebar 
              isOpen={isSidebarOpen} 
              onClose={() => setIsSidebarOpen(false)} 
            />

            <div className="journey-section">
              <div className="journey-card">
                <h2>Start Your Journey</h2>
                <p>Begin your social media management journey with AI</p>
                
                {/* Create New Post Box */}
                <div className="create-post-box" onClick={handleCreatePost}>
                  <div className="create-post-content">
                    <div className="create-post-icon">✏️</div>
                    <h3>Create a New Post</h3>
                    <p>Start creating engaging content for your social media</p>
                  </div>
                </div>

                <div className="menu-grid">
                  <div className="menu-box">
                    <div className="menu-icon">📊</div>
                    <h3>Dashboard</h3>
                    <p>View your social media analytics and performance</p>
                  </div>
                  <div className="menu-box">
                    <div className="menu-icon">📝</div>
                    <h3>Content</h3>
                    <p>Create and manage your social media content</p>
                  </div>
                  <div className="menu-box">
                    <div className="menu-icon">📅</div>
                    <h3>Schedule</h3>
                    <p>Plan and schedule your posts</p>
                  </div>
                  <div className="menu-box">
                    <div className="menu-icon">🤖</div>
                    <h3>AI Generator</h3>
                    <p>Generate content with AI assistance</p>
                  </div>
                  <div className="menu-box">
                    <div className="menu-icon">📁</div>
                    <h3>Media Library</h3>
                    <p>Manage your media assets</p>
                  </div>
                  <div className="menu-box">
                    <div className="menu-icon">📈</div>
                    <h3>Analytics</h3>
                    <p>Track your social media performance</p>
                  </div>
                </div>
                <button className="start-journey-button">Get Started</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Homescreen;
