import { ns as parentNs } from '../ns';

export function ns(context: string) {
  return parentNs(`crud:${context}`);
}
