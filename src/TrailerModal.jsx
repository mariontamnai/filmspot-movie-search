import React from "react";

const TrailerModal = ({ trailerKey, onClose }) => {
  if (!trailerKey) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-3xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl"
        >
          ✖
        </button>
        <iframe
          width="100%"
          height="450"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
