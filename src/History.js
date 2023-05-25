import React from 'react';

const History = () => {
  return (
    <div className="chat-container">
      <div className="timestamp-column"> {/* 2 */}
        <p>10:00 AM</p>
        <p>10:05 AM</p>
        <p>10:10 AM</p>
        {/* Add more timestamps here */}
      </div>

      <div className="parameters-column"> {/* 2 */}
        <p>Parameter 1</p>
        <p>Parameter 2</p>
        <p>Parameter 3</p>
        {/* Add more parameters here */}
      </div>

      <div className="chat-column"> {/* 8 */}
        <div className="chat-row user-response">
          <p className="bold">User:</p>
          <p>Hi, how are you?</p>
        </div>

        <div className="chat-row model-response">
          <p className="bold">Model:</p>
          <p>I'm doing great, thanks for asking!</p>
        </div>

        {/* Add more chat rows here */}
      </div>

      <div className="image-column"> {/* 1 */}
        <img
          className="rounded-image"
          src="path_to_your_image.jpg"
          alt="User's Profile"
          width="10"
          height="10"
        />
      </div>
    </div>
  );
};

export default History;
