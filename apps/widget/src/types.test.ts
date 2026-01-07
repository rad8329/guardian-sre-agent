import { describe, it, expect } from 'vitest'
import type { HITLEvent, HITLAction } from './types'

describe('HITL Types', () => {
  it('should define valid HITLAction values', () => {
    const actions: HITLAction[] = ['approve', 'reject', 'ask']
    expect(actions).toHaveLength(3)
  })

  it('should define valid HITLEvent structure', () => {
    const event: HITLEvent = {
      id: 'test-123',
      timestamp: new Date().toISOString(),
      incident: {
        title: 'High latency on checkout-service',
        severity: 'critical',
        service: 'checkout-service',
      },
      diagnosis: {
        summary: 'Connection pool exhausted',
        details: ['pg_stat shows 100% connections used'],
      },
      simulation: {
        passed: true,
        output: 'Restart simulation successful',
      },
      proposedAction: {
        description: 'Restart the checkout service',
        command: 'kubectl rollout restart deploy/checkout-svc',
      },
    }

    expect(event.id).toBe('test-123')
    expect(event.incident.severity).toBe('critical')
    expect(event.simulation.passed).toBe(true)
  })
})
