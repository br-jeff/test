import 'reflect-metadata';
import { container } from 'tsyringe';
import { createExpressServer, useContainer } from 'routing-controllers';
import { TsyringeAdapter } from '@src/external/config/container';
import { logger } from '@src/external/utils/logger';
import settings from '@config/settings'
import { bootstrap } from './bootstrap'
import { setupSwagger } from './swagger'

const app = createExpressServer({
  controllers: bootstrap(),
});

useContainer(new TsyringeAdapter(container))
setupSwagger(app)

app.on('error', (error: Error) => logger.error({ error }))

app.listen(settings.PORT, async () => {
  logger.info(`App is running on port ${settings.PORT}`);
});
