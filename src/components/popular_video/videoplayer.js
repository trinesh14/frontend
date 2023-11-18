

// export default VideoList;
// Import necessary libraries and styles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './VideoList.scss'; // Import your styles

// Define the VideoList component
const VideoList = () => {
  // State to store video data and filter criteria
  const [videoData, setVideoData] = useState([]);
  const [filterBy, setFilterBy] = useState('video_name');

  // Effect to fetch video data based on the filter criteria
  useEffect(() => {
    axios.post('https://nodeserver-production-3271.up.railway.app/api/user/videolist', { "filterby": filterBy })
      .then(response => {
        setVideoData(response.data.data);
      })
      .catch(error => console.error('Error fetching video data:', error));
  }, [filterBy]);

  // Function to chunk array into rows
  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  // VideoPlayerWithControls component
  const VideoPlayerWithControls = ({ video }) => {
    const [isPlaying, setPlaying] = useState(false);

    // Function to handle play/pause
    const handlePlayPause = () => {
      setPlaying(!isPlaying);
    };

    // Function to handle full screen
    const handleFullScreen = () => {
      const player = document.getElementById(`react-player-${video.id}`);
      if (player) {
        if (player.requestFullscreen) {
          player.requestFullscreen();
        } else if (player.mozRequestFullScreen) {
          player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) {
          player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) {
          player.msRequestFullscreen();
        }
      }
    };

    return (
      <div className='mobileview' style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginBottom: '20px', width: "33%" }}>
        {!isPlaying && (
          <div style={{ marginBottom: '10px', color: 'purple' }}>
            <strong>{video.video_name}</strong>
            <br />
            Language: {video.video_language}
            <br />
            Views: {video.views}
          </div>
        )}
        <button onClick={handlePlayPause} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'purple' }}>
          {isPlaying ? '❚❚ Pause' : '▶ Play'}
        </button>
        <button onClick={handleFullScreen} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'purple', marginLeft: '10px' }}>
          Full Screen
        </button>
        {isPlaying && (
          <ReactPlayer
            id={`react-player-${video.id}`}
            url={video.youtubelink}
            controls
            width="100%"
            height="100%"
          />
        )}
      </div>
    );
  };

  // Chunk video data into rows
  const videoRows = chunkArray(videoData, 3);

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  // Render the VideoList component
  return (
    <div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" value={filterBy} onChange={handleFilterChange}>
          <option value="video_name">Video Name</option>
          <option value="video_language">Video Language</option>
          <option value="views">Video View</option>
          {/* Add more filter options as needed */}
        </select>
      </div>
      {videoRows.map((row, rowIndex) => (
        <div className='unset_flex' key={rowIndex} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {row.map((video, index) => (
            <VideoPlayerWithControls key={index} video={video} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default VideoList;
