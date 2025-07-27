import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const API_URL = 'http://localhost:3001';

function Home() {
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/get`);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

 
  const handleUpdate = async (id) => {
    const newTitle = prompt('Enter new title:');
    if (!newTitle) return;
    const newContent = prompt('Enter new content:');
    if (!newContent) return;
    const newImgUrl = prompt('Enter new image URL:');
    if (!newImgUrl) return;
    try {
      const post = posts.find(p => p._id === id);
      const updated = { ...post, title: newTitle, content: newContent, img_url: newImgUrl };
      await axios.put(`${API_URL}/update/${id}`, updated);
      setPosts(posts.map(p => (p._id === id ? { ...p, title: newTitle, content: newContent, img_url: newImgUrl } : p)));
    } catch (err) {
      alert('Failed to update');
    }
  };

  return (
    <div>
      <h1></h1>
      <br /><br /><br />
      <div className="home-container">
        {posts.map(post => (
          <div key={post._id} className="blog-card">
            <img src={post.img_url} alt={post.title} className="blog-image" />
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="buttons">
             
              <button onClick={() => handleDelete(post._id)}>Delete</button>
               <button onClick={() => handleUpdate(post._id)}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
