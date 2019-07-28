<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Categories</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <nuxt-link dark class="v-btn primary mb-2" to="/dashboard/categories/create"> <v-icon color="white">add</v-icon> New Category</nuxt-link>
    </v-toolbar>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="categories"
      :pagination.sync="pagination"
      :loading="loading"
      select-all
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:headers="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>

      <template  v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-center">
           {{ props.item.status }}
          </td>
          <td class="align-center justify-center layout px-0">
            <nuxt-link  :to="{ name: 'dashboard-categories-edit-slug', params: {slug: props.item.slug} }"><v-icon small class="mr-2">edit</v-icon></nuxt-link>
            <v-icon small @click.prevent="deleteCategory(props.item)">delete</v-icon>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  middleware: ["dashboard"],
  data() {
    return {
      loading:true,
      
      pagination: {
        sortBy: "name"
      },
      selected: [],

      headers: [
        { text: "Title", value: "title", width: "30%", align: "left" },
        { text: "Description", value: "description" , align: "left"},
        { text: "Status", value: "status", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],

      categories: []
    };
  },

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.posts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    deleteCategory(category){
      console.log(category);
      this.$axios.delete(`/categories/${category.slug}`).then( res => {
        this.categories = this.categories.filter(cat => cat.id !== category.id)
      }).catch(err => {
        console.log(err);
        
      })
    }
  },

  mounted(){
    this.$axios.get('/categories').then(res => {
      this.categories = res.data.data;
      this.loading = false;
    })
  }
};
</script>