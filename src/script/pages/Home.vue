<template>
    <div v-if="user" class=" max-w-full bg-gray-200 mt-10 rounded-none md:hover:bg-gray-400">
        <div class="px-4 sl:px-6 lg:px-10 mb-0 mt-1 p-4 text-center box-content pointer ">
            <h3 class="font-bold text-gray-600 text-center text-xl mb-2">Selamat Datang</h3>
            <div class="mx-auto whitespace-pre-wrap break-words pb-2 rounded md:rounded-none">
                {{ user.fullname }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'HomePage',
      data() {
        return {
            timer: ''
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
}
</script>
