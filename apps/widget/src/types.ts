export type HITLAction = 'approve' | 'reject' | 'ask'

export interface HITLEvent {
  id: string
  timestamp: string
  incident: {
    title: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    service: string
  }
  diagnosis: {
    summary: string
    details: string[]
  }
  simulation: {
    passed: boolean
    output: string
  }
  proposedAction: {
    description: string
    command: string
  }
}

export interface GuardianHITLProps {
  wsUrl: string
  onAction?: (eventId: string, action: HITLAction, message?: string) => void
}