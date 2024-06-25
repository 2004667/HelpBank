<template>
  <div>
    <Search @search-complete="handleSearchComplete" />
    <div v-if="currencies.length">
      <div v-for="currency in currencies" :key="currency.id" class="currency-item">
        <div class="currency-details">
          <p><strong>Fullname:</strong> {{ currency.fullname }}</p>
          <p><strong>Title:</strong> {{ currency.title }}</p>
          <p><strong>Description:</strong> {{ currency.description }}</p>
          <img v-if="currency.avatar" :src="currency.avatar" alt="Avatar">
          <img 
            :src="currency.liked ? clickedHeart : heart"
            alt="Heart icon" 
            @click="toggleLike(currency)" 
            class="like-icon"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Search from '../components/Search.vue';
import clickedHeart from '../assets/images/clickedheart.png';
import heart from '../assets/images/heart.png';

export default {
  name: 'Main',
  components: {
    Search
  },
  setup() {
    const currencies = ref([]);

    const handleSearchComplete = (data) => {
      currencies.value = data.map(item => ({
        ...item,
        liked: JSON.parse(localStorage.getItem(`currency_${item.id}`)) || false
      }));
    };

    const toggleLike = (currency) => {
      currency.liked = !currency.liked;
      if (currency.liked) {
        localStorage.setItem(`currency_${currency.id}`, JSON.stringify(currency));
      } else {
        localStorage.removeItem(`currency_${currency.id}`);
      }
    };

    return {
      currencies,
      handleSearchComplete,
      toggleLike,
      clickedHeart,
      heart
    };
  }
};
</script>


<style scoped>
.currency-item {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.currency-details {
  margin-bottom: 10px;
}

.currency-details p {
  margin: 5px 0;
}

.currency-details img {
  max-width: 30px;
  max-height: 20px;
}

.like-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>
