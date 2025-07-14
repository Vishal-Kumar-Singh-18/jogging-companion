import { useEffect, useRef } from 'react'

const CanvasMap = ({ path }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (path.length < 2) return

    const latitudes = path.map(p => p.latitude)
    const longitudes = path.map(p => p.longitude)

    const minLat = Math.min(...latitudes)
    const maxLat = Math.max(...latitudes)
    const minLng = Math.min(...longitudes)
    const maxLng = Math.max(...longitudes)

    const padding = 20
    const width = canvas.width - padding * 2
    const height = canvas.height - padding * 2

    const scaleX = width / (maxLng - minLng || 0.0001)
    const scaleY = height / (maxLat - minLat || 0.0001)

    ctx.beginPath()
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 2

    path.forEach((point, index) => {
      const x = (point.longitude - minLng) * scaleX + padding
      const y = (maxLat - point.latitude) * scaleY + padding

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()
  }, [path])

  return (
    <canvas
      ref={canvasRef}
      width={540}
      height={300}
      className="border border-gray-400 rounded"
    />
  )
}

export default CanvasMap
