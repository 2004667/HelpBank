<template>
  <div class="search-container">
    <div class="search-box">
      <input type="text" class="search-input" v-model="query" placeholder="Search by title or fullname...">
      <button class="search-button" @click="searchCurrencies">Search</button>
    </div>
    <div class="currencies-container">
      <div v-if="filteredCurrencies.length > 0">
        <ul>
          <li v-for="currency in paginatedCurrencies" :key="currency.id" class="currency-item">
            <div class="currency-details">
              <p><strong>Fullname:</strong> {{ currency.fullname }}</p>
              <p><strong>Title:</strong> {{ currency.title }}</p>
              <p><strong>Description:</strong> {{ currency.description }}</p>
              <img src="../assets/images/earth.png" width="40px" height="40px" :alt="currency.title + ' Avatar'" class="currency-avatar">
              <img 
                :src="getHeartIcon(currency)"
                alt="Heart icon" 
                @click="toggleLike(currency)" 
                class="like-icon"
              >
            </div>
          </li>
        </ul>
        <div v-if="totalPages > 1" class="pagination">
          <button 
            v-for="pageNumber in totalPages" 
            :key="pageNumber"
            @click="setCurrentPage(pageNumber)"
            :class="{ active: pageNumber === currentPage }"
          >
            {{ pageNumber }}
          </button>
          <select v-model="currentPageSize" @change="changePageSize">
            <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
      </div>
      <div v-else-if="isLoading">Loading...</div>
      <div v-else>No currencies found</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import clickedHeart from '../assets/images/clickedheart.png';
import heart from '../assets/images/heart.png';

export default {
  setup() {
    const query = ref('');
    const currencies = ref([]);
    const isLoading = ref(false);
    const currentPage = ref(1);
    const currentPageSize = ref(10);
    const pageSizes = [5, 10, 15, 20];

    onMounted(() => {
      searchCurrencies();
    });

    const searchCurrencies = async () => {
      isLoading.value = true;
      try {
        const response = await fetch('https://66780f6f0bd45250561d5c45.mockapi.io/api/v1/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch currencies');
        }
        const data = await response.json();
    currencies.value = data.map(item => {
      const localStorageKey = `currency_${item.id}`;
      const liked = JSON.parse(localStorage.getItem(localStorageKey)) || false;

      return {
      
        fullname: item.fullname,
        title: item.title,
        description: item.description,
        avatar: item.avatar,
        liked: !!liked  // Convert liked to boolean
      };
    });
        isLoading.value = false;
      } catch (error) {
        console.error('Error fetching currencies:', error);
        isLoading.value = false;
      }
    };

    const filteredCurrencies = computed(() => {
      if (!query.value) return currencies.value;
      const normalizedQuery = query.value.toLowerCase();
      return currencies.value.filter(currency =>
        currency.title.toLowerCase().includes(normalizedQuery) ||
        currency.fullname.toLowerCase().includes(normalizedQuery)
      );
    });

    const paginatedCurrencies = computed(() => {
      const startIndex = (currentPage.value - 1) * currentPageSize.value;
      const endIndex = startIndex + currentPageSize.value;
      return filteredCurrencies.value.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredCurrencies.value.length / currentPageSize.value);
    });

    const setCurrentPage = (pageNumber) => {
      currentPage.value = pageNumber;
    };

    const changePageSize = (event) => {
      currentPageSize.value = parseInt(event.target.value, 10);
      currentPage.value = 1;
    };

    const toggleLike = (currency) => {
      currency.liked = !currency.liked;
      localStorage.setItem(`currency_${currency.title}`, JSON.stringify(currency.liked));
    };

    const getHeartIcon = (currency) => {
      return currency.liked ?   heart   :  clickedHeart;
    };

    return {
      query,
      currencies,
      isLoading,
      searchCurrencies,
      filteredCurrencies,
      paginatedCurrencies,
      currentPage,
      currentPageSize,
      totalPages,
      setCurrentPage,
      changePageSize,
      pageSizes,
      toggleLike,
      getHeartIcon
    };
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.search-box {
  display: flex;
  width: 50%;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.search-button {
  padding: 10px 20px;
  background-color: #007BFF;
  border: 1px solid #007BFF;
  border-radius: 0 5px 5px 0;
  color: white;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

.currencies-container {
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.currency-item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.currency-details {
  margin-bottom: 10px;
}

.currency-details p {
  margin: 5px 0;
}

.currency-avatar {
  max-width: 50px; /* Adjust size as needed */
  max-height: 50px; /* Adjust size as needed */
  border-radius: 50%; /* Rounded avatar */
  margin-top: 10px;
}

.no-avatar {
  color: #999;
}

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

.currency-details button {
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
}

.currency-details button.liked {
  background-color: #007BFF;
  color: white;
}

.like-icon {
  width: 25px; /* Adjust the width of the heart icon */
  height: 25px; /* Adjust the height of the heart icon */
  cursor: pointer;
  margin-left: 5px;
}
</style>
