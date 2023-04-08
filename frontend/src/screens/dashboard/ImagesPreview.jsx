import React from "react";

const ImagesPreview = ({ url, heading }) => {
  return (
    <div>
      {url && (
        <div>
          <h1 className="right-heading">{heading}</h1>
          <div className="preivew-image">
            <img
              src={url}
              alt={heading}
              className="w-fulll h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesPreview;
