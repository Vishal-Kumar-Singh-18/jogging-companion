import { useEffect, useState } from 'react'

const NetworkStatus = () => {
  const [connection, setConnection] = useState({})

  useEffect(() => {
    const updateConnectionStatus = () => {
      if (navigator.connection) {
        setConnection({
          type: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
        })
      } else {
        setConnection({ type: 'unknown' })
      }
    }

    updateConnectionStatus()
    navigator.connection?.addEventListener('change', updateConnectionStatus)

    return () =>
      navigator.connection?.removeEventListener(
        'change',
        updateConnectionStatus
      )
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Network Status</h2>
      <p>Type: {connection.type}</p>
      <p>Speed: {connection.downlink || '-'} Mbps</p>
      <p>Latency: {connection.rtt || '-'} ms</p>
    </div>
  )
}

export default NetworkStatus
