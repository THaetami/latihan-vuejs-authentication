import { createStore } from 'vuex'

const state = {
    user: null,
    songInPlaylist: null
};

const store = createStore({
    state,
    getters: {
        user: (state) => {
            console.log(state)
            return state.user;
        },
        songInPlaylist: (state) => {
            return state.songInPlaylist
        }
    },
    actions: {
        getuser({commit}, user) {
            commit("user", user);
        },
        getsongInPlaylist({commit}, songInPlaylist) {
            commit("songInPlaylist", songInPlaylist)
        }
    },
    mutations: {
        user(state, getuser) {
            state.user = getuser;
        },
        songInPlaylist(state, getsongInPlaylist) {
            state.songInPlaylist = getsongInPlaylist
        }
    }
});


export default store;