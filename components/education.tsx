export function Education() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-card p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Education</h3>
        <div className="text-muted-foreground">
          <p className="font-medium">Shandong Agricultural University</p>
          <p>Bachelor of Science in Vehicle Engineering</p>
          <p className="text-gray-500">China</p>
        </div>
      </div>

      <div className="bg-card p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Languages</h3>
        <ul className="list-disc list-inside text-muted-foreground">
          <li>English: Fluent (IELTS Band 6.0)</li>
          <li>Japanese: N2 Certificate</li>
        </ul>
      </div>
    </div>
  );
}