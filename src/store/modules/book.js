import axios from 'axios'
import { fetchAndSetBookImage } from '@/utils/bookUtils';
import Category from '@/components/model/Category';
import Author from '@/components/model/Author';
import router from '@/router';


export default {
    namespaced: true,
    state: {
        selectedBook: '',
        similarCategoryBooks: [],
        similarAuthorBooks: [],
        books: [],
        categories: [],
        authors: [],
        catalogTitle: 'Książki',
        suggestedAuthors: [],
        suggestedBooks:[],
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
        SET_SUGGESTED_BOOKS(state, books) {
            state.suggestedBooks = books;
        },
        SET_SUGGESTED_CATEGORIES(state, categories) {
            state.suggestedCategories = categories;
        },
        SET_SHOW_SUGGESTIONS(state, showSuggestions) {
            state.showSuggestions = showSuggestions;
        },
        SET_SELECTED_BOOK(state, selectedBook) {
            state.selectedBook = selectedBook;
        },
        SET_SIMILAR_CATEGORY_BOOKS(state, similarCategoryBooks) {
            state.similarCategoryBooks = similarCategoryBooks;
        },
        SET_SIMILAR_AUTHOR_BOOKS(state, similarAuthorBooks) {
            state.similarAuthorBooks = similarAuthorBooks;
        },

    },
    actions: {
        async fetchBooks({ commit }) {
            try {
                const response = await axios.get('http://localhost:8080/api/books');
                const books = response.data;

                // Przeiteruj przez każdą książkę i pobierz obraz na podstawie URL
                for (const book of books) {
                    await fetchAndSetBookImage(book);
                }
                commit('SET_BOOKS', books);
                commit('SET_CATALOG_TITLE', 'Wszystkie książki');
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async fetchBooksByCategory({ commit }, category) {
            try {
                const response = await axios.get(`http://localhost:8080/api/books/categories/${category.id}`);

                const books = response.data;

                // Przeiteruj przez każdą książkę i pobierz obraz na podstawie URL
                for (const book of books) {
                    await fetchAndSetBookImage(book);
                }
                commit('SET_BOOKS', books);
                commit('SET_CATALOG_TITLE', `Książki w kategorii ${category.name}`);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async fetchBooksByAuthor({ commit }, author) {
            try {
                const response = await axios.get(`http://localhost:8080/api/books/authors/${author.id}`);
                const books = response.data;

                // Przeiteruj przez każdą książkę i pobierz obraz na podstawie URL
                for (const book of books) {
                    await fetchAndSetBookImage(book);
                }
                commit('SET_BOOKS', books);
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
                

                for (const book of response.data.suggestedBooks) {
                    await fetchAndSetBookImage(book);
                }
                commit('SET_SUGGESTED_BOOKS', response.data.suggestedBooks);
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
                    const books = response.data;

                    // Przeiteruj przez każdą książkę i pobierz obraz na podstawie URL
                    for (const book of books) {
                        await fetchAndSetBookImage(book);
                    }
                    commit('SET_BOOKS', books);
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
            else{
                router.push("/book/" + selected.id)
            }
            commit('SET_SHOW_SUGGESTIONS', false);

        },
        async fetchBookAndSimilar({ commit }, bookId) {
            try {
                const response = await axios.get('http://localhost:8080/api/books/' + bookId);
                const selectedBook = response.data;
                await fetchAndSetBookImage(selectedBook);
                commit('SET_SELECTED_BOOK', selectedBook);

                const responseCategory = await axios.get(`http://localhost:8080/api/books/categories/${selectedBook.category.id}`);
                const selectedBooksCategory = responseCategory.data;
                for (const book of selectedBooksCategory) {
                    await fetchAndSetBookImage(book);
                }
                commit('SET_SIMILAR_CATEGORY_BOOKS', selectedBooksCategory);

                const responseAuthors = await axios.get(`http://localhost:8080/api/books/authors/${selectedBook.bookAuthors[0].id}`);
                const selectedBooksAuthors = responseAuthors.data;
                for (const book of selectedBooksAuthors) {
                    await fetchAndSetBookImage(book);
                }
                commit('SET_SIMILAR_AUTHOR_BOOKS', selectedBooksAuthors);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
    },
    getters: {
        similarCategoryBooks(state) {
            return state.similarCategoryBooks.filter(book => book.title != state.selectedBook.title);
        },
        similarAuthorBooks(state) {
            return state.similarAuthorBooks.filter(book => book.title != state.selectedBook.title);
        }
    }
};
