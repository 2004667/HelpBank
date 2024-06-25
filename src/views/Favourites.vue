<template>
  <div class="favourites">
    <h2>Favourites</h2>
    <ul>
      <li v-for="currency in likedCurrencies" :key="currency.id" class="currency-item">
        <div class="currency-details">
          <p><strong>Fullname:</strong> {{ currency.fullname }}</p>
          <p><strong>Title:</strong> {{ currency.title }}</p>
          <p><strong>Description:</strong> {{ currency.description }}</p>
          <img  src="../assets/images/earth.png" :alt="currency.title + ' Avatar'" class="currency-avatar">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Favourites',
  data() {
    return {
      likedCurrencies: []
    };
  },
  mounted() {
    this.loadLikedCurrencies();
  },
  methods: {
    loadLikedCurrencies() {
  const keys = Object.keys(localStorage).filter(key => key.startsWith('currency_'));
  const likedCurrencies = keys.map(key => {
    try {
      const currencyData = JSON.parse(localStorage.getItem(key));
      console.log('Parsed currency data:', currencyData); // Add this line for debugging
      return {
        id: currencyData.id,
        title: currencyData.title,
        fullname: currencyData.fullname,
        description: currencyData.description,
        avatar: currencyData.avatar // Ensure this matches your data structure
      };
    } catch (error) {
      console.error('Error parsing currency data:', error);
      return null;
    }
  }).filter(currency => currency !== null); // Filter out any null entries

  console.log('Liked currencies:', likedCurrencies); // Add this line for debugging

  this.likedCurrencies = likedCurrencies;
}

  }
}; 
</script>

<style scoped>
.favourites {
  margin: 20px;
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
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
  margin-top: 10px;
}

.no-avatar {
  color: #999;
}
</style>
