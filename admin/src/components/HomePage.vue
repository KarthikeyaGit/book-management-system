<template>
  <div class="d-flex" style="overflow-x: auto;">
    <div class="sidebar vh-100 d-flex flex-column justify-content-between">
      <div>
        <div class="logo">BMS</div>
        <ul class="menu">
          <li>
            <router-link to="/home/dashboard" class="menu-item" :class="{ active: activeItem === 'dashboard' }"
              @click="handleItemClick('dashboard')">
              <span class="icon">🏠</span>
              <span class="text">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/home/reading" class="menu-item" :class="{ active: activeItem === 'Reading' }"
              @click="handleItemClick('Reading ')">
              <span class="icon">📚</span>
              <span class="text">Reading </span>
            </router-link>
          </li>
          <li>
            <router-link to="/home/wishlist" class="menu-item" :class="{ active: activeItem === 'Wishlist' }"
              @click="handleItemClick('Wishlist')">
              <span class="icon">🌟</span>
              <span class="text">Wishlist </span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="d-flex flex-row justify-content-around align-items-center profile-menu">
        <div class="circleName">{{ capitalizeFirstLetter(user.name) }}</div>
        <div class="d-flex flex-column">
          <div style="font-size: 14px;" v-if="user.name">{{ user.name }}</div>
          <div style="font-size: 14px;">Admin</div>
        </div>
        <div>
          <!-- <img src="../assets/notification.svg" alt="notification" style="height: 20px;" /> -->
        </div>
        <img src="../assets/threedots.svg" alt="threedots" style="height: 20px;" />
        <div v-if="isDropdownOpen" class="dropdown-menu">
      <a class="dropdown-item" href="#">Logout</a>
    </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      activeItem: 'dashboard',
      user: {},
      
    };
  },
  methods: {
    handleItemClick(itemName) {
      this.activeItem = itemName;
    },
    capitalizeFirstLetter(string) {
      if (typeof string !== 'string' || string.length === 0) {
        return '';
      }
      return string.charAt(0).toUpperCase();
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('userData'))
  }
};
</script>
  
<style scoped>
.sidebar {
  width: 200px;
  background-color: #F8F8FA;
  border-right: 1px solid #e1e1e1;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin: 15px 20px;
}

.menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 7px 10px;
  margin: 0 15px;
  color: #555;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 10px;
}

.menu-item:hover {
  background-color: #E8F7FF;
}

.menu-item.active {
  background-color: #E8F7FF;
  font-weight: bold;
}

.icon {
  margin-right: 10px;
}

.text {
  font-size: 16px;
}

.profile-menu {
  height: 60px;
  border-top: 0.5px solid rgb(230, 230, 230);
}

.circleName {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background-color: rgb(0, 170, 255);
  color: #ffffff;
}
</style>
  