import type { Accessor, Component, JSX } from 'solid-js';
import { Operator } from './App';

// import styles from './App.module.css';
import styles from './Card.module.css';

const screenBorderColor = "#E5E7EB";
const textColor = "#111827";

interface CardProps {
    firstNumber: number;
    secondNumber: number;
    getOperator: Accessor<Operator>
    side: "front" | "back";
    media: "print" | "screen";
    style: JSX.CSSProperties;

    answer?: Accessor<number>; // can be undefined for print media or when side is "back"
}

const Card: Component<CardProps> = (props: CardProps) => {
    // const getCornerRadius = () => {
    //     if (props.media == "print") {
    //         return "0";
    //     } else {
    //         return "20";
    //     }
    // };

    function getHeaderStyle(): string | undefined {
        switch (props.getOperator()) {
            case "addition":
                return styles.additionHeader;
            case "subtraction":
                return styles.subtractionHeader;
            case "multiplication":
                return styles.multiplicationHeader;
            case "division":
                return styles.divisionHeader;
            default:
                return undefined;
        }
    }

    function getOperatorCharacter() {
        switch (props.getOperator()) {
            case "addition":
                return "+";
            case "subtraction":
                return "-";
            case "multiplication":
                return "×";
            case "division":
                return "÷";
        }
    }

    function getOperatorLabel() {
        switch (props.getOperator()) {
            case "addition":
                return "plus";
            case "subtraction":
                return "minus";
            case "multiplication":
                return "times";
            case "division":
                return "divided by";
        }
    }

    // function getAccentColor() {
    //     switch (props.getOperator()) {
    //         case "addition":
    //             return "#ffbe0b";
    //         case "subtraction":
    //             return "#3a86ff";
    //         case "multiplication":
    //             return "#fb5607";
    //         case "division":
    //             return "#8338ec";
    //     }
    // }

    const getSolution = () => {
        if (props.getOperator() == "addition")
            return props.firstNumber + props.secondNumber;
        else if (props.getOperator() == "subtraction")
            return props.firstNumber - props.secondNumber;
        else if (props.getOperator() == "multiplication")
            return props.firstNumber * props.secondNumber;
        else if (props.getOperator() == "division")
            return props.firstNumber / props.secondNumber;
        else
            return "NYI";
    }

    return <article
        class={styles.card}
        aria-label="Math Flash Card"
    >
        <header class={getHeaderStyle()}></header>
        <main>
            {props.side == "front" ?
                <section class={styles.mathProblem}>
                    <span class={styles.operator} aria-label={getOperatorLabel()}>{getOperatorCharacter()}</span>
                    <section class={styles.numbers}>
                        <span class={styles.number}>{props.firstNumber}</span>
                        <span class={styles.number}>{props.secondNumber}</span>
                    </section>
                    <div class={styles.answerLine} aria-hidden="true"></div>
                    <section class={styles.answerEntry}>
                        <span class={styles.number}>{props.answer!()}</span>
                    </section>
                </section>
                :
                <section class={styles.solution}>
                    <span class={styles.number}>{getSolution()}</span>
                </section>
            }
        </main>
    </article >;

    // return (
    //     <svg style={props.style} viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
    //         {/* Card background with rounded corners */}
    //         {props.media == "screen" ? <rect width="300" height="420" rx={getCornerRadius()} ry={getCornerRadius()} fill="white" stroke={screenBorderColor} stroke-width="1" /> : null}

    //         {/* Colored top border */}
    //         <rect x="0" y="0" width="300" height="24" rx={getCornerRadius()} ry={getCornerRadius()} fill={getAccentColor(props.getOperator())} />
    //         <rect x="0" y="12" width="300" height="12" fill={getAccentColor(props.getOperator())} />

    //         {/* Math problem container */}
    //         <g transform="translate(38, 150)">
    //             {(props.side == "front") ?
    //                 <>
    //                     {/* Grid layout */}
    //                     <g id="operator-column" transform="translate(0, 0)">
    //                         <text x="0" y="84" font-family="'Courier Prime', monospace" font-size="92" font-weight="600" fill={textColor}>{getOperatorCharacter(props.getOperator())}</text>
    //                     </g>

    //                     <g id="number-columns" transform="translate(60, 0)">
    //                         {/* First number */}
    //                         <text x="140" y="0" font-family="'Courier Prime', monospace" font-size="92" font-weight="600" text-anchor="end" fill={textColor}>{props.firstNumber}</text>

    //                         {/* Second number */}
    //                         <text x="140" y="84" font-family="'Courier Prime', monospace" font-size="92" font-weight="600" text-anchor="end" fill={textColor}>{props.secondNumber}</text>

    //                         {/* Answer line */}
    //                         <line x1="0" y1="112" x2="140" y2="112" stroke={textColor} stroke-width="4" />
    //                     </g>
    //                 </> : <>
    //                     <g id="answer-column" transform="translate(0, 0)">
    //                         <text x={getSolutionTextX()} y="84" font-family="'Courier Prime', monospace" font-size="92" font-weight="600" text-anchor="end" fill={textColor}>{getSolution()}</text>
    //                     </g>
    //                 </>
    //             }
    //         </g>
    //     </svg>
    // );


};

export default Card;
