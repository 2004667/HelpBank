<template>
  <div class="pagination">
    <button v-for="pageNumber in totalPages" :key="pageNumber"
            @click="gotoPage(pageNumber)"
            :class="{ active: pageNumber === currentPage }">
      {{ pageNumber }}
    </button>
    <select v-model="pageSize" @change="changePageSize">
      <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    initialPageSize: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pageSizes: [5, 10, 15, 20], 
      pageSize: this.initialPageSize
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    }
  },
  methods: {
    gotoPage(pageNumber) {
      if (pageNumber !== this.currentPage) {
        this.$emit('page-change', pageNumber);
      }
    },
    changePageSize() {
      this.$emit('page-size-change', this.pageSize);
    }
  },
  watch: {
    initialPageSize(newVal) {
      this.pageSize = newVal;
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007BFF;
  color: white;
  border-color: #007BFF;
}

.pagination select {
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
