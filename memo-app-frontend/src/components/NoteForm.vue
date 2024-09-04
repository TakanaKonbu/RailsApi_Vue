<template>
    <div>
      <h2>{{ localNote.id ? 'Edit Note' : 'Add Note' }}</h2>
      <form @submit.prevent="saveNote">
        <label for="title">Title:</label>
        <input v-model="localNote.title" id="title" required>
        <label for="body">Body:</label>
        <textarea v-model="localNote.body" id="body" required></textarea>
        <button type="submit">Save</button>
        <button type="button" @click="$emit('cancel')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      note: {
        type: Object,
        default: () => ({ id: null, title: '', body: '' })
      }
    },
    data() {
      return {
        localNote: { ...this.note }
      };
    },
    methods: {
      saveNote() {
        this.$emit('save', this.localNote);
      }
    },
    watch: {
      note: {
        handler(newVal) {
          this.localNote = { ...newVal };
        },
        deep: true,
        immediate: true
      }
    }
  };
  </script>
  