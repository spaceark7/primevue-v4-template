import type { TestArrayEntity, TestEntity } from "@/core/test/TestEntity";
import { testFetchArrayUseCase, testFetchUseCase } from "@/infrastructure/containers/TestFetchContainer";
import type { ResponseDTO } from "@/types/ResponseDTO";
import { useQuery, type UseQueryOptions, type UseQueryReturnType } from "@tanstack/vue-query";
import { computed, ref, toRef } from "vue";

/**
 * Composable for test API
 * @description Contains the queries and mutations using tanstack query
 * @example Usage example for Query
 * ```ts
 * const { fetchTest } = useTestFetchApi();
 * const options = {...} // Optional
 *  // Define your query parameters
 * const queryParams = ref<TestQueryParams>({
 *   page: 1,
 *   limit: 10,
 *   search: ''
 * });
 * const testQuery = fetchTest(queryParams.value, options); // This testQuery definition is Important
 * testQuery.refetch(); // Execute the query
 * ```
 * @example Usage example for Mutation
 * ```ts
 * const { createTest } = useTestFetchApi();
 * createTest.mutate(); // Execute the mutation directly
 * ```
 * @returns {Object} - returns the queries and mutatations
 */
export const useTestFetchApi = () => {
  const queryKeys = {
    all: () => ['test-fetch'],
    detail: (params?: any) => [...queryKeys.all(), params],
    list: (params?: any) => [...queryKeys.all(), params],

  }
  const fetchTest = (params?: any, options?: UseQueryOptions<any, Error>): UseQueryReturnType<any | undefined, Error> => useQuery<any>({
    queryKey: queryKeys.all(),
    queryFn: () => testFetchUseCase.call(params),
    enabled: false,
    ...options
  });

  // const findManyBook = (params?: any, options?: UseQueryOptions<ResponseDTO<TestArrayEntity[]>, Error>): UseQueryReturnType<ResponseDTO<TestArrayEntity[]>, Error> => useQuery({
  //   // queryKey: queryKeys.list(params),
  //   queryKey: ['books'],
  //   queryFn: () => testFetchArrayUseCase.call(params),
  //   enabled: false,
  //   ...options
  // });
  // const findManyBook = (params?: any, options?: UseQueryOptions<TestArrayEntity[], Error>) => {
  //   const query = useQuery({
  //     // queryKey: queryKeys.list(params),
  //     queryKey: ['books'],
  //     queryFn: () => testFetchArrayUseCase.call(params),
  //     enabled: false,
  //     ...options
  //   });
  //   const data = computed(() => query.data.value || []);

  //   return {
  //     ...query,
  //     data
  //   };
  // }
  const findManyBook = (params?: any, options?: UseQueryOptions<any[], Error>) =>
    useQuery({
      // queryKey: queryKeys.list(params),
      queryKey: ['books'],
      queryFn: () => testFetchArrayUseCase.call(params),
      enabled: false,
      ...options
    });


  return {
    fetchTest,
    findManyBook
  };
};
