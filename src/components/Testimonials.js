import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Social Media Manager",
    company: "TechStart Inc.",
    content: "This platform has revolutionized how we manage our social media presence. The AI content generation is incredibly accurate and saves us hours every week."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "GrowthWave",
    content: "The analytics dashboard provides insights we never had access to before. It's like having a crystal ball for social media performance."
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Content Creator",
    company: "Creative Solutions",
    content: "The scheduling feature is a game-changer. I can plan my content weeks in advance and the AI ensures it's posted at optimal times."
  }
];

const Testimonials = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="testimonials-container" style={{ backgroundColor: theme.cardBg }}>
      <h2>What Our Users Say</h2>
      <div className="testimonials-slider">
        <div 
          className="testimonials-track"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card"
              style={{ backgroundColor: theme.background }}
            >
              <p className="testimonial-content">{testimonial.content}</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
                <p className="company">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            style={{
              backgroundColor: index === currentIndex ? theme.primary : theme.border
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials; 