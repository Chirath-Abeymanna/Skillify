import React from 'react';

interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="blog-card">
      <img src={imageUrl} alt={title} className="blog-card-image" />
      <div className="blog-card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <h3>Read more</h3>
      </div>
    </div>
  );
};

export default BlogCard;