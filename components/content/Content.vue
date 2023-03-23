<template>
  <div>
    <nav id="headerfix" class="header-fix">
        <ul>
            <li v-for="(item, index) in category" :key="index">
                <NuxtLink :to="item.strCategory" class="font-sans item">{{ item.strCategory }}</NuxtLink> 
            </li>       
        </ul>              
    </nav>
    <section class="b-home" :style="coverUrl">
        <h1 v-if="!dishSingle" class="font-sans text-white">You are hungry???</h1>
        <h2 v-if="!dishSingle" class="font-sans text-white">{{ text1 }}</h2>
        <h2 v-if="!dishSingle" class="font-sans text-white">Tap and cook a random dish.</h2>

        <h1 v-if="dishSingle" class="font-sans text-white">{{dishSingle.strMeal}}</h1>
        <div v-if="dishSingle" class="short-disc font-sans text-white">
            <span class="font-sans text-white">Category: {{dishSingle.strCategory}}</span><br/>
            <span class="font-sans text-white">Country: {{dishSingle.strArea}}</span><br/>
            <span class="font-sans text-white" v-if="tags !== 'null'">Tags: {{tags}}</span><br/>
        </div>

        <div class="search">
            <input type="text" v-model="search" placeholder="Search ingredient.."/>
        </div>

        <ul class="list-ingridient">
            <li class="rounded-full active" v-for="(item, index) in paramIng.slice(0, 7)" :key="index + 'a'" @click="clearBy(index)">{{  item }}</li>
            <li class="rounded-full" v-for="(item) in filterIngridient.slice(0, 7)" :key="item.idIngredient" @click="saveToSelected(item.strIngredient)">{{ item.strIngredient }}</li>
        </ul>
        <p class="font-sans text-white" v-if="!dataFilter">Opps. Please. Try to change ingredients.</p>
        <div class="btn-clear" @click="clear()">Clear filters</div>
        <div class="mt-10 flex space-x-2 justify-center">
            <button @click="fetchDataFilter()" type="button" class="btn-fly inline-block px-16 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">Random dish</button>
        </div>
    </section>
    <div ref="filterbox" v-if="dataFilter && dataFilter.length">
        <FromFilter :dataFilter="dataFilter" />
    </div>
    <div ref="dishSingle">
        <transition name='fade'>
        <section v-if="dishSingle">
            <div class="mx-auto max-w-screen-xl pt-4 py-16 lg:px-8">
                <div class="">
                <h2 class="text-3xl font-bold sm:text-4xl text-center">{{dishSingle.strMeal}}</h2>
                </div>

                <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div class="text-center">
                    <img
                    :alt="dishSingle.strMeal"
                    :src="dishSingle.strMealThumb"
                    class="mx-auto"
                    />
                </div>

                <div class="lg:py-16">
                    <article class="space-y-4 text-gray-600 px-16">
                        <p class="font-sans text-lg">
                            {{dishSingle.strInstructions}}
                        </p>
                    </article>
                </div>
                </div>
            </div>

            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <h3 class="mb-10 text-3xl font-bold sm:text-4xl text-center">Steps</h3>
                <div class="flex flex-row justify-center">
                    <ul>
                        <li class="font-sans text-xl mb-2" v-for="(ing, index) in ingredient"
                            :key="index">
                            {{ ing }}
                        </li>
                    </ul>
                    <ul class="ml-20">
                        <li class="font-sans text-xl mb-2" v-for="(ing, index) in measure"
                            :key="index">
                            {{ ing }}
                        </li>
                    </ul>
                </div>
            </div>

        </section>
    </transition>
    </div>

    <section class="py-10" >
        <div class="mx-auto max-w-screen-xl pt-4 lg:px-8" >
            <h3 class="text-3xl font-bold sm:text-4xl text-center mb-10">
                Category
            </h3>
            <nav id="navbar" class="navbar py-16 ">
                <ul>
                    <li v-for="(item, index) in category" :key="index">
                        <a @click="getCategoryFilter(item.strCategory)" :class="{ active : item.strCategory == catFilter }">{{item.strCategory}}</a>
                    </li>       
                </ul>              
            </nav>
            <transition name="home">
                <div class="result">
                    <div class="mt-10" >
                                   
                            <VueSlickCarousel  v-if="this.dataCategory"  v-bind="settings">
                                <div class="a-slide" v-for="(slide) in this.dataCategory" :index="slide.idMeal" :key="slide.idMeal" @click="fetchDataById(slide.idMeal)">
                                    <div class="a-slide-img">
                                        <img :src="slide.strMealThumb" :alt="slide.strMeal">
                                    </div>
    
                                    <h4 class="a-slide-title text-xl font-bold">{{slide.strMeal}}</h4>
                                </div>
                            </VueSlickCarousel>   
                        
                    </div>
                </div>
            </transition>
        </div>
        
    </section>

    <section class="pt-o pb-20">
        <div class="mx-auto max-w-screen-xl lg:px-8">
            <h3 class="text-3xl font-bold sm:text-4xl text-center mb-10">
                Country list
            </h3>
            <nav id="navbar" class="navbar py-16 ">
                <ul class="flex-wrap">
                    <li v-for="(item, index) in list" :key="index">
                        <a @click="getCountryFilter(item.strArea)" class="font-sans text-4xl" :class="{ active : item.strArea == countryFilter }" >{{item.strArea}}</a>
                    </li>     
                </ul>
                
            </nav>
            <transition name="home">
                <div v-if="this.dataCountry" class="result">
                    <div class="mt-10">
                        <client-only>
                            
                            <VueSlickCarousel v-bind="settings">
                                <div class="a-slide" v-for="(slide) in this.dataCountry" :index="slide.idMeal" :key="slide.idMeal" @click="fetchDataById(slide.idMeal)">
                                    <div class="a-slide-img">
                                        <img :src="slide.strMealThumb" :alt="slide.strMeal">
                                    </div>
    
                                    <h4 class="a-slide-title text-xl font-bold">{{slide.strMeal}}</h4>
                                </div>
                            </VueSlickCarousel>
                        
                        </client-only>
                    </div>
                </div>
            </transition>
        </div>
        
    </section>
    <Latest />
    <Random />
    <button @click="fetchDataFilter()" type="button" class="fixed-btn">Try one more</button>
  </div>
