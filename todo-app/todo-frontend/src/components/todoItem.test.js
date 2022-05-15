import {TodoItem} from './todoItem'
import { render, screen } from '@testing-library/react'

test('correct text', () => {
    const todo = {
        text: "jee",
        done: false
    }
    render(<TodoItem todo={todo} onClickComplete={() => {}} onClickDelete={() => {}}/>)
    const element = screen.getByText('jee')
    expect(element).toBeDefined()
})