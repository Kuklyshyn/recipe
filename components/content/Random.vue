<template>
    <div>
      <h3 class="text-3xl font-bold sm:text-4xl text-center mb-10">Random recipes</h3>
      <div class="post-grid" v-if="list.length">
          <article class="post-item" v-for="(item, index) in list" :key="index" @click="showResult(item)">
              <div class="post-item-img">
                  <img :src="item.strMealThumb" :alt="item.strMeal">
              </div>
              <h4 class="post-item-title">{{ item.strMeal }}</h4>
              <span class="post-item-category">{{ item.strCategory }}</span>
              <span v-if="item.strArea !== 'Unknown'" class="post-item-area"><strong>Area:</strong> {{ item.strArea }}</span>
              <div class="post-item-ing">
                  <span v-for="(el, index) in getIngridient(item)" :key="index">{{ el }}</span>
              </div>
          </article>
      </div>
  
      <div ref="itemresultrandom" class="post-full-grid">
          <div v-show="itemResult.idMeal"> 
              <article class="post-full-item">
                  <div class="post-full-img">
                      <img :src="itemResult.strMealThumb" :alt="itemResult.strMeal">
                  </div>
                  <div class="post-full-text">
                      <h4 class="post-full-title">{{ itemResult.strMeal }}</h4>
                      <div class="post-item-ing">
                          <span v-for="(el, index) in getIngridient(itemResult)" :key="index">{{ el }}</span>
                      </div>
                      <p class="post-full-desc">
                          {{ itemResult.strInstructions }}
                      </p>
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
                  </div>
              </article>
          </div>
      </div>
    </div>
  </template>
  <script>
  import { urlRandom  } from '@/utils.js'
  import { CodeNode } from 'source-list-map'
  export default {
      data() {
          return {
              list: [],
              itemResult: [],
              ingredient: [],
              measure: [],
          }
      },
      mounted() {
          this.fetchLatest()
      },
      methods: {
          showResult(item) {
              
              this.itemResult = item
              setTimeout(()=>{
                  this.$refs.itemresultrandom.scrollIntoView({
                      behavior: 'smooth',
                      alignToTop: true
                  })
              }, 300)
          },
          async fetchLatest() {
              const data = await this.$axios.$get(urlRandom)
              this.list = data.meals
          },
          getIngridient(item) {
              let temp = []
  
              for (var prop in item) {
                  
                  if(prop.indexOf('strIngredient') !== -1 && item[prop])  {
                      temp.push(item[prop])
                  } 
              }
              
              return temp
          }
      },
      watch: {
          itemResult(val) {
              if(val) {
                  
                  for (var prop in val) {
                      
                      if(prop.indexOf('strIngredient') !== -1 && val[prop])  {
                          this.ingredient.push(val[prop])
                      } 
                      if(prop.indexOf('strMeasure') !== -1 && val[prop])  {
                          this.measure.push(val[prop])
                      }        
  
                  }
              }
          }
      }
  }
  </script>