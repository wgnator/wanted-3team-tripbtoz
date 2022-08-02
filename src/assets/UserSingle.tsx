import styled from 'styled-components';

export interface SvgProps {
  height?: string;
  width?: string;
  hidden?: boolean;
}
export default function UserSingle({ height = '1rem', width = '1rem' }: SvgProps) {
  return (
    <SVG styledHeight={height} styledWidth={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
      <g>
        <circle
          cx="7"
          cy="3.75"
          r="3.25"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></circle>
        <path
          d="M13.18,13.5a6.49,6.49,0,0,0-12.36,0Z"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </SVG>
  );
}

export const SVG = styled.svg<{ hidden?: boolean; styledWidth?: string; styledHeight?: string }>`
  height: ${(props) => props.styledHeight};
  width: ${(props) => props.styledWidth};
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
`;
