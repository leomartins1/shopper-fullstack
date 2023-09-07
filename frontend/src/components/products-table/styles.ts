import { styled } from '@stitches/react';
import { Content, Arrow } from '@radix-ui/react-tooltip';

export const Table = styled('table', {
  width: '100%',
  backgroundColor: '#fff',
  marginTop: '20px',
  padding: '20px',
  border: '1px solid #067B4F',
  borderSpacing: '0',
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 10px 18px',
});

export const Th = styled('th', {
  textAlign: 'start',
  padding: '10px 5px 10px 5px',
  borderBottom: '1px solid #067B4F',
});

export const Td = styled('td', {
  textAlign: 'start',
  padding: '10px 5px 10px 5px',
  borderBottom: '1px solid #067B4F',
});

export const TDStatus = styled(Td, {
  img: {
    width: '25px',
  },
});

export const ToolTipContent = styled(Content, {
  backgroundColor: 'white',
  maxWidth: '300px',
  padding: '10px',
  border: '1px solid #067B4F',
  borderRadius: '10px',
});

export const ToolTipArrow = styled(Arrow, {
  color: '#067B4F',
});
