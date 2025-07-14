import NetworkStatus from './components/NetworkStatus'
import JoggingTracker from './components/JoggingTracker'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        Smart Jogging Companion 🏃‍♂️
      </h1>

      <NetworkStatus />
      <JoggingTracker />
    </div>
  )
}

export default App
