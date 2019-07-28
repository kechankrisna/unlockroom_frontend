<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Posts</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <nuxt-link dark class="v-btn primary mb-2" to="/dashboard/posts/create"> <v-icon color="white">add</v-icon> New Post</nuxt-link>
    </v-toolbar>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="posts"
      :pagination.sync="pagination"
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

      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.author }}</td>
          <td class="text-xs-left">
            <v-chip
              color="primary"
              text-color="white"
              v-for="(category, index) in props.item.categories"
              :key="index"
            >{{category.title}}</v-chip>
          </td>
          <td class="text-xs-left">
            <v-chip
              label
              color="pink"
              text-color="white"
              v-for="(tag, index) in props.item.tags"
              :key="index"
            >
              <v-icon left>label</v-icon>
              {{ tag.title }}
            </v-chip>
          </td>
          <td class="text-xs-left">{{ props.item.comments }}</td>
          <td class="text-xs-left">{{ props.item.created_at }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2">edit</v-icon>
            <v-icon small>delete</v-icon>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
      <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
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
      pagination: {
        sortBy: "name"
      },
      selected: [],

      headers: [
        { text: "Title", value: "title", width: "30%" },
        { text: "Author", value: "author" },
        { text: "Category", value: "categories" },
        { text: "Tags", value: "tags",  },
        { text: "Comments", value: "comments" },
        { text: "Publish", value: "created_at" },
        { text: "Action", value: "action", align: "center" }
      ],

      posts: [
        {
          id: 1,
          title:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "steven",
          categories: [
            {
              id: 1,
              title: "category 1",
              link: ""
            }
          ],
          tags: [
            {
              id: 1,
              title: "Tag 1",
              link: ""
            },
            {
              id: 1,
              title: "Tag 2",
              link: ""
            },
            {
              id: 1,
              title: "Tag 3",
              link: ""
            }
          ],
          comments: 3,
          created_at: "04-jan-2018"
        },
        {
          id: 2,
          title:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "steven",
          categories: [
            {
              id: 1,
              title: "category 1",
              link: ""
            },
            {
              id: 1,
              title: "category 2",
              link: ""
            }
          ],
          tags: [
            {
              id: 1,
              title: "Tag 1",
              link: ""
            },
            {
              id: 1,
              title: "Tag 2",
              link: ""
            },
            {
              id: 1,
              title: "Tag 3",
              link: ""
            }
          ],
          comments: 3,
          created_at: "04-jan-2018"
        },
        {
          id: 3,
          title:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto",
          author: "steven",
          categories: [
            {
              id: 1,
              title: "category 1",
              link: ""
            },
            {
              id: 1,
              title: "category 2",
              link: ""
            },
            {
              id: 1,
              title: "category 3",
              link: ""
            }
          ],
          tags: [
            {
              id: 1,
              title: "Tag 1",
              link: ""
            },
            {
              id: 1,
              title: "Tag 2",
              link: ""
            },
            {
              id: 1,
              title: "Tag 3",
              link: ""
            }
          ],
          comments: 3,
          created_at: "04-jan-2018"
        },
        {
          id: 4,
          title:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "steven",
          categories: [
            {
              id: 1,
              title: "category 1",
              link: ""
            }
          ],
          tags: [
            {
              id: 1,
              title: "Tag 1",
              link: ""
            },
            {
              id: 1,
              title: "Tag 2",
              link: ""
            },
            {
              id: 1,
              title: "Tag 3",
              link: ""
            }
          ],
          comments: 3,
          created_at: "04-jan-2018"
        },
        {
          id: 5,
          title:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "steven",
          categories: [
            {
              id: 1,
              title: "category 1",
              link: ""
            },
            {
              id: 1,
              title: "category 2",
              link: ""
            }
          ],
          tags: [
            {
              id: 1,
              title: "Tag 1",
              link: ""
            },
            {
              id: 1,
              title: "Tag 2",
              link: ""
            },
            {
              id: 1,
              title: "Tag 3",
              link: ""
            }
          ],
          comments: 3,
          created_at: "04-jan-2018"
        },
        {
          id: 6,
          title:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto",
          author: "steven",
          categories: [
            {
              id: 1,
              title: "category 1",
              link: ""
            },
            {
              id: 1,
              title: "category 2",
              link: ""
            },
            {
              id: 1,
              title: "category 3",
              link: ""
            }
          ],
          tags: [
            {
              id: 1,
              title: "Tag 1",
              link: ""
            },
            {
              id: 1,
              title: "Tag 2",
              link: ""
            },
            {
              id: 1,
              title: "Tag 3",
              link: ""
            }
          ],
          comments: 3,
          created_at: "04-jan-2018"
        }
      ]
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
    }
  }
};
</script>