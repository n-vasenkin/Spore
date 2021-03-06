import { COLOR, hexToRgba } from 'const';
import styled, { css } from 'styled-components';
import { RawSvg, Textarea as _Textarea } from 'ui-kit';
import { MessageType } from './types';

export const Column = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  overflow: auto;
`;

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 250px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  min-height: 55px;
  border: 1px solid ${COLOR.WHITE};
`;

export const TextareaBox = styled.div`
  padding: 5px;
  width: 100%;
  border: 1px solid ${COLOR.WHITE};
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Textarea = styled(_Textarea)`
  textarea {
    max-height: 160px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  border: 1px solid ${COLOR.WHITE};
`;

export const MessageList = styled(List)`
  padding: 15px;
`;

const MessageBefore = css`
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    display: block;
    border: solid;
    border-color: transparent;
  }
`;

export const Message = styled.li`
  position: relative;
  width: fit-content;
  max-width: 500px;
  padding: 8px 10px;
  box-shadow: 0 1px 0.5px ${hexToRgba(COLOR.BLACK, 0.13)};
  margin-bottom: 10px;
  border-radius: 8px;
  ${({ type }: { type?: MessageType }) => {
    switch (type) {
      case MessageType.MY:
        return css`
          align-self: flex-end;
          background: ${COLOR.BLUE_30};
          ${MessageBefore};
          &:before {
            right: -9px;
            border-width: 10px 0px 0px 15px;
            border-left-color: ${COLOR.BLUE_30};
          }
        `;
      case MessageType.CONTACT:
        return css`
          align-self: flex-start;
          background: ${COLOR.GRAY_50};
          ${MessageBefore};
          &:before {
            left: -9px;
            border-width: 10px 15px 0px 0px;
            border-right-color: ${COLOR.GRAY_50};
          }
        `;
      case MessageType.INFO:
        return css`
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 15px;
          align-self: center;
          background: ${COLOR.GRAY_50};
        `;
      default:
        break;
    }
  }};
`;

export const Test = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
`;

export const SendButton = styled(RawSvg)`
  color: ${({ hasMessage }: { hasMessage?: boolean }) => (hasMessage ? COLOR.BLUE_30 : '#617b95')};
`;
