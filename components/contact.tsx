import { FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export function Contact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a
        href="mailto:jasonleenz369@gmail.com"
        className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <FaEnvelope className="text-2xl text-gray-600 mr-4" />
        <div>
          <h3 className="font-semibold text-gray-800">Email</h3>
          <p className="text-gray-600">jasonleenz369@gmail.com</p>
        </div>
      </a>

      <a
        href="tel:070-9017-3699"
        className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <FaPhone className="text-2xl text-gray-600 mr-4" />
        <div>
          <h3 className="font-semibold text-gray-800">Phone</h3>
          <p className="text-gray-600">070-9017-3699</p>
        </div>
      </a>

      <a
        href="https://www.linkedin.com/in/jing-lee-7b0745192/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <FaLinkedin className="text-2xl text-gray-600 mr-4" />
        <div>
          <h3 className="font-semibold text-gray-800">LinkedIn</h3>
          <p className="text-gray-600">View Profile</p>
        </div>
      </a>

      <a
        href="https://x.com/666888freedom"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <FaTwitter className="text-2xl text-gray-600 mr-4" />
        <div>
          <h3 className="font-semibold text-gray-800">Twitter</h3>
          <p className="text-gray-600">View Profile</p>
        </div>
      </a>

      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm md:col-span-2">
        <FaMapMarkerAlt className="text-2xl text-gray-600 mr-4" />
        <div>
          <h3 className="font-semibold text-gray-800">Location</h3>
          <p className="text-gray-600">Tokyo, Japan</p>
        </div>
      </div>
    </div>
  );
}