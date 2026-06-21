/* ===========================================================
   storage.js — tiny localStorage helper
   Centralizing this avoids typo'd keys ('orders' vs 'Orders')
   and repeating JSON.parse(...) || [] everywhere.
   =========================================================== */

const Storage = {
  getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
  },
  saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
  },

  getNextOrderId() {
    return (JSON.parse(localStorage.getItem('uid')) || 0) + 1;
  },
  saveLastOrderId(id) {
    localStorage.setItem('uid', id);
  },

  getUsers() {
    return JSON.parse(localStorage.getItem('userData')) || [];
  },
  saveUsers(users) {
    localStorage.setItem('userData', JSON.stringify(users));
  },

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser')) || null;
  },
  setLoggedInUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('loggedInUser');
  },
};
