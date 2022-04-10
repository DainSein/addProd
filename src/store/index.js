import { createStore } from "vuex";

export default createStore({
  state: {
    prods: JSON.parse(localStorage.getItem("products")) ?? [],
  },
  mutations: {
    createProd(state, prod) {
      state.prods.push(prod);
      localStorage.setItem("products", JSON.stringify(state.prods));
    },
    deleteProd(state, id) {
      const index = state.prods.findIndex((prod) => prod.id === id);
      state.prods.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(state.prods));
    },
    sort(state, sort) {
      state.prods = sort.reduce((arr, prod) => {
        const idx = prod.index;

        arr.push(state.prods[idx]);
        return arr;
      }, []);
    },
    reverse(state) {
      state.prods = state.prods.reverse();
    },
  },
  actions: {
    createProd({ commit }, prod) {
      commit("createProd", prod);
    },
    deleteProd({ commit }, id) {
      commit("deleteProd", id);
    },
    setSort({ commit, getters }, filter) {
      let sort;

      switch (filter) {
        case "priceUp":
          sort = getters.sortIncrease;
          break;
        case "priceLow":
          sort = getters.sortDecrease;
          break;
        case "name":
          sort = getters.sortName;
          break;
      }

      commit("sort", sort);
    },
  },
  getters: {
    prods(state) {
      return state.prods;
    },
    prices(_, getters) {
      let idx = 0;
      return getters.prods.reduce((arr, { price }) => {
        arr.push({ index: idx++, val: price.replace(/\s/g, "") });
        return arr;
      }, []);
    },
    names(_, getters) {
      let idx = 0;
      return getters.prods.reduce((arr, { name }) => {
        arr.push({ index: idx++, val: name });
        return arr;
      }, []);
    },
    sortIncrease(_, getters) {
      return getters.prices.sort((a, b) => +a.val - +b.val);
    },
    sortDecrease(_, getters) {
      return getters.prices.sort((a, b) => +b.val - +a.val);
    },
    sortName(_, getters) {
      return getters.names.sort((a, b) => {
        return (a.val < b.val && -1) || (a.val > b.val && 1) || 0;
      });
    },
  },
});
