import { FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

export function Bio() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Jing Lee</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="tel:070-9017-3699" className="flex items-center text-gray-600 hover:text-gray-900">
          <FaPhone className="mr-2" />
          070-9017-3699
        </a>
        <a href="mailto:jasonleenz369@gmail.com" className="flex items-center text-gray-600 hover:text-gray-900">
          <FaEnvelope className="mr-2" />
          jasonleenz369@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/jing-lee-7b0745192/" className="flex items-center text-gray-600 hover:text-gray-900">
          <FaLinkedin className="mr-2" />
          LinkedIn
        </a>
        <a href="https://x.com/666888freedom" className="flex items-center text-gray-600 hover:text-gray-900">
          <FaTwitter className="mr-2" />
          Twitter
        </a>
      </div>
      <div className="text-gray-600 mb-4">Tokyo, Japan</div>
      <p className="text-gray-700">
        I'm passionate about creating beautiful, functional websites.
        I'm a proactive Frontend Developer with expertise in modern web development frameworks
        and a keen interest in scalable, user-focused application design. Skilled in full-stack development
        with a strong foundation in TypeScript, Angular, React, and Java ability to deliver robust, maintainable code
        while collaborating effectively within cross-functional teams. Excited to contribute to innovative
        projects at early-stage startups and embrace cutting-edge technologies.
      </p>
    </div>
  );
}