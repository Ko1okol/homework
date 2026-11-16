"use strict";

class Todo {
  selectors = {
    root: "[data-js-todo]",
    newTaskForm: "[data-js-todo-new-task-form]",
    newTaskInput: "[data-js-todo-new-task-input]",
    searchTaskForm: "[data-js-todo-search-task-form]",
    searchTaskInput: "[data-js-todo-search-task-input]",
    totalTasks: "[data-js-todo-total-tasks]",
    deleteAllButton: "[data-js-todo-delete-all-button]",
    list: "[data-js-todo-list]",
    item: "[data-js-todo-item]",
    itemCheckbox: "[data-js-todo-item-checkbox]",
    itemLabel: "[data-js-todo-item-label]",
    itemDeleteButton: "[data-js-todo-item-delete-button]",
    emptyMessage: "[data-js-todo-empty-message]",
  };

  localStorageKey = "todo-items";

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);

    if (!this.rootElement) {
      console.error("Не найден корневой элемент [data-js-todo].");
      return;
    }

    this.newTaskFormElement = this.rootElement.querySelector(
      this.selectors.newTaskForm,
    );
    this.newTaskInputElement = this.rootElement.querySelector(
      this.selectors.newTaskInput,
    );
    this.searchTaskFormElement = this.rootElement.querySelector(
      this.selectors.searchTaskForm,
    );
    this.searchTaskInputElement = this.rootElement.querySelector(
      this.selectors.searchTaskInput,
    );
    this.totalTasksElement = this.rootElement.querySelector(
      this.selectors.totalTasks,
    );
    this.deleteAllButtonElement = this.rootElement.querySelector(
      this.selectors.deleteAllButton,
    );
    this.listElement = this.rootElement.querySelector(this.selectors.list);
    this.emptyMessageElement = this.rootElement.querySelector(
      this.selectors.emptyMessage,
    );

    this.state = {
      items: this.getItemsFromLocalStorage(),
      searchQuery: "",
    };

    this.bindEvents();
    this.render();
  }

  createId() {
    // Используем UUID, если браузер его поддерживает.
    if (globalThis.crypto?.randomUUID) {
      return globalThis.crypto.randomUUID();
    }

    // Запасной вариант для браузеров без randomUUID().
    return `\({Date.now()}-\){Math.random().toString(16).slice(2)}`;
  }

  getItemsFromLocalStorage() {
    let savedItems;

    try {
      savedItems = localStorage.getItem(this.localStorageKey);
    } catch (error) {
      console.error("Не удалось прочитать localStorage:", error);
      return [];
    }

    if (!savedItems) {
      return [];
    }

    try {
      const parsedItems = JSON.parse(savedItems);

      if (!Array.isArray(parsedItems)) {
        return [];
      }

      // Проверяем старые сохранённые данные:
      // каждой задаче нужен уникальный id и правильные поля.
      const usedIds = new Set();

      return parsedItems
        .filter((item) => item && typeof item.text === "string")
        .map((item) => {
          let id = String(item.id ?? "");

          if (!id || usedIds.has(id)) {
            id = this.createId();
          }

          usedIds.add(id);

          return {
            id,
            text: item.text,
            isCompleted: Boolean(item.isCompleted ?? item.is_completed),
          };
        });
    } catch (error) {
      console.error("Не удалось прочитать задачи из localStorage:", error);
      return [];
    }
  }

  saveItemsToLocalStorage() {
    try {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.state.items),
      );
    } catch (error) {
      console.error("Не удалось сохранить задачи:", error);
    }
  }

  bindEvents() {
    this.newTaskFormElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addTask();
    });

    this.searchTaskFormElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this.searchTaskInputElement.addEventListener("input", (event) => {
      this.state.searchQuery = event.target.value.trim();
      this.render();
    });

    this.deleteAllButtonElement.addEventListener("click", () => {
      this.state.items = [];
      this.saveItemsToLocalStorage();
      this.render();
    });

    // Обработчик удаления одной задачи.
    this.listElement.addEventListener("click", (event) => {
      const deleteButton = event.target.closest(
        this.selectors.itemDeleteButton,
      );

      if (!deleteButton) {
        return;
      }

      const itemElement = deleteButton.closest(this.selectors.item);
      const itemId = itemElement?.dataset.todoId;

      if (!itemId) {
        return;
      }

      // Удаляется только задача с id нажатой кнопки.
      this.state.items = this.state.items.filter((item) => item.id !== itemId);

      this.saveItemsToLocalStorage();
      this.render();
    });

    // Обработчик отметки задачи выполненной.
    this.listElement.addEventListener("change", (event) => {
      if (!event.target.matches(this.selectors.itemCheckbox)) {
        return;
      }

      const itemElement = event.target.closest(this.selectors.item);
      const itemId = itemElement?.dataset.todoId;

      const item = this.state.items.find((task) => task.id === itemId);

      if (!item) {
        return;
      }

      item.isCompleted = event.target.checked;

      this.saveItemsToLocalStorage();
      this.render();
    });
  }

  addTask() {
    const text = this.newTaskInputElement.value.trim();

    if (!text) {
      this.newTaskInputElement.focus();
      return;
    }

    this.state.items.push({
      id: this.createId(),
      text,
      isCompleted: false,
    });

    this.newTaskInputElement.value = "";

    this.saveItemsToLocalStorage();
    this.render();

    this.newTaskInputElement.focus();
  }

  getFilteredItems() {
    const query = this.state.searchQuery.toLowerCase();

    if (!query) {
      return this.state.items;
    }

    return this.state.items.filter((item) =>
      item.text.toLowerCase().includes(query),
    );
  }

  createItemElement(item) {
    const itemElement = document.createElement("li");
    itemElement.className = "todo__list-item item";
    itemElement.setAttribute("data-js-todo-item", "");
    itemElement.dataset.todoId = item.id;

    const checkbox = document.createElement("input");
    checkbox.className = "todo-item__checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = item.isCompleted;

    // У каждой задачи свой уникальный id для связи с label.
    const checkboxId = `todo-${item.id}`;
    checkbox.id = checkboxId;
    checkbox.setAttribute("data-js-todo-item-checkbox", "");

    const label = document.createElement("label");
    label.className = "todo__item-label";
    label.htmlFor = checkboxId;
    label.setAttribute("data-js-todo-item-label", "");
    label.textContent = item.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "todo__list-item-button-delete";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", "Delete");
    deleteButton.title = "Delete";
    deleteButton.setAttribute("data-js-todo-item-delete-button", "");

    deleteButton.innerHTML = `
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 5L5 15M5 5L15 15"
          stroke="#757575"
          stroke-width="2"
          stroke-linecap="round"
        ></path>
      </svg>
    `;

    itemElement.append(checkbox, label, deleteButton);

    return itemElement;
  }

  render() {
    const visibleItems = this.getFilteredItems();

    this.totalTasksElement.textContent = this.state.items.length;

    this.deleteAllButtonElement.hidden = !this.state.items.some(
      (item) => !item.isCompleted,
    );

    this.listElement.replaceChildren(
      ...visibleItems.map((item) => this.createItemElement(item)),
    );

    this.emptyMessageElement.hidden = visibleItems.length > 0;
  }
}

new Todo();
