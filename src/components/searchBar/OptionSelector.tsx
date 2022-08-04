import { useReducer, useState } from 'react';
import styled from 'styled-components';
import UserSingle from '../../assets/UserSingle';
import { MOBILE_BREAKPOINT } from '../../constants/constants';
import { theme } from '../../styles/theme';

interface OptionSelectorProps {}

export default function OptionSelector({}: OptionSelectorProps) {
  const [numberOfPeople, setNumberOfPeople] = useState({ adult: 2, children: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const isLessThen = (number: number, lessThen: number) => number < lessThen;
  const isMoreThen = (number: number, moreThen: number) => number > moreThen;

  const MAXIMUM = {
    adult: 8,
    children: 8,
  };
  const MINIMUM = {
    adult: 1,
    children: 0,
  };

  const adultIncrease = () => {
    if (isMoreThen(numberOfPeople.adult + 1, MAXIMUM.adult)) return;
    setNumberOfPeople((prevState) => ({ ...prevState, adult: prevState.adult + 1 }));
  };
  const childrenIncrease = () => {
    if (isMoreThen(numberOfPeople.children + 1, MAXIMUM.children)) return;
    setNumberOfPeople((prevState) => ({ ...prevState, children: prevState.children + 1 }));
  };
  const adultDecrease = () => {
    if (isLessThen(numberOfPeople.adult - 1, MINIMUM.adult)) return;
    setNumberOfPeople((prevState) => ({ ...prevState, adult: prevState.adult - 1 }));
  };
  const childrenDecrease = () => {
    if (isLessThen(numberOfPeople.children - 1, MINIMUM.children)) return;
    setNumberOfPeople((prevState) => ({ ...prevState, children: prevState.children - 1 }));
  };

  const openSelecter = () => setIsOpen((openState) => !openState);
  const closeSelector = () => setIsOpen(false);

  // 할일: numberOfPeople을 리덕스에 저장

  return (
    <Container>
      <Printer onClick={openSelecter}>
        <Column>
          <UserSingle width="1.5rem" height="1.5rem" />
        </Column>
        <Column>
          <Span styledColor={theme.fontLightColor} thin={true} smallFont={true}>
            인원
          </Span>
          <Span>{numberOfPeople.adult + numberOfPeople.children} 명</Span>
        </Column>
      </Printer>
      {isOpen && (
        <>
          <Selecter>
            <Row>
              <Label>성인</Label>
              <CountWrapper>
                <MinusButton disabled={numberOfPeople.adult === MINIMUM.adult} onClick={adultDecrease} />
                <Count>{numberOfPeople.adult}</Count>
                <PlusButton disabled={numberOfPeople.adult === MAXIMUM.adult} onClick={adultIncrease} />
              </CountWrapper>
            </Row>
            <Row>
              <Label>아이</Label>
              <CountWrapper>
                <MinusButton disabled={numberOfPeople.children === MINIMUM.children} onClick={childrenDecrease} />
                <Count>{numberOfPeople.children}</Count>
                <PlusButton disabled={numberOfPeople.children === MAXIMUM.children} onClick={childrenIncrease} />
              </CountWrapper>
            </Row>
          </Selecter>
          <ModalBackground onClick={closeSelector} />
        </>
      )}
    </Container>
  );
}

export const Container = styled.div`
  position: relative;
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  :hover {
    background-color: ${theme.onHoverBackgroundColor};
  }
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    height: 100%;
    width: fit-content;
    border-right: 1px solid ${theme.borderColor};
  }
`;
export const Printer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: 100%;
  padding: 0 1rem;
  gap: 1rem;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: center;
`;
const Span = styled.span<{ styledColor?: string; thin?: boolean; smallFont?: boolean }>`
  pointer-events: none;
  ${(props) => props.styledColor && `color:${props.styledColor}`};
  ${(props) => props.thin && `font-weight:300`};
  ${(props) => props.smallFont && `font-size: 0.7rem`};
`;

export const ModalBackground = styled.div`
  opacity: 0.2;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  cursor: default;
`;
export const Selecter = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 1rem;
  gap: 1.5rem;
  z-index: 100;
  top: 2.7rem;
  width: 100vw;
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    border-radius: 4px;
    min-width: 360px;
    max-width: 480px;
    top: 66px;
    right: 0;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.span`
  font-size: 0.9rem;
  color: ${theme.fontMediumColor};
  font-weight: 200;
`;
const Count = styled.span`
  font-size: 1.2rem;
  padding: 0 1rem;
`;

const Button = styled.button`
  cursor: pointer;
  border: 1px solid rgb(104, 104, 136);
  border-radius: 4px;
  width: 1.375rem;
  height: 1.375rem;
  :disabled {
    border: 1px solid ${theme.borderColor};
    pointer-events: none;
  }
`;
const MinusButton = styled(Button)`
  background: rgba(0, 0, 0, 0)
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjEiIHZpZXdCb3g9IjAgMCA4IDEiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjEiIGZpbGw9IiM2ODY4ODgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgcng9Ii41Ii8+PC9zdmc+')
    no-repeat scroll center center / 8px;
  :disabled {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjEiIHZpZXdCb3g9IjAgMCA4IDEiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjEiIGZpbGw9IiNDRENEQ0QiIGZpbGwtcnVsZT0iZXZlbm9kZCIgcng9Ii41Ii8+PC9zdmc+');
  }
`;

const PlusButton = styled(Button)`
  background: rgba(0, 0, 0, 0)
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHZpZXdCb3g9IjAgMCA4IDgiPjxwYXRoIGZpbGw9IiM2ODY4ODgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQgMGEuNS41IDAgMDEuNS41djNoM2EuNS41IDAgMDEwIDFINC40OTlsLjAwMSAzYS41LjUgMCAwMS0xIDBsLS4wMDEtM0guNWEuNS41IDAgMDEwLTFoM3YtM0EuNS41IDAgMDE0IDB6Ii8+PC9zdmc+')
    no-repeat scroll center center / 8px;
  :disabled {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHZpZXdCb3g9IjAgMCA4IDgiPjxnIGZpbGw9IiNDRENEQ0QiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iMSIgeT0iMy41IiByeD0iLjUiLz48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIxIiB5PSIzLjUiIHJ4PSIuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNCA0KSIvPjwvZz48L3N2Zz4=');
  }
`;
