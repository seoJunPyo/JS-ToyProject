;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const API_URL = 'http://localhost:3000/todos'
  const $todos = get('.todos')
  const $form = get('.todo_form')
  const $todoInput = get('.todo_input')

  const createTodoElement = (item) => {
    const { id, content, completed } = item
    const $todoItem = document.createElement('div')
    const isChecked = completed ? 'checked' : ''
    $todoItem.classList.add('item')
    $todoItem.dataset.id = id
    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox' 
                ${isChecked}
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `
    return $todoItem
  }

  const renderAllTodos = (todos) => {
    $todos.innerHTML = ''
    todos.forEach((item) => {
      const todosElement = createTodoElement(item)
      $todos.appendChild(todosElement)
    })
  }

  const getTodos = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((todos) => {
        renderAllTodos(todos)
      })
      .catch((error) => console.log(error.message))
  }

  const addTodo = (e) => {
    e.preventDefault()
    const todo = {
      content: $todoInput.value,
      completed: false,
    }
    if ($todoInput.value.length > 0)
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      })
        .then(getTodos)
        .then(() => {
          $todoInput.value = ''
          $todoInput.focus()
        })
        .catch((error) => console.error(error))
  }

  const toggleTodo = (e) => {
    if (e.target.className !== 'todo_checkbox') return
    const $item = e.target.closest('.item')
    const id = $item.dataset.id
    const completed = e.target.checked

    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
      .then((response) => response.json())
      .then(getTodos)
      .catch((error) => console.error(error.message))
  }

  const changeEditMode = (e) => {
    const pick = (className) => {
      return $item.querySelector(className)
    }
    const $item = e.target.closest('.item')
    const $label = pick('label')
    const $editInput = pick('input[type="text"]')
    const $contentButton = pick('.content_buttons')
    const $editButton = pick('.edit_buttons')
    const $value = $editInput.value

    const editModeHandler = (status) => {
      $label.style.display = status[0]
      $contentButton.style.display = status[1]
      $editButton.style.display = status[2]
      $editInput.style.display = status[3]
    }
    const $editOn = ['none', 'none', 'block', 'block']
    const $editOff = ['block', 'block', 'none', 'none']

    // 에디트 모드
    if (e.target.className === 'todo_edit_button') {
      editModeHandler($editOn)
      $editInput.focus()
      $editInput.value = ''
      $editInput.value = $value
    }

    // 평소
    if (e.target.className === 'todo_edit_cancel_button') {
      editModeHandler($editOff)
      $editInput.value = $label.innerText
    }
  }

  const editTodo = (e) => {
    if (e.target.className !== 'todo_edit_confirm_button') return
    const $item = e.target.closest('.item')
    const id = $item.dataset.id
    const $editInput = $item.querySelector('input[type="text"]')
    const content = $editInput.value

    if (content.length > 1)
      fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
        .then(getTodos)
        .catch((error) => console.error(error.message))
    else if (content.length < 1) alert('내용을 입력해주세요')
  }

  const removeTodo = (e) => {
    if (e.target.className !== 'todo_remove_button') return
    const $item = e.target.closest('.item')
    const id = $item.dataset.id

    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(getTodos)
      .catch((error) => console.error(error.message))
  }

  const init = () => {
    window.addEventListener('DOMContentLoaded', () => {
      getTodos()
    })
  }
  $form.addEventListener('submit', addTodo)
  $todos.addEventListener('click', toggleTodo)
  $todos.addEventListener('click', changeEditMode)
  $todos.addEventListener('click', editTodo)
  $todos.addEventListener('click', removeTodo)

  init()
})()
