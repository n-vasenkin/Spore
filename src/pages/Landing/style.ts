import { COLOR } from 'const';
import styled from 'styled-components';
import { Button } from 'ui-kit';

export const Main = styled.div`
  height: 100vh;
  background-color: ${COLOR.BLUE_20};
  background-size: 20px;
  background-position: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainForm = styled.div`
  width: 100%;
  max-width: 430px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 100%;
`;

export const SporeBtn = styled(Button)`
  margin: 25px 0;
`;

export const Tagline = styled.h3`
  font-size: 24px;
  text-align: center;
  margin: 15px 0;
`;
