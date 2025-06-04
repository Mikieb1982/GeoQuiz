import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Map from '../components/Map'

jest.mock('react-leaflet', () => {
  const React = require('react')
  return {
    MapContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="map">{children}</div>,
    TileLayer: () => null,
    Marker: ({ children, eventHandlers }: any) => (
      <div data-testid="marker" onClick={() => eventHandlers?.click?.()}>{children}</div>
    ),
    Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Circle: () => null,
    useMap: () => ({ setView: jest.fn() })
  }
})

jest.mock('../data/pois', () => ({
  pois: [
    {
      id: 'poi1',
      coordinates: { latitude: 1, longitude: 2 },
      geofenceRadius: 50,
      names: { en: 'POI1', de: 'POI1' },
      descriptions: { en: '', de: '' },
      quizId: 'q1',
      badgeId: 'b1'
    },
    {
      id: 'poi2',
      coordinates: { latitude: 3, longitude: 4 },
      geofenceRadius: 50,
      names: { en: 'POI2', de: 'POI2' },
      descriptions: { en: '', de: '' },
      quizId: 'q2',
      badgeId: 'b2'
    }
  ]
}))

describe('Map component', () => {
  it('renders markers for each POI and handles click', () => {
    const handleClick = jest.fn()
    render(<Map language="en" onPoiClick={handleClick} />)
    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(2)
    fireEvent.click(markers[0])
    expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'poi1' }))
  })
})
