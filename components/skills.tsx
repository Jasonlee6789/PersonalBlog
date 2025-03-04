export function Skills() {
  const skills = {
    'Programming Language': ['Typescript', 'JavaScript (ES6+)', 'HTML5', 'CSS/SASS'],
    'Related-Framework': ['React', 'Angular', 'Next', 'Jest', 'Ionic', 'Ant Design', 'Tailwinds'],
    'Tools & Platforms': ['VS code', 'WebStorm', 'GitHub', 'Docker', 'Figma/Framer (for UI/UX design)'],
    'Development Practices': ['Unit Testing (Jest)', 'TDD', 'CI/CD pipelines'],
    'API Integration': ['RESTful APIs', 'WebSocket (JSON-RPC)'],
    'Additional Skills': ['Internationalization (i18n)', 'Functional Programming Paradigms']
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="bg-card p-4 rounded-lg">
          <h3 className="font-semibold mb-2">{category}</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            {items.map((skill) => (
              <li key={skill} className="text-gray-600">{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}