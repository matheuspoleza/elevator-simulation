import { useState } from 'react';
import styled from 'styled-components';

const FLOORS = 5;

const Container = styled.div`
  display: flex;
  padding: 16px;
`;

const Panel = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PanelButton = styled.button<{ isActive: boolean }>`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  margin-right: 4px;
  ${props => props.isActive && `
    background: black;
    color: white;
  `};
`;

const ElevatorContainer = styled.div`
  background-color: black;
  width: 400px;
  height: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ElevatorStrings = styled.div`
  width: 200px;
  height: 800px;
  background-color: grey;
  position: relative;
`;

const Elevator = styled.div<{ currentFloor: number }>`
  height: ${800 / FLOORS}px;
  bottom: ${props => (800 / FLOORS) * props.currentFloor}px;
  width: 100%;
  background-color: red;
  position: absolute;
`;

function App() {
  const [currentFloor, setCurrentFloor] = useState(0);

  const handleChangeFloor = (newFloor: number) => setCurrentFloor(newFloor); 

  return (
    <Container>
      <Panel>
        {Array.from(Array(FLOORS).keys()).map((value) => (
          <PanelButton 
            isActive={value === currentFloor}
            onClick={() => handleChangeFloor(value)}
          >
            {value}
          </PanelButton>
        ))}
      </Panel>

      <ElevatorContainer>
        <ElevatorStrings>
          <Elevator currentFloor={currentFloor} />
        </ElevatorStrings>
      </ElevatorContainer>
    </Container>
  );
}

export default App;
