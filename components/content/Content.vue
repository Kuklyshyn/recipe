<template>
  <div>
    <section class="b-home" :style="coverUrl">
        <h1 v-if="!dishSingle" class="font-sans text-gray-100">You are hungry???</h1>
        <h2 v-if="!dishSingle" class="font-sans text-gray-100">And you don't know what to cook.</h2>
        <h2 v-if="!dishSingle" class="font-sans text-gray-100">Tap and cook a random dish.</h2>

        <h1 v-if="dishSingle" class="font-sans text-gray-100">{{dishSingle.strMeal}}</h1>
        <div v-if="dishSingle" class="short-disc font-sans text-gray-100">
            <span class="font-sans text-gray-50">Category: {{dishSingle.strCategory}}</span><br/>
            <span class="font-sans text-gray-50">Country: {{dishSingle.strArea}}</span><br/>
            <span class="font-sans text-gray-50" v-if="tags !== 'null'">Tags: {{tags}}</span><br/>
            

        </div>

        <div class="mt-10 flex space-x-2 justify-center">
            <button @click="fetchData()" type="button" class="btn-fly inline-block px-16 py-2.5 bg-indigo-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-600 hover:shadow-lg focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">Random dish</button>
        </div>
    </section>

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

            <div v-if="dishSingle.strYoutube" class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h3 class="mb-10 text-center text-3xl font-bold sm:text-4xl">Video</h3>
                
                <iframe class="mx-auto" width="100%" height="400" :src="`${dishSingle.strYoutube}?autoplay=0`" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div> 

        </section>
    </transition>


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
            <transition appear>
                <div class="result">
                    <div class="mt-10" >
                        <transition appear>
                        
                            <VueSlickCarousel  v-if="this.dataCategory"  v-bind="settings">
                                <div class="a-slide" v-for="(slide) in this.dataCategory" :index="slide.idMeal" :key="slide.idMeal" @click="fetchDataById(slide.idMeal)">
                                    <div class="a-slide-img">
                                        <img :src="slide.strMealThumb" :alt="slide.strMeal">
                                    </div>
    
                                    <h4 class="a-slide-title text-xl font-bold">{{slide.strMeal}}</h4>
                                </div>
                            </VueSlickCarousel>
                        </transition>
                        
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
            <transition  appear>
                <div v-if="this.dataCountry" class="result">
                    <div class="mt-10">
                        <client-only>
                            <transition appear>
                            <VueSlickCarousel v-bind="settings">
                                <div class="a-slide" v-for="(slide) in this.dataCountry" :index="slide.idMeal" :key="slide.idMeal" @click="fetchDataById(slide.idMeal)">
                                    <div class="a-slide-img">
                                        <img :src="slide.strMealThumb" :alt="slide.strMeal">
                                    </div>
    
                                    <h4 class="a-slide-title text-xl font-bold">{{slide.strMeal}}</h4>
                                </div>
                            </VueSlickCarousel>
                        </transition>
                        </client-only>
                    </div>
                </div>
            </transition>
        </div>
        
    </section>

  </div>
</template>

<script>
import { urlRandomApi  } from '@/utils.js'
import { mapState } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
    components: {
        VueSlickCarousel 
    },
    data() {
        return {
            dishSingle: null,
            dataCategory: null,
            dataCountry: null,
            ingredient: [],
            measure: [],
            countryFilter: '',
            catFilter: '',
            settings: {
                "dots": true,
                "infinite": false,
                "speed": 500,
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
        }
    },
    methods: {
        async fetchData() {
            let params = ``
            const data = await this.$axios.$get(urlRandomApi)
            // www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
            this.dishSingle = data?.meals?.[0]
        },
        async fetchDataById(id) {
            
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
                    // console.log(prop)
                    
                    if(prop.indexOf('strIngredient') !== -1 && this.dishSingle[prop])  {
                        this.ingredient.push(this.dishSingle[prop])
                    } 
                    if(prop.indexOf('strMeasure') !== -1 && this.dishSingle[prop])  {
                        this.measure.push(this.dishSingle[prop])
                    }        

                }
            }
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
</style>