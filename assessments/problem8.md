## React State Management

### Lifting State
A simple explanation would be taking the local state(s) of a component and passing it to a child as a prop. This can also work with functions to change the state of a parent component through the child. For example:

```javascript
const ParentComp = () => {
  const [state1, changeState1] = useState(1);

  return (
    <div>
      <p>{`Current Count is: ${state1}`}
      <ChildComp1 increaseNumber={() => changeState1(prevState => prevState + 1)} />
      <ChildComp2 decreaseNumber={() => changeState1(prevState => prevState - 1)} />
    </div>
  )
}

const ChildComp1 = ({ increaseNumber }) => (
  <div>
    <button onClick={() => increaseNumber()}></button>
  </div>
)

const ChildComp1 = ({ decreaseNumber }) => (
  <div>
    <button onClick={() => decreaseNumber()}></button>
  </div>
)
```

### State Management
State management is when we use functionality to create a way to pass state to certain components without prop drilling (passing props from parent down the component tree). Examples of State Management are React.Context, Redux, Flux, Zustand, Recoil, Jotai, and etc (there are a couple of others). 

React Context is a lightweight built in state manager. Its not meant for dealing with large scale apps but it does get the job done with small to medium apps. It is a Global State Manager meaning it starts at the root of your app (although it doesn't have to) and it passes the state to the component wanting to access the state through the `useContext` function (or a helper function you can make to access state from context).

Simple React Context Example:

```javascript
import { useContext, createContext, useState } from "react";

const AppState = createContext(null);

const AppProvider = ({ children }) => {

  const [color, setColor] = useState("red");

  return (
    <AppState.Provider value={{ color, setColor }}>
      {children}
    </AppState.Provider>
  )
}

const AppSquare = () => {
  const { color } = useContext(AppState);

  return (
    <div style={{ width: 100, height: 100, backgroundColor: color}} />
  )
}

const App = () => {
  const { color, setColor } = useContext(AppState);

  return (
    <div>
      {color}
      <button onClick={() => setColor("green")}>Change to Green</button>
    </div>
  )
}

const Root = () => {

  // Notice that no props were passed down
  return (
    <AppProvider>
      <App /> 
      <AppSquare />
    </AppProvider>
  )
}
```

For Redux, its a little more different. Redux says to store all data in one global store and DO NOT mutate store directly. Context can be mutated no problem but Redux Stores are immutable (meaning that the store can not be changed directly, only through a helper function to change state). An example looks like:

```javascript
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";


const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

const { increment, decrement, incrementByAmount } = counterSlice.actions

const countSliceReducer =  counterSlice.reducer

const store = configureStore({
  reducer: {
    counter: countSliceReducer
  }
});

const App = () => {
  const count = useSelector(state => state.counter.value); //Pull the count state from the redux store
  const dispatch = useDispatch(); //The redux helper function to mutate the store

  return (
    <div>
      <button
        onClick={() => dispatch(increment())} //Tells redux to run this function to mutate the store
      >
        Increment Count
      </button>
      <span>{count}</span> //The component gets rerendered and shows the new count
      <button
        onClick={() => dispatch(decrement())}
      >
        Decrement Count
      </button>
    </div>
  )
}

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

```

### Warning!
Just know that every item under a provider is rerendered when state is changed.
