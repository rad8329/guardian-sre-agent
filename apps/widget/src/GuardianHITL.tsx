import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import type { HITLEvent, HITLAction, GuardianHITLProps } from './types'

export function GuardianHITL({ wsUrl, onAction }: GuardianHITLProps) {
  const [events, setEvents] = useState<HITLEvent[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const s = io(wsUrl)
    setSocket(s)

    s.on('hitl:propose', (event: HITLEvent) => {
      setEvents((prev) => [event, ...prev])
    })

    s.on('hitl:resolved', (eventId: string) => {
      setEvents((prev) => prev.filter((e) => e.id !== eventId))
    })

    return () => {
      s.disconnect()
    }
  }, [wsUrl])

  const handleAction = (eventId: string, action: HITLAction, message?: string) => {
    socket?.emit(`hitl:${action}`, { eventId, message })
    onAction?.(eventId, action, message)
  }

  if (events.length === 0) {
    return <div className="guardian-hitl guardian-hitl--empty">No pending approvals</div>
  }

  return (
    <div className="guardian-hitl">
      {events.map((event) => (
        <div key={event.id} className="guardian-hitl__event">
          <div className="guardian-hitl__header">
            <span className={`guardian-hitl__severity guardian-hitl__severity--${event.incident.severity}`}>
              {event.incident.severity}
            </span>
            <span className="guardian-hitl__service">{event.incident.service}</span>
          </div>

          <h3 className="guardian-hitl__title">{event.incident.title}</h3>

          <div className="guardian-hitl__section">
            <h4>Diagnosis</h4>
            <p>{event.diagnosis.summary}</p>
          </div>

          <div className="guardian-hitl__section">
            <h4>Simulation {event.simulation.passed ? '✅' : '❌'}</h4>
            <pre>{event.simulation.output}</pre>
          </div>

          <div className="guardian-hitl__section">
            <h4>Proposed Action</h4>
            <p>{event.proposedAction.description}</p>
            <pre>{event.proposedAction.command}</pre>
          </div>

          <div className="guardian-hitl__actions">
            <button
              className="guardian-hitl__btn guardian-hitl__btn--approve"
              onClick={() => handleAction(event.id, 'approve')}
            >
              ✅ Approve
            </button>
            <button
              className="guardian-hitl__btn guardian-hitl__btn--reject"
              onClick={() => handleAction(event.id, 'reject')}
            >
              ❌ Reject
            </button>
            <button
              className="guardian-hitl__btn guardian-hitl__btn--ask"
              onClick={() => handleAction(event.id, 'ask')}
            >
              💬 Ask Agent
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}