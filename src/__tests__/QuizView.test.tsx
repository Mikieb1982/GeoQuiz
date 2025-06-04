import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import QuizView, { QuizQuestion } from '../components/QuizView'

const questionSet: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'Sample question?',
    answers: [
      { id: 'a1', text: 'Answer A' },
      { id: 'a2', text: 'Answer B' }
    ],
    correctAnswerId: 'a1',
    points: 5
  }
]

describe('QuizView', () => {
  it('allows answering a question and completes the quiz', () => {
    const onComplete = jest.fn()
    render(<QuizView questionSet={questionSet} quizTitle="Test" onQuizComplete={onComplete} />)

    fireEvent.click(screen.getByText('Answer A'))
    fireEvent.click(screen.getByText('Submit Answer'))
    expect(screen.getByRole('alert')).toHaveTextContent('Correct')

    fireEvent.click(screen.getByText('Show Results'))
    expect(onComplete).toHaveBeenCalledWith(5, 1, 1)
  })

  it('shows message when no questions are provided', () => {
    render(<QuizView questionSet={[]} quizTitle="Empty" onQuizComplete={jest.fn()} />)
    expect(screen.getByText('No questions loaded for this quiz.')).toBeInTheDocument()
  })
})
