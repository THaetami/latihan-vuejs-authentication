<template>
    <modal-component :show="showModalAddSong" @close="showModalAddSong = false">
        <template #body>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Upload Your Song</h3>
            <form @submit.prevent="postSong" class="space-y-4 " >
                <div class="relative z-0 w-full mb-6 group">
                    <input v-model.trim="title" @input="validateTitle" type="text" name="title" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label for="title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                    <small v-if="titleErrorMessage" class="text-red-500">{{ titleErrorMessage }}</small>
                </div>

                <div class="grid grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input v-model.trim="performer" @input="validatePerformer" type="text" name="performer" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label for="performer" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Performer</label>
                        <small v-if="performerErrorMessage" class="text-red-500">{{ performerErrorMessage }}</small>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input v-model.trim="year" @input="validateYear" type="number" name="year" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label for="year" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Year</label>
                        <small v-if="yearErrorMessage" class="text-red-500">{{ yearErrorMessage }}</small>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input v-model.trim="genre" @input="validateGenre" type="text" name="genre" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label for="genre" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Genre</label>
                        <small v-if="genreErrorMessage" class="text-red-500">{{ genreErrorMessage }}</small>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input v-model.trim="duration" @input="validateDuration" type="number" name="duration" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                        <label for="duration" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Duration</label>
                        <small v-if="durationErrorMessage" class="text-red-500">{{ durationErrorMessage }}</small>
                    </div>
                </div>

                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add song</button>
            </form>
        </template>
    </modal-component>
    <div class="bg-gradient-to-r from-purple-300 to-blue-200">
        <div class="h-screen bg-gradient-to-r from-purple-300 to-blue-200 pt-20 mt-10">

            <div v-if="id" class="flex justify-center p-5 md:p-0">
                <div class="alert shadow-lg mb-4 w-full p-2 md:w-1/2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div>
                        <h3 class="font-bold">New message!</h3>
                        <div class="text-xs">Your song has been successfully uploaded</div>
                        </div>
                    </div>
                    <div class="flex-none">
                        <router-link :to="{ name: 'SongPage', params: { songId: id } }" class="btn btn-sm" @click="id = ''">See</router-link>
                    </div>
                </div>
            </div>

            <div class="mx-auto max-w-1/2 justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div class="rounded-lg md:w-2/3">
                    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img src="/Caerte_van_Oostlant_4MB.jpg" alt="product-image" class="w-full rounded-lg sm:w-40" />
                        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div class="mt-5 sm:mt-0">
                                <h2 class="text-lg font-bold text-start text-gray-900">{{ song.title }}</h2>
                                <p class="mt-1 text-md text-gray-700 text-start">{{ song.performer }}</p>
                                <p class="mt-1 text-sm text-gray-700 text-start">{{ song.genre }}</p>
                                <p class="mt-1 text-sm text-gray-700 text-start">Duration : {{ song.duration }}</p>
                            </div>
                            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                <div class="flex items-center border-gray-100">
                                    <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">Tahun</span>
                                    <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">{{ song.year }}</span>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class=" z-10 top-0 w-full">
                <div class="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                    <div class="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg w-full">
                        <svg class="text-indigo-500 w-20 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                        <div class="input_field flex flex-col w-max mx-auto text-center">
                            <label @click="showModalAddSong = true">
                                <div class="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                            </label>

                            <div class="title text-indigo-500 uppercase">Upload your song</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ModalComponent from '../components/ModalComponent.vue'
export default {
    name: 'SongPage',
    components: {
        ModalComponent
    },
    data() {
        return {
            song: '',
            showModalAddSong: false,
            title: '',
            performer: '',
            year: '',
            genre: '',
            duration: '',
            id: '',
            titleErrorMessage: '',
            performerErrorMessage: '',
            yearErrorMessage: '',
            genreErrorMessage: '',
            durationErrorMessage: ''
        }
    },
    watch: {
        '$route'(to, from) {
            if (to !== from) {
                this.song = this.getSong();
            }
        }
    },
    mounted() {
        this.getSong()
    },
    methods: {
        async getSong() {
            const response = await axios.get(`songs/${this.$route.params.songId}`)
            this.song = response.data.data.song
        },
        validateTitle() {
            if (this.title.length < 3) {
                this.titleErrorMessage = 'min. 3 karakter.';
                return false;
            } else {
                this.titleErrorMessage = '';
                return true;
            }
        },
        validatePerformer() {
            if (this.performer.length < 3) {
                this.performerErrorMessage = 'min. 3 karakter.';
                return false;
            } else {
                this.performerErrorMessage = '';
                return true;
            }
        },
        validateYear() {
            if (!/^\d{4}$/.test(this.year)) {
                this.yearErrorMessage = '4 digit karakter numerik.';
                return false;
            } else {
                this.yearErrorMessage = '';
                return true;
            }
        },
        validateGenre() {
            if (this.genre.length < 3) {
                this.genreErrorMessage = 'min. 3 karakter.';
                return false;
            } else {
                this.genreErrorMessage = '';
                return true;
            }
        },
        validateDuration() {
            if (!/\d/.test(this.duration)) {
                this.durationErrorMessage = 'min. 1 karakter numerik.';
                return false;
            } else {
                this.durationErrorMessage = '';
                return true;
            }
        },
        async postSong() {
            const isTitleValid = this.validateTitle();
            const isPerformerValid = this.validatePerformer();
            const isYearValid = this.validateYear();
            const isGenreValid = this.validateGenre();
            const isDuration = this.validateDuration();

            if (isTitleValid && isPerformerValid && isYearValid && isGenreValid && isDuration) {
                try {
                    const response = await axios.post('songs', {
                        title: this.title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                        year: this.year,
                        performer: this.performer,
                        genre: this.genre,
                        duration: this.duration
                    })
                    this.id = response.data.data.songId
                    this.showModalAddSong = false
                    this.title = ''
                    this.year = ''
                    this.performer = ''
                    this.genre = ''
                    this.duration = ''
                } catch (error) {
                    console.log(error)
                }
            }
        },
    }
}
</script>
