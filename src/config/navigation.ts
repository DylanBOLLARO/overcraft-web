import { MarketingConfig } from "@/src/types"
import { pagePath } from "../constants/enum"

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: pagePath.DOCUMENTATION,
    },
    {
      title: "Download",
      href: pagePath.HOME,
    },
  ],
}
