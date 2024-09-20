/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

type todoType = {
  id: number
  userId: number
  completed: boolean
  todo: string
}

function App() {
  const [todo, setTodo] = useState<todoType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  useEffect(() => {
    const fetchTodoList = async () => {
      setIsLoading(true)
      const res = await fetch('https://dummyjson.com/todos', {
        method: 'GET',
      })
      const data = await res.json()
      setTodo(data.todos)
      setIsLoading(false)
    }

    fetchTodoList()
  }, [])

  const handleOnChangeCheckbox = (e: any, item: todoType) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, item.id])
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== item.id))
    }
  }

  return (
    <>
      <div className="bg-[#ecf0f1] w-full min-h-screen h-full flex items-center justify-center">
        <div className="min-w-[320px] md:min-w-[400px] max-w-[30%] rounded-lg overflow-hidden border border-gray-500 m-10">
          <header className="h-[60px] px-5 py-3 bg-[#099494] flex items-center font-bold">
            To do list
          </header>
          {isLoading ? (
            <div className="px-5 py-3 border-t border-gray-500">Loading...</div>
          ) : (
            <div>
              {todo.map((item) =>
                selectedItems.includes(item.id) ? (
                  <div
                    className="px-5 py-3 flex items-center gap-3 border-t border-gray-500 bg-[#c28282]"
                    key={item.id}
                  >
                    <input
                      type="checkbox"
                      onClick={(e) => handleOnChangeCheckbox(e, item)}
                    />
                    <del>{item.todo}</del>
                  </div>
                ) : (
                  <div
                    className="px-5 py-3 flex items-center gap-3 border-t border-gray-500"
                    key={item.id}
                  >
                    <input
                      type="checkbox"
                      onClick={(e) => handleOnChangeCheckbox(e, item)}
                    />
                    <span>{item.todo}</span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
