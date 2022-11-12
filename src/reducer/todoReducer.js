const initialState = {
  todoData: [],
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add":
      return { ...state, todoData: [...state.todoData, action.payload] };
    case "check":
      const { id, check } = action.payload;
      const todoIndex = state.todoData.findIndex((todo) => todo.id === id);
      const updatedData = [...state.todoData];
      updatedData[todoIndex].isChecked = !check;
      return { ...state, todoData: updatedData };
    case "delete":
      const todoDeleteIndex = state.todoData.findIndex(
        (todo) => todo.id === action.payload
      );
      const todoDeleteData = [...state.todoData];
      todoDeleteData.splice(todoDeleteIndex, 1);
      return { ...state, todoData: todoDeleteData };
    default:
      return state;
  }
};

export default todoReducer;
