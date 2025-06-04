import React from 'react'
import { render, act } from '@testing-library/react'
import { useBadgeManager } from '../components/BadgeManager'

jest.mock('../data/badges', () => ({
  badges: [
    { id: 'badge1', poiId: 'p1', names: { en: 'B1', de: 'B1' }, descriptions: { en: '', de: '' }, imageUrl: '' }
  ]
}))

const TestComponent = React.forwardRef<
  ReturnType<typeof useBadgeManager>,
  Record<string, never>
>(function TestComponent(_, ref) {
  const manager = useBadgeManager()
  React.useImperativeHandle(ref, () => manager)
  return null
})

describe('useBadgeManager', () => {
  it('awards a badge only once', () => {
    const ref = React.createRef<ReturnType<typeof useBadgeManager>>()
    render(<TestComponent ref={ref} />)
    act(() => { ref.current!.awardBadge('p1') })
    expect(ref.current!.earnedBadges).toContain('badge1')
    expect(ref.current!.newBadge?.id).toBe('badge1')
    act(() => { ref.current!.awardBadge('p1') })
    expect(ref.current!.earnedBadges).toHaveLength(1)
  })
})
