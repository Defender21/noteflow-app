import React, { useState, useEffect, useMemo } from 'react';
import { useService } from './di/DIContext';

export const App = () => {
  const apiService = useService('apiService');
  const storageService = useService('storageService');

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await apiService.fetchNotes();
      setNotes(data);
    } catch (err) {
      console.error('Помилка завантаження нотаток:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    return notes
      .filter((n) => {
        if (selectedCategory && n.category !== selectedCategory) return false;
        if (selectedTag && !n.tags?.includes(selectedTag)) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
  }, [notes, selectedCategory, selectedTag, searchQuery]);

  return (
    <div className="app-container">
      <h1>NoteFlow Pro — Менеджер нотаток</h1>
      {loading ? (
        <p>Завантаження даних...</p>
      ) : (
        <div className="notes-list">
          {filteredNotes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>Категорія: {note.category}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
