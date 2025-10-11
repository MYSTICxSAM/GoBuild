import React from 'react';

// Define each video testimonial prop
const videoTestimonials = [
  {
    videoUrl: "https://www.youtube.com/embed/In1KOe8za5g", // Example link - replace with your own
    name: 'Darshan Gupta ji',
    feedback: 'Fantastic experience from start to finish. Highly recommend their services!'
  },
  {
    videoUrl: "https://www.youtube.com/embed/VdlUJDlzIIk",
    name: 'Rakesh Sharma',
    feedback: 'The support team was quick and reliable. Helped us achieve our goals smoothly.'
  },
  {
    videoUrl: 'https://www.youtube.com/embed/XM7Vyx0r3QU',
    name: 'Rakesh Patel',
    feedback: 'Their process was efficient and transparent. Will work again with them for sure!'
  }
];

const VideoTestimonialCard = ({ videoUrl, name, feedback }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300">
    <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
      <iframe
        src={videoUrl}
        title={name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
    <p className="italic text-gray-800 text-center mb-2">"{feedback}"</p>
    <div className="flex flex-col items-center">
      <span className="font-semibold text-gray-900">{name}</span>
    </div>
  </div>
);

const VideoTestimonials = () => (
  <section className="py-6 bg-gradient-to-r from-gray-50 to-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoTestimonials.map((testimonial, idx) => (
          <VideoTestimonialCard key={idx} {...testimonial} />
        ))}
      </div>
    </div>
  </section>
);

export default VideoTestimonials;
