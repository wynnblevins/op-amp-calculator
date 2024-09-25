import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './App.css';
import { ToggleButton, ToggleButtonGroup, TextField, createTheme, ThemeProvider, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { OpAmpSchematic } from './components';
import styled from "@emotion/styled";

export enum ResistanceUnit {
  OHMS = "Ω",
  KILOOHMS = "kΩ",
  MEGAOHMS = "MΩ",
  GIGAOHMS = "GΩ"
};

export enum VoltageUnit {
  MILLIVOLTS = "mV",
  VOLTS = "V",
  KILOVOLTS = "kV",
  MEGAVOLTS = "MV",
  GIGAVOLTS = "GV"
};

const theme = createTheme({
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          width: '80%',
          marginTop: "2vh"
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          width: '20%',
          marginTop: "2vh"
        },
      },
    },
  },
});

function App() {
  
  const [state, setState] = useState({
    inverting: false,
    inputResistorValue: 0,
    inputResistorUnit: ResistanceUnit.OHMS,
    feedbackResistorValue: 0,
    feedbackResistorUnit: ResistanceUnit.OHMS,
    inputVoltage: 0,
    inputVoltageUnit: VoltageUnit.VOLTS,
    outputVoltage: 0,
    gain: 0
  });
  
  useEffect(() => {
    performCalculations();
  }, [JSON.stringify(state)]);

  const onAmpTypeChange = async (e: any) => {
    await setState({
      ...state,
      inverting: e.target.innerText === "INVERTING" ? true : false      
    });
  };

  const onInputResistorChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputResistorValue = +e.target.value;
    
    await setState({
      ...state,
      inputResistorValue: inputResistorValue      
    })
  };

  const onInputResistorUnitChange = async (e: SelectChangeEvent<string>) => {
    const inputResistorUnit = e.target.value;
    
    await setState({
      ...state,
      // @ts-ignore
      inputResistorUnit: inputResistorUnit   
    });
  };

  const onFeedbackResistorChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const feedbackResistorValue = +e.target.value;
    
    await setState({
      ...state,
      feedbackResistorValue: feedbackResistorValue
    });
  };

  const onFeedbackResistorUnitChange = async (e: SelectChangeEvent<string>) => {
    const feedbackResistorUnit = e.target.value;
    
    await setState({
      ...state,
      // @ts-ignore
      feedbackResistorUnit: feedbackResistorUnit      
    });
  };

  const onInputVoltageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVoltage = +e.target.value;
    
    await setState({
      ...state,
      inputVoltage: inputVoltage
    });
  };

  const onInputVoltageUnitChange = async (e: SelectChangeEvent<string>) => {
    const inputVoltageUnit = e.target.value;
    
    setState({
      ...state,
      // @ts-ignore
      inputVoltageUnit: inputVoltageUnit
    });
  };

  const determineOutputInVolts = (value: number, unit: string): number => {
    const MICRO = 0.000001;
    const MILLI = 0.001;
    const KILO = 1000;
    const MEGA = 1000000;
    const GIGA = 1000000000;

    let voltage: number = 0;

    switch (unit) {
      case "µV": 
        voltage = value * MICRO;
        break;
      case "mV": 
        voltage = value * MILLI;
        break;
      case "V":
        voltage = value;
        break;
      case "kV":
        voltage = value * KILO;
        break;
      case "MV":
        voltage = value * MEGA;
        break;
      case "GV":
        voltage = value * GIGA;
        break;
      default:
        throw new Error("Unknown voltage unit encountered!");
    }
    
    return voltage;
  };

  const determineResistanceInOhms = (value: number, unit: string): number => {
    const KILO = 1000;
    const MEGA = 1000000;
    const GIGA = 1000000000;
    let resistanceInOhms: number = 0;

    switch (unit) {
      case "Ω": 
        resistanceInOhms = value;
        break;
      case "kΩ":
        resistanceInOhms = value * KILO;
        break;
      case "MΩ":
        resistanceInOhms = value * MEGA;
        break;
      case "GΩ":
        resistanceInOhms = value * GIGA;
        break;
      default:
        throw new Error("Unknown resistance unit encountered!");
    }
    
    return resistanceInOhms;
  };

  const performCalculations = async () => {
    const inputInOhms = determineResistanceInOhms(state.inputResistorValue, state.inputResistorUnit);
    const feedbackInOhms = determineResistanceInOhms(state.feedbackResistorValue, state.feedbackResistorUnit);
    const voltage = determineOutputInVolts(state.inputVoltage, state.inputVoltageUnit);

    let gain, output;
    
    if (state.inverting) {
      gain = feedbackInOhms / inputInOhms;
    } else {
      gain = 1 + (feedbackInOhms / inputInOhms);
    }

    output = gain * voltage;
    
    setState({
      ...state,
      gain,
      outputVoltage: output
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Op Amp Calculator</h1>

        <div className='schematicWrapper'>
          <ToggleButtonGroup
            color="primary"
            value={state.inverting}
            exclusive
            onChange={onAmpTypeChange}
            aria-label="Platform"
          >
            <ToggleButton value={true}>Inverting</ToggleButton>
            <ToggleButton value={false}>Non-Inverting</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <TextField type="number" label="Input Resistor" onChange={onInputResistorChange}></TextField>
        <Select
          id="inputResistorUnitSelect"
          value={state.inputResistorUnit}
          label="Input Resistor Unit"
          onChange={onInputResistorUnitChange}
        >
          <MenuItem value={'Ω'}>Ω</MenuItem>
          <MenuItem value={'kΩ'}>kΩ</MenuItem>
          <MenuItem value={'MΩ'}>MΩ</MenuItem>
          <MenuItem value={'GΩ'}>GΩ</MenuItem>
        </Select>
        
        <TextField type="number" label="Feedback Resistor" onChange={onFeedbackResistorChange}></TextField>
        <Select
          id="feedbackResistorUnitSelect"
          value={state.feedbackResistorUnit}
          label="Feedback Resistor Unit"
          onChange={onFeedbackResistorUnitChange}
        >
          <MenuItem value={'Ω'}>Ω</MenuItem>
          <MenuItem value={'kΩ'}>kΩ</MenuItem>
          <MenuItem value={'MΩ'}>MΩ</MenuItem>
          <MenuItem value={'GΩ'}>GΩ</MenuItem>
        </Select>
        
        <TextField type="number" label="Input Voltage" onChange={onInputVoltageChange}></TextField>
        <Select
          id="inputVoltageUnitSelect"
          value={state.inputVoltageUnit}
          label="Input Voltage Unit Select"
          onChange={onInputVoltageUnitChange}
        >
          <MenuItem value={'µV'}>µV</MenuItem>
          <MenuItem value={'mV'}>mV</MenuItem>
          <MenuItem value={'V'}>V</MenuItem>
          <MenuItem value={'kV'}>kV</MenuItem>
          <MenuItem value={'MV'}>MV</MenuItem>
        </Select>
        
        <OpAmpSchematic 
          inverting={state.inverting}
          feedbackResistorValue={`${state.feedbackResistorValue} ${state.feedbackResistorUnit}`}
          inputResistorValue={`${state.inputResistorValue} ${state.inputResistorUnit}`} 
          inputVoltageValue={`${state.inputVoltage} ${state.inputVoltageUnit}`}
          outputVoltageValue={`${state.outputVoltage || 0} V`}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
