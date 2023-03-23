<template>
    <div>
        <!-- <Spinner v-if="$fetchState && $fetchState.pending" /> -->
        <Nuxt keep-alive />
    </div>
</template>
<script>
import Spinner from "../components/spinner/Spinner.vue"
export default {
    components: {
        Spinner 
    }
}
</script>