<template>
  <div class="card">
    <h2>Example</h2>
    <p>Fetch many books using the Test API.</p>
    <Button @click="fetchBooks2" :loading="booksIsLoading">Fetch Books</Button>
    <div v-if="booksIsLoading">Loading...</div>
    <div v-else-if="booksIsError">
      Error: {{ booksError?.message }}
    </div>
    <ul v-else>
        <li v-for="book in booksData" :key="book.uuid">
          {{ book.title }} by {{ book.author }}
        </li>
    </ul>

  </div>

</template>

<script setup lang="ts">
import { useTestFetchApi } from '@/ui/composables/apis/TestApi';
import { serializeQuery } from 'prisma-query-tools';
import { onBeforeMount } from 'vue';


const queryOptions = {
  page: 1,
  limit: 10,
  // sort: 'name:asc,createdAt:desc',
  fields: ['id', 'profile.firstName', 'email'],
  filters: {
    groupId: 1,
  }
};



//#region Composables
const { findManyBook } = useTestFetchApi()
const {
  data: booksData,
  isLoading: booksIsLoading,
  isPending: booksIsPending,
  isError: booksIsError,
  error: booksError,
  isSuccess: booksIsSuccess,
  refetch: fetchBooks
} = findManyBook(queryOptions)
//#endregion Composables

const fetchBooks2 = async () => {
  await fetchBooks()
  console.log('Books fetched:', booksData.value);
}


onBeforeMount(async () => {
  await fetchBooks()
  console.log('Books fetched:', booksData.value);
  // You can use the result of the fetchManyBook() here
})



</script>

<style scoped></style>
