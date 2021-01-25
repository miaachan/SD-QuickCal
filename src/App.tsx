import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import "./App.scss";
import Cheatsheet from "./Component/Cheatsheet";

enum Unit {
    T = "T",
    B = "B",
    M = "M",
    K = "K",
}
enum TimeUnit {
    YEAR = "YEAR",
    MONTH = "MONTH",
    DAY = "DAY",
    HOUR = "HOUR",
    SECOND = "SECOND",
}

const UnitLookup: {
    [key in keyof typeof Unit]: number;
} = {
    T: 10 ** 12,
    B: 10 ** 9,
    M: 10 ** 6,
    K: 10 ** 3,
};

const TimeUnitLookup: {
    [key in keyof typeof TimeUnit]: number;
} = {
    SECOND: 60,
    HOUR: 60 * 60,
    DAY: 3600 * 24,
    MONTH: 86400 * 30,
    YEAR: 86400 * 30 * 365,
};

function parseInputToNum(input: string): number {
    const onlyDigits = /^\d+.?\d*$/.test(input);
    const withUnit = /^\d+.?\d*(T|B|M|K)$/.test(input);
    if (!onlyDigits && !withUnit) return 0;

    if (withUnit) {
        let last = input.slice(-1).toUpperCase();
        return parseFloat(input.slice(0, -1)) * UnitLookup[last as Unit];
    }

    return parseFloat(input);
}

function parseNumToUnit(input: number, unit: Unit): string {
    return (input / UnitLookup[unit]).toFixed(2) + unit;
}

function App() {
    const [input, setInput] = React.useState("");
    const [inputTU, setInputTU] = React.useState<TimeUnit>(TimeUnit.DAY);

    const [output, setOutput] = React.useState("");
    const [outputTU, setOutputTU] = React.useState<TimeUnit>(TimeUnit.SECOND);
    const inputInNum = React.useMemo(() => parseInputToNum(input), [input]);

    React.useEffect(() => {
        // Convert `inputInNum` in second
        let inputInNum_in_second =
            inputTU === TimeUnit.SECOND
                ? inputInNum
                : inputInNum / TimeUnitLookup[inputTU];

        if (outputTU === TimeUnit.SECOND) {
            setOutput(inputInNum_in_second.toFixed(2));
        } else {
            setOutput(
                (inputInNum_in_second * TimeUnitLookup[outputTU]).toFixed(2)
            );
        }
    }, [inputInNum, inputTU, outputTU]);

    function handleInputCheck(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = event.target;
        checked && setInputTU(TimeUnit[name as keyof typeof TimeUnit]);
    }

    function handleOutputCheck(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = event.target;
        checked && setOutputTU(TimeUnit[name as keyof typeof TimeUnit]);
    }

    return (
        <div className="App">
            <div className="content">
                <div className="mb-3">
                    {Object.keys(TimeUnit).map((unit) => (
                        <Form.Check
                            inline
                            key={`check-${unit}`}
                            name={unit}
                            label={`in ${unit.toLowerCase()}`}
                            type="checkbox"
                            onChange={handleInputCheck}
                            checked={inputTU === unit}
                        />
                    ))}
                </div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Input</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Number"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    {Object.keys(Unit).map((unit) => (
                        <FormControl
                            key={`output-${unit}`}
                            readOnly
                            value={parseNumToUnit(
                                inputInNum,
                                Unit[unit as keyof typeof Unit]
                            )}
                        />
                    ))}
                </InputGroup>
                <div className="mb-3">
                    {Object.keys(TimeUnit).map((unit) => (
                        <Form.Check
                            inline
                            key={`check-${unit}`}
                            name={unit}
                            label={`in ${unit.toLowerCase()}`}
                            type="checkbox"
                            onChange={handleOutputCheck}
                            checked={outputTU === unit}
                        />
                    ))}
                </div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Output</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl readOnly value={output} />
                </InputGroup>
                <InputGroup className="mb-3">
                    {Object.keys(Unit).map((unit) => (
                        <FormControl
                            key={`output-${unit}`}
                            readOnly
                            value={parseNumToUnit(
                                parseInt(output),
                                Unit[unit as keyof typeof Unit]
                            )}
                        />
                    ))}
                </InputGroup>

                <Cheatsheet />
            </div>
        </div>
    );
}

export default App;
