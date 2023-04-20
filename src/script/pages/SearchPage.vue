<template>
    <div class="bg-gradient-to-r from-purple-300 to-blue-200">
        <div class="h-screen bg-gradient-to-r from-purple-300 to-blue-200 pt-20 mt-10">

            <div v-if="songs == '' " class="flex justify-center p-5 md:p-0">
                <div class="alert shadow-lg mb-4 w-full p-2 md:w-1/2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div>
                        <h3 class="font-bold">New message!</h3>
                        <div class="text-xs">The song titled {{ this.$route.query.title }} cannot be found</div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div v-for="song in songs" v-bind:key="song.id" class="mx-auto max-w-1/2 justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div class="rounded-lg md:w-2/3">
                    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img src="/Caerte_van_Oostlant_4MB.jpg" alt="product-image" class="w-full rounded-lg sm:w-40" />
                        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div class="mt-5 sm:mt-0">
                                <h2 class="text-lg font-bold text-start text-gray-900">{{ song.title }}</h2>
                                <p class="mt-1 text-md text-gray-700 text-start">{{ song.performer }}</p>
                                <p class="mt-1 text-sm text-gray-700 text-start">{{ song.genre }}</p>
                            </div>
                            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                <div class="flex items-center border-gray-100">
                                    <router-link :to="{ name: 'SongPage', params: { songId: song.id } }" class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">Detail</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'SearchPage',
    components: {
    },
    data() {
        return {
            songs: '',
            title: this.$route.query.title.trim()
        }
    },
    watch: {
        '$route.query': {
            handler: function (newQuery) {
                this.getSongs(newQuery.title)
            },
            deep: true // To watch for changes in nested objects
        }
    },
    mounted() {
        this.getSongs(this.title)
    },
    methods: {
        async getSongs(title) {
            if(title.trim() != '') {
                 try {
                    const response = await axios.get('songs?title=' + title)
                    this.songs = response.data.data.songs
                } catch (error) {
                    console.log(error)
                }
            }
           
        }    
        
    }
}
</script>
