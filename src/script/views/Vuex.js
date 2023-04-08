import { createStore } from 'vuex'

const state = {
    user: null,
    playlists: null
};

const store = createStore({
    state,
    getters: {
        user: (state) => {
            console.log(state)
            return state.user;
        },
        playlists: (state) => {
            return state.playlists
        }
    },
    actions: {
        getuser({commit}, user) {
            commit("user", user);
        },
        getplaylists({commit}, playlists) {
            commit("playlists", playlists)
        }
    },
    mutations: {
        user(state, getuser) {
            state.user = getuser;
        },
        playlists(state, getplaylists) {
            state.playlists = getplaylists
        }
    }
});


export default store;