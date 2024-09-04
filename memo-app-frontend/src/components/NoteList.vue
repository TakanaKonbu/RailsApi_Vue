<template>
    <div>
      <h1>Notes</h1>
      <ul>
        <li v-for="note in notes" :key="note.id">
          <strong>{{ note.title }}</strong>
          <p>{{ note.body }}</p>
          <button @click="editNote(note)">Edit</button>
          <button @click="deleteNote(note.id)">Delete</button>
        </li>
      </ul>
      <button @click="showCreateForm = true">Add Note</button>
      <NoteForm 
        v-if="showCreateForm || editingNote" 
        :note="editingNote || {}" 
        @save="saveNote" 
        @cancel="cancelEdit"
      />
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import NoteForm from './NoteForm.vue';
  
  export default {
    components: { NoteForm },
    data() {
      return {
        showCreateForm: false,
        editingNote: null
      };
    },
    computed: {
      ...mapGetters(['notes'])
    },
    methods: {
      ...mapActions(['fetchNotes', 'deleteNote']),
      editNote(note) {
        this.editingNote = { ...note };
        this.showCreateForm = false;
      },
      async saveNote(note) {
        if (note.id) {
          await this.$store.dispatch('updateNote', note);
        } else {
          await this.$store.dispatch('createNote', note);
        }
        this.cancelEdit();
      },
      cancelEdit() {
        this.showCreateForm = false;
        this.editingNote = null;
      }
    },
    async created() {
      await this.fetchNotes();
    }
  };
  </script>