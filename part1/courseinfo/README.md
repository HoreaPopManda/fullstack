# History

lesson 08.02.2026 14:00 -2h
1h dev
lesson 14.02.2026 14:00 - 15:40 - 1h:40
lesson 15.02.2026 - 2h
finsihed 1.b

17.02.2026 https://react.dev/learn/state-as-a-snapshot - 1h

19.02.2026 - https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps - Event Handling Revisited - 1h

# to do

“function factories”, “Object literal” and so on.

do the exercises from https://react.dev/learn/ corresponding to part 1.b and 1.c

# notes

use debugger; in the code to stop the execution of the react code

allClicks.concat('L') does not mutate the array but rather creates a new array

allClicks.push('L') does mutate the array. don't use it to set the state

it is forbidden in React to mutate state directly

In practice { ...clicks } creates a new object that has copies of all of the properties of the clicks object.

## UseState

const [index, setIndex] = useState(0);

I have a "storage somewhere" from where I serve you the value of a var of your choice (index)

react:
useState(0) => [varref, hookfunctionref]

listen to hookfunctionref (newval) call reacthook (newval)

reactFct (newvalue) {
varref.value = newvalue
rerender()
}

## Props

<Display counter=2 name="test"/> means props = {counter:2, name:"test"}

## What exactly is Strict Mode

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
