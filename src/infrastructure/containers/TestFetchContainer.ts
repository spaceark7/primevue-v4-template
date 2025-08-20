import { TestFetchUseCase } from "@/core/test/use-cases/TestFetchUseCase";
import { testFetchRepository } from "../services/repositories/TestRepositoryImpl";
import { TestFetchArrayUseCase } from "@/core/test/use-cases/TestFetchArrayUseCase";

const testFetchUseCase = new TestFetchUseCase(testFetchRepository);
const testFetchArrayUseCase = new TestFetchArrayUseCase(testFetchRepository);

export { testFetchUseCase , testFetchArrayUseCase };
