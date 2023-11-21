import { createStore } from 'vuex'
import axios from 'axios'
import Category from '../components/model/Category';
import Author from '../components/model/Author';

export default createStore({
  state: {
    books: [],
    categories: [],
    authors: [],
    catalogTitle: 'Książki',
    suggestedAuthors: [],
    suggestedCategories: [],
    showSuggestions: false,
  },
  mutations: {
    SET_BOOKS(state, books) {
      state.books = books;
    },
    SET_CATALOG_TITLE(state, title) {
      state.catalogTitle = title;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_AUTHORS(state, authors) {
      state.authors = authors;
    },
    SET_SUGESTION_QUERY(state, query) {
      state.suggestionQuery = query;
    },
    SET_SUGGESTED_AUTHORS(state, authors) {
      state.suggestedAuthors = authors;
    },
    SET_SUGGESTED_CATEGORIES(state, categories) {
      state.suggestedCategories = categories;
    },
    SET_SHOW_SUGGESTIONS(state, showSuggestions) {
      state.showSuggestions = showSuggestions;
    }
  },
  actions: {
    async fetchBooks({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/api/books');
        commit('SET_BOOKS', response.data);
        commit('SET_CATALOG_TITLE', 'Książki');
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    },
    async fetchBooksByCategory({ commit }, category) {
      try {
        const response = await axios.get(`http://localhost:8080/api/books/categories/${category.id}`);
        commit('SET_BOOKS', response.data);
        commit('SET_CATALOG_TITLE', `Książki w kategorii ${category.name}`);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    },

    async fetchBooksByAuthor({ commit }, author) {
      try {
        const response = await axios.get(`http://localhost:8080/api/books/authors/${author.id}`);
        commit('SET_BOOKS', response.data);
        commit('SET_CATALOG_TITLE', `Książki autorstwa ${author.name}`);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/api/categories');
        const categories = response.data.map(categoryData => {
          return new Category(categoryData.id, categoryData.name, categoryData.count);
        });
        commit('SET_CATEGORIES', categories);
      } catch (error) {
        console.error('Błąd podczas pobierania kategorii:', error);
      }
    },
    async fetchAuthors({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/api/search/authors');
        const authors = response.data.map(authorData => {
          return new Author(authorData.id, authorData.name, authorData.count);
        });
        commit('SET_AUTHORS', authors);
      } catch (error) {
        console.error('Błąd podczas pobierania autorów:', error);
      }
    },
    async suggestionSearch({ commit }, suggestionQuery) {
      try {
        const response = await axios.get('http://localhost:8080/api/search', { params: { q: suggestionQuery } });

        commit('SET_SUGGESTED_AUTHORS', response.data.suggestedAuthors.map(authorData => {
          return new Author(authorData.id, authorData.name);
        }));
        commit('SET_SUGGESTED_CATEGORIES', response.data.suggestedCategories.map(categoryData => {
          return new Category(categoryData.id, categoryData.name);
        }));

      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
      commit('SET_SHOW_SUGGESTIONS', suggestionQuery.length > 0);
    },
    async fetchSelectedSuggestion({ commit }, selected) {
      const fetchData = async (url) => {
        try {
          const response = await axios.get(url + selected.id);
          commit('SET_BOOKS', response.data);
        }
        catch (error) {
          console.error('Błąd podczas pobierania danych:', error);
          commit('SET_CATALOG_TITLE', 'Książki');
        }
      };

      if (selected instanceof Author) {
        commit('SET_CATALOG_TITLE', 'Książki autorstwa ' + selected.name);
        await fetchData('http://localhost:8080/api/books/authors/');

      } else if (selected instanceof Category) {
        commit('SET_CATALOG_TITLE', 'Książki w kategorii ' + selected.name);
        await fetchData('http://localhost:8080/api/books/categories/');
      }
      commit('SET_SHOW_SUGGESTIONS', false);

    }
  },
  getters: {
  },
  modules: {
  }
})
