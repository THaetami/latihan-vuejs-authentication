<template>
    <Transition name="modal">
    <div v-if="show" class="auth-wrapper fixed">
        <div class="auth-inner w-full h-full max-w-md md:h-auto">
            <div class="relative">
                <div class="relative bg-white rounded-lg dark:bg-gray-700">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                        <svg @click="$emit('close')" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <slot name="body">

                        </slot>
                    </div>
                    <div class="px-6 lg:px-8 pb-4 pt-0 flex justify-end">
                        <slot name="footer">
                            
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Transition> 
</template>

<script>
export default {
    name: 'ModalComponent',
    props: ['show'],
}
</script>