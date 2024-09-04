import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    notes: [],
    error: null
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    addNote(state, note) {
      state.notes.push(note);
    },
    updateNote(state, updatedNote) {
      const index = state.notes.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes.splice(index, 1, updatedNote);
      }
    },
    deleteNote(state, noteId) {
      state.notes = state.notes.filter(note => note.id !== noteId);
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchNotes({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/notes');
        commit('setNotes', response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        commit('setError', 'Failed to fetch notes. Please try again.');
        throw error;
      }
    },
    async createNote({ commit }, note) {
      try {
        const response = await axios.post('http://localhost:3000/notes', note);
        commit('addNote', response.data);
      } catch (error) {
        console.error('Error creating note:', error);
        commit('setError', 'Failed to create note. Please try again.');
        throw error;
      }
    },
    async updateNote({ commit }, note) {
      try {
        const response = await axios.put(`http://localhost:3000/notes/${note.id}`, note);
        commit('updateNote', response.data);
      } catch (error) {
        console.error('Error updating note:', error);
        commit('setError', 'Failed to update note. Please try again.');
        throw error;
      }
    },
    async deleteNote({ commit }, noteId) {
      try {
        await axios.delete(`http://localhost:3000/notes/${noteId}`);
        commit('deleteNote', noteId);
      } catch (error) {
        console.error('Error deleting note:', error);
        commit('setError', 'Failed to delete note. Please try again.');
        throw error;
      }
    }
  },
  getters: {
    notes: state => state.notes,
    error: state => state.error
  }
});