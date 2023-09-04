
import React from 'react';


export default function VideoBackground() {
    return (
        <div className="video-background">
        <video autoPlay loop muted>
            hjhhk
          <source src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4"/>
          {/* Add additional source elements for different video formats */}
          Your browser does not support the video tag.
        </video>
        {/* Your content overlays */}
      </div>
      );
}

  
 