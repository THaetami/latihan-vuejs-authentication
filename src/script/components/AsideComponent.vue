<template>
    <aside class="bg-white -translate-x-80 shadow-lg fixed inset-0 kertas z-50 h-[calc(100vh)] w-72 transition-transform duration-300 xl:translate-x-0">
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
                <slot name="button">

                </slot>
            </ul>
        </div>
    </aside>
</template>
<script>
export default {
    name: 'AsideComponent',
}
</script>
