<template>
  <div class="search-bar" style="margin-bottom: 12px;">
    <div class="dropdown">
      <div class="dropdown__btn">
        <p>{{ sortText }}</p>
        <i class="material-icons-outlined">
          expand_more
        </i>
      </div>
      <ul class="dropdown__items">
        <li class="dropdown__item" @click="onSort('desc')">最新貼文</li>
        <li class="dropdown__item" @click="onSort('asc')">最舊貼文</li>
      </ul>
    </div>
    <div class="search-input">
      <div class="search-input__input">
        <input
          type="text"
          name="name"
          placeholder="搜尋貼文"
          v-model="keyword"
        >
      </div>
      <button class="search-input__btn" @click="onSearch">
        <i class="material-icons-outlined">
          search
        </i>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'Searchbar',
  components: {
  },
  props: {
    sort: {
      type: String,
      default: 'asc',
    },
  },
  setup(props,  { emit }) {
    const keyword = ref('');

    const sortText = computed(() => {
      return props.sort === 'desc' ? '最新貼文' : '最舊貼文';
    });


    const onSort = (sortType) => {
      emit('sort', sortType);
    };

    const onSearch = () => {
      emit('search', keyword.value);
    };

    return {
      keyword,
      sortText,
      onSort,
      onSearch,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>