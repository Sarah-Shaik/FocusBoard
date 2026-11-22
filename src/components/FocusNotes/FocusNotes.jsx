
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import './FocusNotes.css'

const slides = [
  {
    title: 'Make today count.',
    description: 'A little focus goes a long way.',
    task: 'Design landing page',
    status: 'NEXT UP',
    progress: 62,
  },
  {
    title: 'Small steps, big progress.',
    description: 'Keep your priorities in view.',
    task: 'Fix navigation',
    status: 'IN PROGRESS',
    progress: 67,
  },
  {
    title: 'Celebrate the wins.',
    description: 'Every completed task moves you forward.',
    task: 'Onboarding copy',
    status: 'COMPLETED',
    progress: 100,
  },
]

const FocusNotes = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length)
  }

  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    )
  }

  const slide = slides[activeSlide]

  return (
    <section className="focus-notes" aria-label="Focus Notes">
      <div className="focus-notes-content">
        <div className="focus-notes-desktop">
          <div className="focus-notes-label">
            <span>FOCUS NOTES</span>
            <span>
              {String(activeSlide + 1).padStart(2, '0')} / 03
            </span>
          </div>

          <h2>{slide.title}</h2>
          <p>{slide.description}</p>

          <div className="focus-notes-indicators">
            {slides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`focus-indicator ${
                  activeSlide === index ? 'active' : ''
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        <div className="focus-notes-mobile">
          <span className="mobile-focus-label">GOOD AFTERNOON</span>

          <h2>Make today count</h2>

          <p>3 tasks waiting for your attention.</p>

          <div className="mobile-focus-progress">
            <div
              className="mobile-progress-track"
              role="progressbar"
              aria-label="Focus progress"
              aria-valuenow={62}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="mobile-progress-fill" />
            </div>

            <span>62%</span>
          </div>
        </div>
      </div>

      <div className="focus-notes-right">
        <div className="focus-preview">
          <div className="focus-preview-check">
            <Check size={14} />
          </div>

          <div className="focus-preview-details">
            <span>{slide.status}</span>
            <strong>{slide.task}</strong>

            <div className="focus-preview-progress">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${slide.progress}%` }}
                />
              </div>
              <small>{slide.progress}%</small>
            </div>
          </div>
        </div>

        <div className="focus-notes-controls">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default FocusNotes
