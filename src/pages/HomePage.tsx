import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient'; // Assuming path is src/api/axiosClient.ts
import { Experience } from '../types'; // Assuming path is src/types.ts
import ExperienceCard from '../components/ExperienceCard';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    let mounted = true;
    axiosClient
      .get('/experiences')
      .then((res) => {
        if (!mounted) return;
        setExperiences(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = experiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(searchQuery) ||
          (exp.city && exp.city.toLowerCase().includes(searchQuery)) || // Added city to search
          exp.description.toLowerCase().includes(searchQuery)
      );
      setFiltered(results);
    } else {
      setFiltered(experiences);
    }
  }, [searchQuery, experiences]);

  return (
    <div
      className="min-h-screen px-6 py-8 bg-pageBg" // Replaced inline style
    >
      <h2 className="text-2xl font-semibold mb-6 text-darkText"> {/* Added text-darkText */}
        {searchQuery
          ? `Showing results for "${searchQuery}"`
          : 'Experiences'}
      </h2>
      {loading ? (
        <div className="text-mediumGray mt-10">Loading...</div> 
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      ) : (
        <div className="text-mediumGray mt-10"> {/* Replaced text-gray-500 */}
          No experiences found {searchQuery && `for "${searchQuery}"`}.
        </div>
      )}
    </div>
  );
}