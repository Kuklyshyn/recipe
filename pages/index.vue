<template>
  <div>
    <Content :list="countryList" /> 
  </div>
</template>

<script>
import Header from '../components/header/Header.vue'
import Footer from '../components/footer/Footer.vue'
import Content from '../components/content/Content.vue'
import { urlCategoryApi, urlCountryApi  } from '@/utils.js'
import { mapState } from 'vuex'

export default {
  components: { 
    Header,
    Content,
    Footer 
  },
  name: 'IndexPage',
  data() {
    return {
      categoryData: null,
      countryList: null
    }
  },
  mounted() {
    // if(!this.category.length) {
    //   this.$store.dispatch('getCategoryLocation')
    // } 
  },
  async fetch() {
    const [data, dataCountry] = await Promise.all([this.getData(urlCategoryApi), this.getData(urlCountryApi)])
    this.categoryData = data 
    this.countryList = dataCountry?.meals
    this.$store.dispatch('setCategory', data?.categories)
  },
  computed: {
    ...mapState(['category'])
  },
  methods: {
    getData(query) {
      return this.$axios.get(query).then(({data})=> data)
    }
  }
}
</script>