</template>

<script>
import { urlRandomApi, urlIngridient, filterbying  } from '@/utils.js'
import { mapState } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import Latest from '../content/Latest.vue'
import Random from '../content/Random.vue'
import FromFilter from '../content/FromFilter.vue'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
    components: {
        VueSlickCarousel,
        Latest,
        Random,
        FromFilter 
    },
    data() {
        return {
            text1: '',
            errorMes: false,
            search: '',
            paramIng: [],
            ingridients: [],
            dataFilter: [],
            ingridientsSelected: [],
            dishSingle: null,
            dataCategory: null,
            dataCountry: null,
            ingredient: [],
            measure: [],
            countryFilter: '',
            catFilter: '',
            routeName: '',
            settings: {
                "dots": true,
                "infinite": false,
                "speed": 500,
                "autoplay": true,
                "autoplaySpeed": 2500,
                "arrows": true,
                "slidesToShow": 4,
                "slidesToScroll": 4,
                "initialSlide": 0,
                "responsive": [
                    {
                    "breakpoint": 1024,
                        "settings": {
                            "slidesToShow": 3,
                            "slidesToScroll": 3,
                            "infinite": true,
                            "dots": true
                        }
                    },
                    {
                    "breakpoint": 600,
                        "settings": {
                            "slidesToShow": 2,
                            "slidesToScroll": 2,
                            "initialSlide": 2
                        }
                    },
                    {
                    "breakpoint": 480,
                        "settings": {
                            "slidesToShow": 1,
                            "slidesToScroll": 1
                        }
                    }
                ],
            }
        }
    },
    props: {
        list: {
            type: [Array],
            default: () => []
        }
    },
    async mounted() {
        const text = "And you don't know what to cook."
        let i = 0
        const speed = 100 

        const typeWriter = () => {
            if (i < text.length) {
            this.text1 += text.charAt(i)
            i++
            setTimeout(typeWriter, speed)
            }
        }
        typeWriter()
        
        this.fetchIngridient()
        this.getCategoryFilter(this.category[0].strCategory)
        // this.getCountryFilter(this.list[0].strArea)
        this.routeName = this.$route.params.name
        if(this.routeName) {
            // const data = await this.$axios.$get(`${filterbying}${this.routeName}`)
            const data = await this.$axios.$get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?c=${this.routeName}`)

            console.log("data", data)
                
            this.dataFilter = data.meals && data.meals.length ? data.meals : ''

            setTimeout(()=>{
                this.$refs.filterbox.scrollIntoView({
                    behavior: 'smooth',
                    alignToTop: true
                })
            }, 300)
        }
    },
    computed: {
        ...mapState(['category']),
        tags() {
            let temp 
            if(this.dishSingle) {
                temp = `${this.dishSingle.strTags}`
            } else {
                temp = "You are hungry??? And you don't know what to cook. Tap and cook a random dish. Random dish."
            }
            return temp
        },
        seoTitle() {
            let temp
            if(this.dishSingle) {
                temp = `Try to cook a ${this.dishSingle.strMeal}`
            } else {
                temp = "You are hungry??? And you don't know what to cook. Tap and cook a random dish. Random dish."
            }
            return temp
        },
        coverUrl() {
            let temp
            if(this.dishSingle) {
                temp = `background-image: url(${this.dishSingle.strMealThumb})`

            } else {
                temp = `background-image: url('/img/home/food-2.jpeg')`
            }
            
            
            return temp
        },
        filterIngridient() { 
            return this.ingridients.filter(post => {
                return post.strIngredient.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: {
        clear() {
            this.paramIng = []
            this.dataFilter = []
        },
        clearBy(index) {
            this.paramIng.splice(index, 1);
            this.dataFilter = []
        },
        saveToSelected(el) {
            if(!this.paramIng.includes(el)){
                this.paramIng.push(el)

                // setTimeout(()=>{
                //     this.fetchDataFilter()
                // }, 250)
            } else {
            }
        },
        async fetchDataFilter() {
            let params = this.paramIng.toString()
            
            if(this.paramIng.length) {       
                const data = await this.$axios.$get(`${filterbying}${params}`)
                
                this.dataFilter = data.meals && data.meals.length ? data.meals : ''  

                setTimeout(()=>{
                  this.$refs.filterbox.scrollIntoView({
                        behavior: 'smooth',
                        alignToTop: true
                    })
                }, 300)

            } else {
                const data = await this.$axios.$get(urlRandomApi)
                this.dishSingle = data?.meals?.[0]

                if (process.client) {
                    setTimeout(()=>{
                    this.$refs.dishSingle.scrollIntoView({
                            behavior: 'smooth',
                            alignToTop: true
                        })
                    }, 300)
                }

            }
            // // www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
            
        },
        async fetchIngridient() {
            const data = await this.$axios.$get(urlIngridient)
            this.ingridients = data.meals
        },
        async fetchDataById(id) {
            this.dataFilter = []
            
            const data = await this.$axios.$get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`)
            
            this.dishSingle = data?.meals?.[0]

            if (process.client) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            }
        },
        async fetchCategoryData() {
            let params = ``
            const data = await this.$axios.$get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?c=${this.catFilter}`)
            
            this.dataCategory = data?.meals
        },
        async fetchCountryData() {
            let params = ``
            const data = await this.$axios.$get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?a=${this.countryFilter}`)
            
            this.dataCountry = data?.meals
        },
        getData(query) {
            return this.$axios.get(query).then(({data})=> data)
        },
        getCountryFilter(val) {
            this.countryFilter = val
        },
        getCategoryFilter(val) {
            this.catFilter = val
        }
    },
    watch: {
        dishSingle(val) {
            if(this.dishSingle) {
                
                for (var prop in this.dishSingle) {
                    
                    if(prop.indexOf('strIngredient') !== -1 && this.dishSingle[prop])  {
                        this.ingredient.push(this.dishSingle[prop])
                    } 
                    if(prop.indexOf('strMeasure') !== -1 && this.dishSingle[prop])  {
                        this.measure.push(this.dishSingle[prop])
                    }        

                }
            }
        },
        filterIngridient(val) {
            // console.log('val', val)
        },        
        catFilter(val) {
            if(val) {
                this.dataCategory = null
                this.fetchCategoryData()
            }
        },
        countryFilter(val) {
            if(val) {
                this.dataCountry = null
                this.fetchCountryData()
            }
        }
    },
    head () {
        return {
            title: this.seoTitle,
            meta: [{ hid: 'description',  name: 'description', content: 'Tap and cook a random dish', name: 'keywords', content: this.tags}]
        }
    }

}
</script>

<style lang="css" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 500ms ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.home-enter-active, .home-leave-active { transition: opacity .5s; }
  .home-enter, .home-leave-active { opacity: 0; }
</style>