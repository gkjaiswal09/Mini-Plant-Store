import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000'

export default function App() {
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchPlants()
  }, [])

  const fetchPlants = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API}/plants`)
      setPlants(res.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch plants')
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API}/plants/search?q=${search}`)
      setPlants(res.data)
    } catch {
      setError('Search failed')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>🌱 Mini Plant Store</h1>

      <div>
        <input
          type="text"
          placeholder="Search plants..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginTop: 20 }}>
        {plants.map(plant => (
          <div key={plant.id} style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
            <h3>{plant.name}</h3>
            <p>₹{plant.price}</p>
            <p>Categories: {plant.categories.join(', ')}</p>
            <p>{plant.available ? "✅ In Stock" : "❌ Out of Stock"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
