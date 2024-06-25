<template>
  <div></div>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    data: Array,
    query: String,
    filterType: String
  },
  methods: {
    applyFilter() {
      if (!this.query) return this.data;

      const normalizedQuery = this.query.toLowerCase();
      if (this.filterType === 'title') {
        return this.data.filter(item => item.title.toLowerCase().includes(normalizedQuery));
      } else if (this.filterType === 'fullname') {
        return this.data.filter(item => item.fullname.toLowerCase().includes(normalizedQuery));
      } else if (this.filterType === 'titleOrFullname') {
        return this.data.filter(item =>
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.fullname.toLowerCase().includes(normalizedQuery)
        );
      } else {
        return this.data;
      }
    }
  }
};
</script>
<style scoped>

</style>