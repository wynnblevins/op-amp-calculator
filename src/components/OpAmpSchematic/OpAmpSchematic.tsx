import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import invertingAmpSchematic from '../../images/inverting-amplifier.png'
import nonInvertingAmpSchematic from '../../images/non-inverting-amplifier.png'

const OpAmpSchematicImg = styled.img<{}>`
  max-width: 80%;
  height: auto;
  padding: 0;
  margin: 0;
  position: relative
`;

const InvertingOpAmpInputResistorLbl = styled.p<{}>`
  position: absolute;
  top: 58%;
  left: 30%;
  transform: translate(-50%, -50%);
`;

const InvertingOpAmpFeedbackResistorLbl = styled.p<{}>`
  position: absolute;
  top: 12%;
  left: 54%;
  transform: translate(-50%, -50%);
`;

const InvertingOpAmpInputVoltageLbl = styled.p<{}>`
  position: absolute;
  top: 36%;
  left: 24%;
  transform: translate(-50%, -50%);
`;

const InvertingOpAmpOutputVoltageLbl = styled.p<{}>`
  position: absolute;
  top: 12%;
  left: 75%;
  transform: translate(-50%, -50%);
`;

const NonInvertingOpAmpFeedbackResistorLbl = styled.p<{}>`
  position: absolute;
  top: 72%;
  left: 46%;
  transform: translate(-50%, -50%);
`;

const NonInvertingOpAmpInputResistorLbl = styled.p<{}>`
  position: absolute;
  top: 72%;
  left: 28%;
  transform: translate(-50%, -50%);
`;

const NonInvertingOpAmpInputVoltageLbl = styled.p<{}>`
  position: absolute;
  top: 12%;
  left: 28%;
  transform: translate(-50%, -50%);
`;

const NonInvertingOpAmpOutputVoltageLbl = styled.p<{}>`
  position: absolute;
  top: 20%;
  left: 76%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div<{}>`
  position: relative;
`;

interface Props {
  inverting: boolean,
  feedbackResistorValue: string,
  inputResistorValue: string,
  inputVoltageValue: string,
  outputVoltageValue: string
}

const OpAmpSchematic = (props: Props) => {
  const { 
    inverting, 
    inputResistorValue,
    inputVoltageValue,
    feedbackResistorValue, 
    outputVoltageValue
  } = props;

  return (
    <Box sx={{ border: 'solid 10px black', marginTop: '10%' }}>
      { inverting ? 
      (
        <>
          <Container>
            <OpAmpSchematicImg src={invertingAmpSchematic}/>
            <InvertingOpAmpInputResistorLbl>{ inputResistorValue }</InvertingOpAmpInputResistorLbl>
            <InvertingOpAmpFeedbackResistorLbl>{ feedbackResistorValue }</InvertingOpAmpFeedbackResistorLbl>
            <InvertingOpAmpInputVoltageLbl>{ inputVoltageValue }</InvertingOpAmpInputVoltageLbl>
            <InvertingOpAmpOutputVoltageLbl>{ outputVoltageValue }</InvertingOpAmpOutputVoltageLbl>
          </Container>
        </>
      ): (
        <Container>
          <OpAmpSchematicImg src={nonInvertingAmpSchematic} />
          <NonInvertingOpAmpFeedbackResistorLbl>{ feedbackResistorValue }</NonInvertingOpAmpFeedbackResistorLbl>          
          <NonInvertingOpAmpInputResistorLbl>{ inputResistorValue }</NonInvertingOpAmpInputResistorLbl>          
          <NonInvertingOpAmpInputVoltageLbl>{ inputVoltageValue }</NonInvertingOpAmpInputVoltageLbl>          
          <NonInvertingOpAmpOutputVoltageLbl>{ outputVoltageValue }</NonInvertingOpAmpOutputVoltageLbl>
        </Container>
      )}
    </Box>
  )
};

export { OpAmpSchematic };