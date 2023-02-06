<template>
  <header id="header" class="fixed-top d-flex align-items-center header-transparent">
    <div class="container mx-auto d-flex justify-content-between align-items-center">

      <div class="logo">
        <!-- <h1 class="text-light"><a><span>Moderna</span></a></h1> -->
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a><img src="/img/logo.png" alt="" class="img-fluid"></a> -->
      </div>

    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      catFilter: ''
    }
  },
  computed: {
    ...mapState(['category'])
  },
  methods: {
    getCategoryFilter(val) {
      this.catFilter = val
    }
  }
}
</script>

<style>

</style>