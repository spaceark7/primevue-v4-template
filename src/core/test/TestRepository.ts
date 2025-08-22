import type { TestArrayEntity, TestEntity } from "./TestEntity";

export interface TestRepository {
  fetchTest(params: any): Promise<TestEntity>;
  fetchTestArray(params: any): Promise<TestArrayEntity[]>;
}
