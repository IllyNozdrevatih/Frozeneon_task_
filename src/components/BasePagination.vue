<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <div class="d-md-flex d-none">
        <li
          class="page-item cursor-pointer"
          :class="{ disabled: currentPage === firstPage }"
          @click="moveToPagePrevPage"
        >
          <span class="page-link">Previous</span>
        </li>
        <li
          v-for="(firstPage, index) of lastPage"
          class="page-item cursor-pointer"
          :class="{ active: currentPage === firstPage }"
          :key="`base-pagination-${index}`"
          @click="moveToPage(firstPage)"
        >
          <span class="page-link">{{ firstPage }}</span>
        </li>
        <li
          class="page-item cursor-pointer"
          :class="{
            disabled: currentPage === lastPage,
          }"
          @click="moveToPageNextPage"
        >
          <span class="page-link">Next</span>
        </li>
      </div>
      <div class="d-md-none d-flex">
        <li
          class="page-item cursor-pointer"
          :class="{ disabled: currentPage === firstPage }"
          @click="moveToPagePrevPage"
        >
          <span class="page-link">Previous</span>
        </li>
        <li>
          <span
            class="page-link text-black-50 border-bottom-0 border-top-0 hover-none"
            >Page: {{ currentPage }} of {{ lastPage }}</span
          >
        </li>
        <li
          class="page-item cursor-pointer"
          :class="{
            disabled: currentPage === lastPage,
          }"
          @click="moveToPageNextPage"
        >
          <span class="page-link">Next</span>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    prevPage: {
      type: Number,
      default: 1,
    },
    nextPage: {
      type: Number,
      default: 2,
    },
    firstPage: {
      type: Number,
      default: 1,
    },
    lastPage: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {},
  mounted() {
    this.setCurrentPageNumber();
  },
  updated() {
    this.setCurrentPageNumber();
  },
  methods: {
    setCurrentPageNumber() {
      const queryPage = Number(this.$route.query.page);
      this.currentPage = queryPage ? queryPage : 1;
    },
    moveToPage(pageNum) {
      if (this.currentPage === pageNum) return;
      if (pageNum === 1) {
        this.$router.push(this.$route.path);
        this.$emit("update-pagination", pageNum);
        this.$forceUpdate();
        return;
      }
      this.$router.push({
        query: { page: pageNum },
      });
      this.$emit("update-pagination", pageNum);
      this.$forceUpdate();
    },
    moveToPagePrevPage() {
      if (this.currentPage === 1) return;
      this.moveToPage(this.currentPage - 1);
    },
    moveToPageNextPage() {
      if (this.currentPage === this.lastPage) return;
      this.moveToPage(this.currentPage + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.hover-none {
  &:hover {
    background-color: transparent;
  }
}
</style>
