export function Experience() {
  const experiences = [
    {
      title: 'Web Developer',
      company: 'Girasol Energy Co., Ltd.',
      location: 'Tokyo, Japan',
      period: 'Jul 2023 - Present',
      responsibilities: [
        'Developed and maintained large-scale energy management systems using Angular, TypeScript, and Ionic, improving system scalability and performance.',
        'Integrated WebSocket connections via JSON-RPC for real-time data communication.',
        'Enhanced CI/CD pipelines using GitHub Actions to streamline deployment processes.',
        'Documented software specifications and conducted thorough unit testing to ensure reliability.'
      ]
    },
    {
      title: 'Web Developer',
      company: 'Nissin Scientia Co., Ltd.',
      location: 'Tokyo, Japan',
      period: 'Dec 2019 - Apr 2023',
      responsibilities: [
        'Built web applications for personnel management systems using React and TypeScript, focusing on intuitive UI/UX design.',
        'Implemented rigorous unit testing with Jest to improve code quality and reduce bugs.',
        'Managed RESTful API integration, contributing to a streamlined workflow between front-end and back-end teams.'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div key={index} className="border-l-4 border-primary pl-4">
          <h3 className="text-xl font-semibold">{exp.title}</h3>
          <p className="text-gray-600">{exp.company}</p>
          <p className="text-gray-500 mb-2">{exp.period}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {exp.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}