import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 为所有注册的路由设置一个全局前缀
  app.setGlobalPrefix("api");
  await app.listen(3000);
}
bootstrap();
