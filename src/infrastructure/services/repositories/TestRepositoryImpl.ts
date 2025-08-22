import type { TestArrayEntity, TestEntity } from "@/core/test/TestEntity";
import type { TestRepository } from "@/core/test/TestRepository";
import type { IRemoteResponse } from "@/types/ResponseInternal";
import axios, { AxiosError } from "axios";
import { testFetchClient, type TestFetch } from "../data-sources/TestFetch";

export class TestFetchRepositoryImpl implements TestRepository {
  constructor(private testFetchClient: TestFetch) { }

  async fetchTest(params: any): Promise<TestEntity> {

    try {
      const remoteResponse = await this.testFetchClient.testFetch(params);
      const responseData = remoteResponse.data;

      return responseData as TestEntity;

    } catch (error) {
      console.error(`[${TestFetchRepositoryImpl.name}.${this.fetchTest.name}] catch.error:`, error instanceof AxiosError);
      if (axios.isAxiosError(error)) {
        console.log('Axios error occurred');
        const axiosResponse = error.response;
        const remoteResponse = axiosResponse?.data as IRemoteResponse;
        console.log('Remote response:', remoteResponse);

        throw new Error(remoteResponse ? (Array.isArray(remoteResponse.message) ? remoteResponse.message.join(', ') : remoteResponse.message) : error.message);
      } else {

        throw new Error(error instanceof Error ? error.message : 'Unexpected error');
      }

    }


  }

  async fetchTestArray(params: any): Promise<TestArrayEntity[]> {
    try {
      const response = await this.testFetchClient.testFetchArray(params);
      console.log('Fetch successful:', response.data);
      const remoteData = response.data;
      return remoteData.data as TestArrayEntity[];

    } catch (error) {

      console.error(`[${TestFetchRepositoryImpl.name}.${this.fetchTestArray.name}] catch.error:`, error instanceof AxiosError);
      if (axios.isAxiosError(error)) {
        console.log('Axios error occurred');
        const axiosResponse = error.response;
        const remoteResponse = axiosResponse?.data as IRemoteResponse;
        console.log('Remote response:', remoteResponse);
        throw new Error(Array.isArray(remoteResponse.message) ? remoteResponse.message.join(', ') : remoteResponse.message ? remoteResponse.message : 'Unknown error');
      } else {
        if(error instanceof Error) {
          console.log('Error occurred:', error);
          error.name
        }
        throw new Error(error instanceof Error ? error.message : 'Unexpected error');
      }
    }
  }


}

// Create an instance using the singleton authClient
export const testFetchRepository = new TestFetchRepositoryImpl(testFetchClient);

