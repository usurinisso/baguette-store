import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { BaguetteCondition } from 'persistence/entities/enums/baguetteCondition.enum';
import { BaguettesService } from 'services/baguettes.service';

@Injectable()
export class BaguettesConditionTask {
  constructor(private readonly baguettesService: BaguettesService) {}
  private readonly logger = new Logger(BaguettesConditionTask.name);

  @Cron('0 0 */2 * * *', {
    name: 'ConditionCron',
  })
  async handleCron(): Promise<void> {
    this.logger.debug('Baguette condition check initiated');
    const timeNow = DateTime.now().toUTC();

    const hotToFreshQueryTime = timeNow.minus({ hours: parseInt(process.env.HOT_TO_FRESH) });
    const freshToHardQueryTime = timeNow.minus({ hours: parseInt(process.env.FRESH_TO_HARD) });
    const hardToStaleQueryTime = timeNow.minus({ hours: parseInt(process.env.HARD_TO_STALE) });

    const hotToFreshBaguettes = await this.baguettesService.findBaguettesOlderThan(
      hotToFreshQueryTime,
      BaguetteCondition['Hot and fresh'],
    );
    const freshToHardBaguettes = await this.baguettesService.findBaguettesOlderThan(
      freshToHardQueryTime,
      BaguetteCondition['Fresh'],
    );
    const hardToStaleBaguettes = await this.baguettesService.findBaguettesOlderThan(
      hardToStaleQueryTime,
      BaguetteCondition['Hard'],
    );

    if (hotToFreshBaguettes?.length > 0) {
      this.baguettesService.updateCondition(hotToFreshBaguettes, BaguetteCondition['Fresh']);
    }
    if (freshToHardBaguettes?.length > 0) {
      this.baguettesService.updateCondition(freshToHardBaguettes, BaguetteCondition['Hard']);
    }
    if (hardToStaleBaguettes?.length > 0) {
      this.baguettesService.updateCondition(hardToStaleBaguettes, BaguetteCondition['Stale']);
    }
  }
}
