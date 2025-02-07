import { createSignal, type Component } from 'solid-js';

import styles from './App.module.css';
import PrintCards from './PrintCards';

export type Operator = "addition" | "subtraction" | "multiplication" | "division";

const App: Component = () => {
  const [getOperator, setOperator] = createSignal<Operator>("addition");
  const [getSetNumber, setSetNumber] = createSignal<number>(6);

  return (
    <div class={styles.App}>
      <PrintCards getOperator={getOperator} getSetNumber={getSetNumber} />
    </div>
  );
};

export default App;
