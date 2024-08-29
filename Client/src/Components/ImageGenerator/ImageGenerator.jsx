import React, { useRef, useState, useEffect } from 'react';
import './ImageGenerator.css';
import defaultImage from '../Assets/default_image.svg';
import axios from 'axios';
import Replicate from "replicate";

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const inputRef = useRef(null);


  const generateImage = async () => {
    if (inputRef.current.value === "") return;
    const prompt= inputRef.current.value;
    try {
        const res = await axios.post('https://imageapi-cqwk.onrender.com/generate-image', { prompt });
        console.log(res);
        setImageUrl(res.data.output);
    } catch (error) {
        console.error('Error:', error);
        setImageUrl('Error: ' + error.message);
    }
    console.log(imageUrl)
    

  };

  return (
    <div className='ai-image-generator'>
      <div className="header">AI Image <span>Generator</span></div>
      <div className="img-loading">
        <div className="image"><img src={imageUrl === "/" ? defaultImage : imageUrl} alt="Generated Image" /></div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see...' />
        <div className="generate-btn" onClick={generateImage}>Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;
