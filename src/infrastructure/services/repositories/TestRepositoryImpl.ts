import type { TestRepository } from "@/core/test/TestRepository";
import type { TestArrayEntity, TestEntity } from "@/core/test/TestEntity";
import { testFetchClient, type TestFetch } from "../data-sources/TestFetch";
import { Either } from "@/helpers/Either";
import { EFailureType, type IFailure } from "@/types/Failure";
import axios, { AxiosError } from "axios";
import type { IRemoteResponse } from "@/types/ResponseInternal";
import type { ResponseDTO } from "@/types/ResponseDTO";

export class TestFetchRepositoryImpl implements TestRepository {
  constructor(private testFetchClient: TestFetch) { }

  fetchTest(params: any): Promise<Either<IFailure, TestEntity>> {
    // return this.testFetchClient.testFetch(params)
    //   .then(res => {
    //     const remoteData = res.data;

    //     if (remoteData.) {
    //       return Either.right(remoteData.data);
    //     } else {
    //       return Either.left({
    //         type: EFailureType.ResponseInvalid,
    //         message: remoteData.message || 'Unknown error',
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.error(`[${TestFetchRepositoryImpl.name}.${this.fetchTest.name}] catch.error:`, error);
    //     return Either.left({
    //       type: EFailureType.Unexpected,
    //       message: EFailureType.Unexpected + 'FAILURE',
    //     });
    //   });
    throw new Error("Method not implemented.");
  }

  async fetchTestArray(params: any): Promise<ResponseDTO<TestArrayEntity[]>> {
    try {
      const response = await this.testFetchClient.testFetchArray(params);
      console.log('Fetch successful:', response.data);
      return response.data;
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

