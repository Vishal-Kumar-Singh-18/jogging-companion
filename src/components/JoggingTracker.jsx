import { useEffect, useState } from 'react'
import CanvasMap from './CanvasMap'

const JoggingTracker = () => {
  const [path, setPath] = useState([])
  const [useMock, setUseMock] = useState(false)

  useEffect(() => {
    if (useMock) {
      const samplePath = [
        { latitude: 28.6139, longitude: 77.2090 }, // Delhi
        { latitude: 28.6149, longitude: 77.2100 },
        { latitude: 28.6159, longitude: 77.2110 },
        { latitude: 28.6169, longitude: 77.2120 }
      ]
      setPath(samplePath)
      return
    }

    if (!navigator.geolocation) {
      alert('Geolocation is not supported')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        console.log('Position:', latitude, longitude)
        setPath((prev) => [...prev, { latitude, longitude }])
      },
      (err) => {
        console.error(err)
      },
      { enableHighAccuracy: true }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [useMock])

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Jogging Path</h2>

      <button
        onClick={() => setUseMock(!useMock)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {useMock ? 'Switch to Live GPS' : 'Use Mock Data'}
      </button>

      <CanvasMap path={path} />
    </div>
  )
}

export default JoggingTracker
