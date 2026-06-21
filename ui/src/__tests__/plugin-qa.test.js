import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { pluginRegistry, useI18nStore } from '@ligoj/host'
import def from '../index.js'
import { subPluginIdFor } from '../service.js'
import sonarDef from '../../../../plugin-qa-sonarqube/ui/src/index.js'

beforeEach(() => { setActivePinia(createPinia()) })

describe('plugin-qa manifest', () => {
  it('exports service-level fields (no requires, no routes)', () => {
    expect(def.id).toBe('qa')
    expect(def.requires).toBeUndefined()
    expect(def.routes).toBeUndefined()
    expect(def.meta).toMatchObject({ icon: expect.any(String), color: expect.any(String) })
  })
  it('install() merges i18n', () => {
    const i18n = useI18nStore()
    def.install()
    expect(i18n.t('service:qa')).toBe('QA')
  })
  it('feature() throws for unknown action', () => {
    expect(() => def.feature('nope')).toThrow(/no feature "nope"/)
  })
  it('renders nothing without a registered tool', () => {
    expect(def.feature('renderFeatures', { node: { id: 'service:qa:sonarqube:1' }, parameters: {} })).toEqual([])
  })
})

describe('subPluginIdFor', () => {
  it('maps tool node → qa-<tool>', () => {
    expect(subPluginIdFor({ node: { id: 'service:qa:sonarqube:1' } })).toBe('qa-sonarqube')
  })
  it('null without a tool segment', () => {
    expect(subPluginIdFor({ node: { id: 'service:qa' } })).toBeNull()
  })
})

describe('plugin-qa → plugin-qa-sonarqube delegation', () => {
  beforeEach(() => {
    def.install(); sonarDef.install()
    pluginRegistry.register('qa-sonarqube', sonarDef)
  })
  afterEach(() => { pluginRegistry.remove('qa-sonarqube') })

  it('appends the SonarQube dashboard link to renderFeatures', () => {
    const result = def.feature('renderFeatures', {
      node: { id: 'service:qa:sonarqube:1' },
      parameters: { 'service:qa:sonarqube:url': 'https://sonar.example.org', 'service:qa:sonarqube:project': 'org.ligoj:app' },
    })
    expect(result.length).toBe(1)
    expect(result[0].props.href).toBe('https://sonar.example.org/dashboard/index/org.ligoj%3Aapp')
  })

  it('does not delegate for a non-sonarqube tool', () => {
    const result = def.feature('renderFeatures', {
      node: { id: 'service:qa:other:1' },
      parameters: { 'service:qa:sonarqube:url': 'https://sonar.example.org', 'service:qa:sonarqube:project': 'x' },
    })
    expect(result).toEqual([])
  })
})
