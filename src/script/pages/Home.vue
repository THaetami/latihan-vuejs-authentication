<template>
    <div class=" max-w-full mt-[4rem]">
        <div v-if="user"  class="bg-gray-200 px-4 sl:px-6 lg:px-10 mb-0 mt-1 p-4 text-center box-content pointer ">
            <h3 class="font-bold text-gray-600 text-center text-xl mb-2">Selamat Datang</h3>
            <div class="mx-auto whitespace-pre-wrap break-words pb-2 rounded md:rounded-none">
                {{ user.fullname }}
            </div>
        </div>
    </div>

    <div class="bg-white gap-[5rem] grid lg:grid-cols-2 text-gray-300 p-10"> 
      <div class="grid md:grid-cols-2 sm:p-3 md:grid-start-2 md:border-double md:border-4">
        <div class="inline sm:flex md:inline">
          <img class="mr-6" src="https://placekitten.com/g/200/200">
          <div class="mt-4 justify-between">
            <button class="mr-2 bg-green-500 text-green-100 block py-2 px-8 rounded-full">Detail</button>
          </div>
        </div>

        <div class="text-start lg:text-center">
          <h4 class="mt-0 mb-2 uppercase text-black tracking-widest text-xs"></h4>
          <h1 class="mt-0 mb-2 text-black text-4xl">Spotify Album Page with Tailwind CSS</h1>
    
          <p class="text-gray-600 mb-2 text-sm">With J. Cole, Quavo, Ty Dollar $ign</p>
          <p class="text-gray-600 text-sm">Created by <a>Spotify</a> - 50 songs, 3 hr 2 min</p>
        </div>
      </div>

      <div class="mt-0 w-full ">
        <div class="flex text-black">
          <div class="p-2 w-full">Title</div>
          <div class="p-2 w-full">Artist</div>
          <div class="p-2 w-full">Album</div>
        </div>
    
        <div class="h-[300px] overflow-auto">
          <div v-for="song in songs" v-bind:key="song.id" class="flex text-black hover:text-white border-b border-gray-800 hover:bg-gray-800">
            <router-link :to="{ name: 'SongPage', params: { songId: song.id } }" class="p-3 w-full hover:underline cursor-pointer">{{ song.title }}</router-link>
            <div class="p-3 w-full">{{ song.performer }}</div>
            <div class="p-3 w-full">Spotify</div>
          </div>
        </div>
      </div>
    </div>


    <div class="justify-center flex mt-10 p-10">
      <div class="carousel w-full sm:w-[80%] lg:-[60%] md:border-double md:border-4 md:border-black">
        <div id="slide1" class="carousel-item relative w-full">
          <div class="grid md:grid-cols-2 sm:p-3 border-slate-400 md:grid-start-2">
            <div class="inline sm:flex md:inline">
              <img class="mr-6" src="https://placekitten.com/g/200/200">
              <div class="mt-4 justify-between">
                <button class="mr-2 bg-green-500 text-green-100 block py-2 px-8 rounded-full">Detail</button>
              </div>
            </div>

            <div class="text-start lg:text-center">
              <h4 class="mt-0 mb-2 uppercase text-black tracking-widest text-xs"></h4>
              <h1 class="mt-0 mb-2 text-black text-4xl">Spotify Album Page with Tailwind CSS</h1>
      
              <p class="text-gray-600 mb-2 text-sm">With J. Cole, Quavo, Ty Dollar $ign</p>
              <p class="text-gray-600 text-sm">Created by <a>Spotify</a> - 50 songs, 3 hr 2 min</p>
            </div>
        </div>
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" class="btn btn-circle">❮</a> 
            <a href="#slide2" class="btn btn-circle">❯</a>
          </div>
        </div> 
        <div id="slide2" class="carousel-item relative w-full">
          <div class="grid md:grid-cols-2 sm:p-3 border-slate-400 md:grid-start-2">
          <div class="inline sm:flex md:inline">
            <img class="mr-6" src="https://placekitten.com/g/200/200">
            <div class="mt-4 justify-between">
              <button class="mr-2 bg-green-500 text-green-100 block py-2 px-8 rounded-full">Detail</button>
            </div>
          </div>

          <div class="text-start lg:text-center">
            <h4 class="mt-0 mb-2 uppercase text-black tracking-widest text-xs"></h4>
            <h1 class="mt-0 mb-2 text-black text-4xl">Spotify Album Page with Tailwind CSS</h1>
    
            <p class="text-gray-600 mb-2 text-sm">With J. Cole, Quavo, Ty Dollar $ign</p>
            <p class="text-gray-600 text-sm">Created by <a>Spotify</a> - 50 songs, 3 hr 2 min</p>
          </div>
        </div>
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" class="btn btn-circle">❮</a> 
            <a href="#slide3" class="btn btn-circle">❯</a>
          </div>
        </div> 
      </div>
    </div>

</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    name: 'HomePage',
    data() {
      return {
        songs: ''
      }
    },
    computed: {
        ...mapGetters(['user'])
    },
    mounted() {
      this.getSongs()
    },
    methods: {
      async getSongs() {
        try {
          const response = await axios.get('songs')
          this.songs = response.data.data.songs
        } catch (error) {
          const { response, request } = error;
          if (response) {
            const { message } = response.data;
            console.log(message);
          } else if (request) {
            console.log(request);
          } else {
            console.log('Error', error.message);
          }
        }
      }
    }
}
</script>
