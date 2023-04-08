<template>
<div class="min-h-screen bg-white">
    <modal-component v-if="$route.name === 'PlaylistsPage'" :show="showModal1" @close="showModal1 = false" :getPlaylist="getPlaylists">
        <template #body>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Your Playlists</h3>
            <form @submit.prevent="postPlaylist" class="space-y-6" >
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Playlists Name</label>
                    <input type="text" name="email" v-model="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="playlists name" required>
                </div>

                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add playlists</button>
            </form>
        </template>
    </modal-component>
    <modal-component v-if="$route.name === 'PlaylistSongs'" :show="showModalPlaylistSongs" @close="showModalPlaylistSongs = false" :getPlaylist="getPlaylists">
        <template #body>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Song to Playlist</h3>
            <div class="space-y-6" >
                <div>
                    <label for="song" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search song</label>
                    <input type="search" name="song" v-model="nameSong" @keyup.enter="getSongs()"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Search song" required>
                    <form @submit.prevent="postPlaylistSong" class="overflow-auto">
                        <label for="countries_multiple" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Select song</label>
                        <select @change="getSongId($event.target.value)" class="bg-gray-50 border p-2 overflow-auto border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option v-for="songList in songLists" v-bind:key="songList.id" :value="songList.id">{{ songList.title }}</option>
                        </select>
                        <button type="submit" class="mt-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Song</button>
                    </form>
                </div>
            </div>
        </template>
    </modal-component>
    <aside class="bg-white -translate-x-80 shadow-lg fixed kertas inset-0 z-50 h-[calc(100vh)] w-72 transition-transform duration-300 xl:translate-x-0">
        <div class="relative border-b border-white/20">
            <span class="flex items-center gap-4 py-6 px-8" >
            
            </span>
            <div class="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
                <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" class="h-5 w-5 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </span>
            </div>
        </div>
        <div class="m-[2rem]">
            <ul class="mb-4 flex flex-col gap-1">
                <li v-if="$route.name === 'PlaylistsPage'">
                    <a aria-current="page" class="active" href="#">
                        <button @click="showModal1 = true" class="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button" style="position: relative; overflow: hidden;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-inherit">
                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                            </svg>
                            <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Add Playlist</p>
                        </button>
                    </a>
                </li>
                <li v-if="$route.name === 'PlaylistSongs'">
                        <a aria-current="page" class="active" href="#">
                            <button @click="showModalPlaylistSongs = true" class="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button" style="position: relative; overflow: hidden;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-5 h-5 text-inherit">
                                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                                </svg>
                                <p class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Add Song</p>
                            </button>
                        </a>
                    </li>
            </ul>
        </div>
    </aside>
    <div v-if="$route.name === 'PlaylistsPage'" class="p-4 xl:ml-80">
        <div class="mt-12">
            <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <div v-for="playlist in playlists" v-bind:key="playlist.id" class=" flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
                                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                            </svg>
                        </div>
                        </div>
                        <div class="flex-1 min-w-0 p-0">
                            
                        </div>
                    <div class="dropdown dropdown-end">
                        <button tabindex="0" id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" class="mr-3 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-full hover:bg-gray-100 focus:ring-none focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800" type="button"> 
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                        </button>
                        <ul @click="deletePlaylist(playlist.id)" tabindex="0" class="dropdown-content menu p-0 shadow-lg rounded-lg hover:text-white hover:bg-orange-400 bg-base-100 w-34">
                            <li><a>delete</a></li>
                        </ul>
                        </div>
                    </div>
                    
                    <div class="p-2 px-5 text-right">
                        <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{{ playlist.username }}</p>
                        <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ playlist.name }}</h4>
                    </div>
                    <small class="border-t border-blue-gray-50 p-4">
                        <router-link :to="{ name: 'PlaylistSongs', params: { playlistId: playlist.id }}" class="cursor-pointer hover:underline block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong class="text-green-500">+5%</strong>&nbsp;lihat playlist
                        </router-link>
                    </small>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <router-view></router-view>
    </div>
</div>


</template>
<script>
import axios from 'axios';
import ModalComponent from '../components/ModalComponent.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'PlaylistsPage',
    components: {
        ModalComponent
    },
    data() {
        return {
            playlists: '',
            showModal1: false,
            name: '',
            showModalPlaylistSongs: false,
            nameSong: '',
            songLists:'',
            songId: ''
        }
    },
    computed: {
        ...mapGetters(['user']),
    },
    mounted() {
        this.getPlaylists()
    },
    methods: {
        async getPlaylists() {
            const response = await axios.get('playlists', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            this.playlists = response.data.data.playlists.reverse()
        },
        async postPlaylist() {
            await axios.post('playlists', {
                name: this.name
            });
            this.name = ''
            this.getPlaylists()
            this.showModal1 = false
        },
        async deletePlaylist(id) {
            const response = await axios.delete(`playlists/${id}`)
            this.getPlaylists()
            console.log(response)
        },
        async getSongs() {
            const response = await axios.get('songs', { 
                params: { 
                    title: this.nameSong,
                } 
            })
            this.songLists = response.data.data.songs
        },
        getSongId(e) {
            console.log(e)
            this.songId = e
        },
        async postPlaylistSong() {
            const response = await axios.post(`playlists/${this.$route.params.playlistId}/songs`, {
                    songId: this.songId
            })
            console.log(response)
            this.showModalPlaylistSongs = false
        }
    }
}
</script>
