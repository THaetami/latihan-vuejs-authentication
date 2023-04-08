<template>
    <modal-component v-if="$route.name === 'PlaylistSongs'" :show="showModal" @close="showModal = false">
        <template #body>
            <div class="font-bold">Perhatian !!</div>
            <p>Yakin lagu akan dihapus?</p>
        </template>
        <template #footer>
            <button class="justify-end p-3 pt-0 pb-0 rounded-md bg-red-500 hover:bg-red-800" style="font-weight: bold;" @click="deleteSong">Hapus</button>
        </template>
    </modal-component>
    <modal-component v-if="$route.name === 'PlaylistSongs'" :show="showModalPlaylistSongs" @close="showModalPlaylistSongs = false" :getPlaylist="getPlaylists">
        <template #body>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Song to Playlist</h3>
            <div class="space-y-6" >
                <div>
                    <label for="song" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search song</label>
                    <input type="search" ref="search" name="song" v-model="nameSong" @keyup.enter="getSongs()"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Search song" required>
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
    <aside-component @showModalAddSongPlaylist="showModalAddSongPlaylist"></aside-component>
    <div class="p-0 xl:ml-80">
            <div class="bg-white w-full">
            <div class="text-start mt-10 m-5 flex items-center space-x-4">
                <div class="flex-shrink-0">
                    <p class="font-bold">{{ playlist.name }} </p>
                </div>
                <div class="flex-1 min-w-0 p-0"></div>
                <p class="font-bold">Owner: {{ playlist.username }} </p>
            </div>
            <div class="w-full items-center">
                <div class="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">
                    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Performer</th>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900">State</th>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Title</th>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                            <tr v-for="song in playlist.songs" v-bind:key="song.id" class="hover:bg-gray-50">
                                <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div class=" h-10 w-10">
                                        <img class="h-full w-full rounded-full object-cover object-center" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                        <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                    </div>
                                    <div class="text-sm">
                                        <div class="font-medium text-gray-700">{{ song.performer }}</div>
                                        <div class="text-gray-400">Indonesia</div>
                                    </div>
                                </th>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Active
                                    </span>
                                </td>
                                <td class="px-6 py-4">{{ song.title }}</td>
                                <td class="px-6 py-4">
                                    <div class="flex justify-end gap-4">
                                        <a @click="showModalDelete(song.id)" x-data="{ tooltip: 'Delete' }" href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6" x-tooltip="tooltip" >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </a>
                                        <a x-data="{ tooltip: 'Edite' }" href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6" x-tooltip="tooltip" >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
import ModalComponent from '../components/ModalComponent.vue'
import AsideComponent from '../components/AsideComponent.vue';
export default {
    name: 'PlaylistSongs',
    params: ['playlistId'],
    components: {
        ModalComponent,
        AsideComponent
    },
    data() {
        return {
            playlist: '',
            songs: '',
            showModal: false,
            songId: '',
            showModalPlaylistSongs: false,
            nameSong: '',
            songLists: '',
            idForAddSong: '',
        }
    },
    mounted() {
        this.getSongsInPlaylist()
    },
    methods: {
        showModalDelete(id) {
            this.showModal = true
            this.songId = id
        },
        async getSongsInPlaylist() {
            const response = await axios.get(`playlists/${this.$route.params.playlistId}/songs`)
            this.playlist = response.data.data.playlist
        },
        async deleteSong() {
            const response = await axios.delete(`playlists/${this.$route.params.playlistId}/songs`, {
                data: {
                    songId: this.songId
                }
            })
            console.log(response)
            this.showModal = false
            this.getSongsInPlaylist()
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
            this.idForAddSong = e
        },
        async postPlaylistSong() {
            const response = await axios.post(`playlists/${this.$route.params.playlistId}/songs`, {
                songId: this.idForAddSong
            })
            let element = this.$refs["search"];
            element.value = ''
            console.log(response)
            this.showModalPlaylistSongs = false
            this.getSongsInPlaylist()
        },
        showModalAddSongPlaylist() {
            this.showModalPlaylistSongs = true
        }
    }   
}
</script>
