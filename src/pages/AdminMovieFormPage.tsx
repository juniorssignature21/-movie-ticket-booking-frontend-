import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { createMovie, fetchGenres, fetchMovie, updateMovie } from '../api/movies';
import { getApiErrorMessage } from '../api/client';
import type { Genre, MovieStatus, MovieWritePayload } from '../types/movie';

const EMPTY_FORM: MovieWritePayload = {
  title: '',
  synopsis: '',
  poster_url: '',
  banner_url: '',
  trailer_url: '',
  duration_minutes: 100,
  release_date: new Date().toISOString().slice(0, 10),
  age_rating: 'PG',
  average_rating: 0,
  language: 'English',
  status: 'now_showing',
  is_trending: false,
  genres: [],
};

export const AdminMovieFormPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const isEditing = !!slug;
  const navigate = useNavigate();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [form, setForm] = useState<MovieWritePayload>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
    if (!slug) return;
    fetchMovie(slug)
      .then((movie) => {
        setForm({
          title: movie.title,
          synopsis: movie.synopsis,
          poster_url: movie.poster_url,
          banner_url: movie.banner_url,
          trailer_url: movie.trailer_url,
          duration_minutes: movie.duration_minutes,
          release_date: movie.release_date,
          age_rating: movie.age_rating,
          average_rating: Number(movie.average_rating),
          language: movie.language,
          status: movie.status,
          is_trending: movie.is_trending,
          genres: movie.genres.map((g) => g.id),
        });
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  const toggleGenre = (id: number) => {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.includes(id) ? prev.genres.filter((g) => g !== id) : [...prev.genres, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      if (isEditing && slug) {
        await updateMovie(slug, form);
      } else {
        await createMovie(form);
      }
      navigate('/admin/movies');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not save this movie.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PageShell>
        <p className="text-center text-gray-400 py-20">Loading movie...</p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-6 pb-16">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <h1 className="section-title">{isEditing ? 'Edit Movie' : 'Add Movie'}</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Title">
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input"
              />
            </Field>

            <Field label="Synopsis">
              <textarea
                required
                rows={4}
                value={form.synopsis}
                onChange={(e) => setForm({ ...form, synopsis: e.target.value })}
                className="input resize-none"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Poster URL">
                <input
                  required
                  type="url"
                  value={form.poster_url}
                  onChange={(e) => setForm({ ...form, poster_url: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Banner URL">
                <input
                  type="url"
                  value={form.banner_url}
                  onChange={(e) => setForm({ ...form, banner_url: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Trailer URL">
                <input
                  type="url"
                  value={form.trailer_url}
                  onChange={(e) => setForm({ ...form, trailer_url: e.target.value })}
                  className="input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Field label="Duration (min)">
                <input
                  required
                  type="number"
                  min={1}
                  value={form.duration_minutes}
                  onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })}
                  className="input"
                />
              </Field>
              <Field label="Release date">
                <input
                  required
                  type="date"
                  value={form.release_date}
                  onChange={(e) => setForm({ ...form, release_date: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Age rating">
                <input
                  required
                  value={form.age_rating}
                  onChange={(e) => setForm({ ...form, age_rating: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Language">
                <input
                  required
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as MovieStatus })}
                  className="input"
                >
                  <option value="now_showing">Now Showing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ended">Ended</option>
                </select>
              </Field>
              <Field label="Rating (0-10)">
                <input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={form.average_rating}
                  onChange={(e) => setForm({ ...form, average_rating: Number(e.target.value) })}
                  className="input"
                />
              </Field>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-300 font-semibold">
              <input
                type="checkbox"
                checked={form.is_trending}
                onChange={(e) => setForm({ ...form, is_trending: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
              Mark as trending
            </label>

            <Field label="Genres">
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => toggleGenre(genre.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      form.genres.includes(genre.id)
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:border-primary/40'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </Field>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/95 disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm tracking-wide transition-all duration-200 mt-2"
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Movie'}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-300">{label}</label>
    {children}
  </div>
);

export default AdminMovieFormPage;
