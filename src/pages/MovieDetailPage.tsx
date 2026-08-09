import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Clock, Calendar } from 'lucide-react';
import PageShell from '../components/PageShell';
import { fetchMovie } from '../api/movies';
import { fetchShowtimesForMovie } from '../api/cinemas';
import { useAuth } from '../context/AuthContext';
import type { MovieDetail } from '../types/movie';
import type { Showtime } from '../types/cinema';

function nextNDays(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
}

export const MovieDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const days = useMemo(() => nextNDays(7), []);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    fetchMovie(slug)
      .then(setMovie)
      .finally(() => setIsLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const dateStr = days[selectedDate].toISOString().slice(0, 10);
    fetchShowtimesForMovie(slug, { date: dateStr }).then(setShowtimes);
  }, [slug, selectedDate, days]);

  const handleSelectShowtime = (showtimeId: number) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/showtimes/${showtimeId}/seats` } } });
      return;
    }
    navigate(`/showtimes/${showtimeId}/seats`);
  };

  if (isLoading) {
    return (
      <PageShell>
        <p className="text-center text-gray-400 py-20">Loading movie...</p>
      </PageShell>
    );
  }

  if (!movie) {
    return (
      <PageShell>
        <p className="text-center text-gray-400 py-20">Movie not found.</p>
      </PageShell>
    );
  }

  const showtimesByTheater = showtimes.reduce<Record<string, Showtime[]>>((acc, st) => {
    const key = `${st.screen.theater.name} — ${st.screen.theater.city}`;
    acc[key] = acc[key] ? [...acc[key], st] : [st];
    return acc;
  }, {});

  return (
    <PageShell>
      {/* Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full -mt-28 md:-mt-32">
        <img
          src={movie.banner_url || movie.poster_url}
          alt={movie.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />
      </div>

      <div className="px-6 md:px-12 lg:px-24 -mt-32 md:-mt-40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-40 md:w-64 rounded-2xl border border-white/10 shadow-2xl flex-shrink-0"
          />

          <div className="flex flex-col gap-4 flex-grow">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
              <div className="flex items-center gap-1.5 text-yellow-500 font-semibold">
                <Star size={16} className="fill-yellow-500" />
                <span>{Number(movie.average_rating).toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{movie.duration_minutes} min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{new Date(movie.release_date).toLocaleDateString()}</span>
              </div>
              <span className="bg-white/10 px-2 py-0.5 rounded text-xs font-bold">{movie.age_rating}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span key={g.id} className="bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-gray-400 leading-relaxed max-w-3xl">{movie.synopsis}</p>
          </div>
        </div>

        {/* Cast */}
        {movie.cast.length > 0 && (
          <div className="mt-12 max-w-7xl mx-auto">
            <h2 className="section-title mb-6">Cast</h2>
            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
              {movie.cast.map((c) => (
                <div key={c.actor.id} className="flex flex-col items-center text-center flex-shrink-0 w-24">
                  <div className="actor-circle w-20 h-20 mb-2">
                    <img src={c.actor.image_url} alt={c.actor.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-white text-xs font-semibold line-clamp-1">{c.actor.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Showtimes */}
        <div className="mt-12 max-w-7xl mx-auto pb-16">
          <h2 className="section-title mb-6">Showtimes</h2>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4">
            {days.map((d, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDate(idx)}
                className={`flex flex-col items-center justify-center min-w-[64px] py-2.5 rounded-xl border transition-all duration-200 ${
                  selectedDate === idx
                    ? 'bg-primary border-primary text-white'
                    : 'bg-card border-white/10 text-gray-300 hover:border-primary/40'
                }`}
              >
                <span className="text-xs font-semibold">{d.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                <span className="text-lg font-bold">{d.getDate()}</span>
              </button>
            ))}
          </div>

          {Object.keys(showtimesByTheater).length === 0 ? (
            <p className="text-gray-400 mt-4">No showtimes available for this date.</p>
          ) : (
            <div className="flex flex-col gap-6 mt-4">
              {Object.entries(showtimesByTheater).map(([theaterName, sts]) => (
                <div key={theaterName} className="bg-card border border-white/5 rounded-2xl p-5">
                  <h3 className="text-white font-bold mb-3">{theaterName}</h3>
                  <div className="flex flex-wrap gap-3">
                    {sts.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => handleSelectShowtime(st.id)}
                        className="bg-white/5 hover:bg-primary hover:text-white border border-white/10 hover:border-primary text-gray-200 font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-200"
                      >
                        {new Date(st.start_time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        <span className="ml-1.5 text-xs opacity-70">{st.format}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default MovieDetailPage;
