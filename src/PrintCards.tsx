import { Accessor, createSignal, For, JSX, type Component } from 'solid-js';

import styles from './App.module.css';
import Card from './Card';
import { Operator } from './App';

interface PrintCardsProps {
    getOperator: Accessor<Operator>;
    getSetNumber: Accessor<number>;
}
const PrintCards: Component<PrintCardsProps> = (props: PrintCardsProps) => {
    const [getFirstNumber /*, setFirstNumber*/] = createSignal<number>(6);

    const getFirstNumbers = () => {
        if (props.getOperator() == "division") {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => n * props.getSetNumber());
        } else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }

    const getSecondNumbers = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const secondNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const [getAnswer, setAnswer] = createSignal<number>(42);

    const getCardStyle = (index: Accessor<number>, side: "front" | "back"): JSX.CSSProperties => {
        return {
            "grid-row": Math.floor(index() / 3) + 1,
            "grid-column": side == "front" ? (index() % 3) + 1 : 3 - (index() % 3),
            border: "1px solid lightgray",
            "border-radius": "20px",
        }
    }

    return (
        <>
            <div class={styles.Page}>
                <div class={styles.CardGrid}>
                    <For each={secondNumbers}>
                        {(secondNumber, index) => (
                            <Card
                                style={getCardStyle(index, "front")}
                                firstNumber={getFirstNumber()}
                                secondNumber={secondNumber}
                                getOperator={props.getOperator}
                                side="front"
                                media={"print"}
                            />
                        )}
                    </For>
                </div>
            </div>

            <div style={{ 'page-break-after': 'always' }}></div>

            <div class={styles.Page}>
                <div class={styles.CardGrid}>
                    <For each={secondNumbers}>
                        {(secondNumber, index) => (
                            <Card
                                style={getCardStyle(index, "back")}
                                firstNumber={getFirstNumber()}
                                secondNumber={secondNumber}
                                getOperator={props.getOperator}
                                side="back"
                                media={"print"} />
                        )}
                    </For>
                </div>
            </div>
        </>
    );
}

export default PrintCards;
