
import React from 'react';
import video from '../VideoBackground/1061377330-preview.mp4'

export default function VideoBackground() {
    return (
        <div className="video-background">
        <video autoPlay loop muted>
            hjhhk
          <source src={video}/>
          {/* Add additional source elements for different video formats */}
          Your browser does not support the video tag.
        </video>
        {/* Your content overlays */}
      </div>
      );
}

  
 