import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("/")
  getHello(): string {
    return "상태 확인 완료3";
  }
}
