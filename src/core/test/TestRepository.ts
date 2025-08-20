import type { Either } from "@/helpers/Either";
import type { TestArrayEntity, TestEntity } from "./TestEntity";
import type { IFailure } from "@/types/Failure";
import type { ResponseDTO } from "@/types/ResponseDTO";

export interface TestRepository {
  fetchTest(params: any): Promise<Either<IFailure, TestEntity>>;
  fetchTestArray(params: any): Promise<ResponseDTO<TestArrayEntity[]>>;
}
