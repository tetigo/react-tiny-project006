import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setJobs(data)
    setLoading(false)
    console.log(data)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <section className="section loading">
        <h2>Loading...</h2>
      </section>
    )
  }

  //deve ser colocado apos o loading, pois no inicio jobs está vazio
  const { company, dates, duties, title } = jobs[value]

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {jobs.map((item, idx) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(idx)}
                className={`job-btn ${idx === value && 'active-btn'}`}
              >
                {item.company}
              </button>
            )
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((cada, idx) => {
            return (
              <div key={idx} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{cada}</p>
              </div>
            )
          })}
        </article>
      </div>
    </section>
  )
}

export default App
