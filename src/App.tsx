import { useState } from 'react';
import styled from 'styled-components';

const FLOORS = 8;

const Container = styled.div`
  display: flex;
  padding: 16px;
`;

const Panel = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(22px, 1fr));
`;

const PanelButton = styled.button<{ isActive: boolean }>`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  margin-right: 4px;
  outline: none;
  border: none;
  ${props => props.isActive && `
    background: black;
    color: white;
  `};

  &:hover {
    background-color: grey;
    color: white;
  }
`;

const ElevatorContainer = styled.div`
  background-color: black;
  width: 400px;
  height: 800px;
  position: relative;
`;

const Elevator = styled.div<{ currentFloor: number }>`
  height: ${800 / FLOORS}px;
  bottom: ${props => (800 / FLOORS) * props.currentFloor}px;
  width: 200px;
  background-color: red;
  position: absolute;
`;

const Floor = styled.div<{ value: number }>`
  width: 100%;
  height: ${(800 / FLOORS)}px;
  border-bottom: 1px solid white;
  position: absolute;
  bottom: ${props => (800 / FLOORS) * props.value}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
`;

const FloorPanel = styled.div``;

const ButtonUp = styled.button`
  cursor: pointer;
  transform: rotate(-90deg);
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const ButtonDown = styled.button`
  cursor: pointer;
  transform: rotate(90deg);
  &:hover {
    background-color: grey;
    color: white;
  }
`;

enum ElevatorStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  IDLE = 'IDLE'
}

function App() {
  const [elevatorStatus, setElevatorStatus] = useState<ElevatorStatus>(ElevatorStatus.IDLE);
  const [destinationFloor, setDestinationFloor] = useState<number>();
  const [currentFloor, setCurrentFloor] = useState(0);

  const goToDestination = (current: number, destination: number, status: ElevatorStatus) => {
    if (current === destination) return setDestinationFloor(undefined);
    const nextFloor = status === ElevatorStatus.UP ? current + 1 : current - 1;
    setCurrentFloor(nextFloor);
    setTimeout(() => goToDestination(nextFloor, destination, status), 1000);
  };

  const handleChangeFloor = (current: number, destination: number) => {
    const status = current < destination ? ElevatorStatus.UP : ElevatorStatus.DOWN;
    setDestinationFloor(destination);
    setElevatorStatus(status);
    goToDestination(current, destination, status);
    setElevatorStatus(ElevatorStatus.IDLE);
  }; 

  return (
    <Container>
      <ElevatorContainer>
        {elevatorStatus === ElevatorStatus.UP ? 'Subindo' : 'Descendo'}
        {Array.from(Array(FLOORS).keys()).map((value) => (
            <Floor value={value}>
              <FloorPanel>
                <ButtonUp onClick={() => handleChangeFloor(currentFloor, value)}>{'>'}</ButtonUp>
                <ButtonDown onClick={() => handleChangeFloor(currentFloor, value)}>{'>'}</ButtonDown>
              </FloorPanel>
            </Floor>
          ))}
          <Elevator currentFloor={currentFloor}>
            <Panel>
              {Array.from(Array(FLOORS).keys()).map((value) => (
                <PanelButton 
                  isActive={value === destinationFloor}
                  onClick={() => handleChangeFloor(currentFloor, value)}
                >
                  {value === 0 ? 'T' : value}
                </PanelButton>
              ))}
            </Panel>
          </Elevator>
      </ElevatorContainer>
    </Container>
  );
}

export default App;
