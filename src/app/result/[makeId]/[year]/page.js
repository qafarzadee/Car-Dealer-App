// src/app/result/[makeId]/[year]/page.js
import { Suspense } from 'react';

// Fetch vehicle models based on makeId and year
async function fetchModels(makeId, year) {
  const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
  const data = await res.json();
  return data.Results;
}

export default async function ResultPage({ params }) {
  const { makeId, year } = params;
  const models = await fetchModels(makeId, year);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="p-8">
        <h1 className="text-2xl mb-4">Selected Vehicle Models (Make ID: {makeId}, Year: {year})</h1>
        <ul className="list-disc pl-6">
          {models.map(model => (
            <li key={model.Model_ID} className="mb-2">{model.Model_Name}</li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}