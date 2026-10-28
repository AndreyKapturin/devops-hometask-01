import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { readAppConfig } from 'src/todos/todos.service';

// Health-эндпоинт для hw4: smoke-проверка и AI-агент сверяют version
// с APP_VERSION на сервере. Подкручен из env-переменной APP_VERSION,
// которую compose прокидывает в контейнер из .env.development.compose.
// Если переменной нет — отдаём 'unknown' (не падаем).

@ApiExcludeController()
@Controller('health')
export class HealthController {
  @Get()
  getHealth(): { status: 'ok' } {
    const { health } = readAppConfig();
    if (health) {
      return {
        status: 'ok',
      };
    }
    throw new ServiceUnavailableException('app unavailable');
  }
  @Get('/ready')
  isReady(): { status: 'ok' } {
    return {
      status: 'ok',
    };
  }
}
