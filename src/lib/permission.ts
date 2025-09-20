import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
  subscriptionLeveL: SubscriptionLevel,
  currentResumeCount: number
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: 3,
    pro: 5,
    pro_plus: Infinity,
  };

  const maxResume = maxResumeMap[subscriptionLeveL];

  return maxResume > currentResumeCount;
}

export function canUseAiTools(subscriptionLeveL: SubscriptionLevel) {
  return subscriptionLeveL !== "free";
}
