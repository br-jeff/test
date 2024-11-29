import { Get, JsonController } from "routing-controllers";
import {injectable} from "tsyringe";
import { GetHealthUseCase } from "@src/application/use-case/health/get-health"

@JsonController()
@injectable()
export class HealthController {
  constructor(
    private readonly getHealthUseCase: GetHealthUseCase
  ) { }

 @Get('/')
  getHealth() {
    return this.getHealthUseCase.execute()
  }
}
