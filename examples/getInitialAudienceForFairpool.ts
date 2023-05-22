import { Audience } from '../../../projects/Fairpool/models/Audience'
import { ProducerConfig } from '../getProducerBuilder'

export async function getInitialAudienceForFairpool() {
  const config: Partial<ProducerConfig<Audience>> = {
    isStatic: false, // there are multiple audiences
  }
}
