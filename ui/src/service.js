/*
 * Service layer for plugin "qa" (Quality Assurance, service-level).
 *
 * The legacy `qa.js` controller was an empty `define({})`. It ships
 * generic i18n + delegation of the subscription-row hooks to the
 * qa-<tool> sub-plugin — the `vm`/`bt`/`build` pattern.
 */
import { toolPluginId, delegateFeature } from '@ligoj/host'

/** `service:qa:sonarqube:1` → `qa-sonarqube`; null when no tool segment. */
export const subPluginIdFor = toolPluginId

/** Delegate `action` to the qa-<tool> sub-plugin; degrade to [] on any failure. */
export const delegateToToolPlugin = (subscription, action) => delegateFeature(subscription, action, 'qa')

const service = {
  subPluginIdFor,
  delegateToToolPlugin,
  renderFeatures(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderFeatures')
    return out.length ? out : []
  },
  renderDetailsKey(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderDetailsKey')
    return out.length ? out : null
  },
  renderDetailsFeatures(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderDetailsFeatures')
    return out.length ? out : null
  },
}

export default service
