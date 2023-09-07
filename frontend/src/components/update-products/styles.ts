import { styled } from '@stitches/react';

export const Container = styled('div', {
  display: 'flex',
});

const InputStyles = {
  width: '150px',
  position: 'absolute',
  cursor: 'pointer',
  padding: '20px',
  borderTopLeftRadius: '5px',
  borderBottomLeftRadius: '5px',
};

export const FileContainer = styled('div', {
  position: 'relative',
  width: 'fit-content',
  minWidth: '300px',
  height: '60px',
  border: '2px solid #067B4F',
  borderRadius: '5px',
  overflow: 'hidden',
});

export const FileInput = styled('input', {
  ...InputStyles,
  opacity: '0',
  zIndex: 2,
});

export const FileSpan = styled('span', {
  ...InputStyles,
  backgroundColor: '#54cc9f',
  zIndex: 1,
});

export const FileName = styled('div', {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '200px',
  paddingRight: '20px',
  justifyContent: 'end',
});

export const CustomButton = styled('button', {
  border: '2px solid #067B4F',
  width: 'fit-content',
  cursor: 'pointer',
  padding: '20px',
  borderRadius: '5px',
  fontSize: '16px',
  marginLeft: '20px',
  color: 'white',

  '&:disabled': {
    backgroundColor: '#1B1B38',
    border: '2px solid #1B1B38',
    cursor: 'not-allowed',
  },

  variants: {
    validate: {
      true: {
        backgroundColor: '#35B289',
        '&:hover': {
          opacity: '.7',
        },
      },
    },
    submit: {
      true: {
        backgroundColor: '#10453B',
        '&:hover': {
          opacity: '.7',
        },
      },
    },
  },
});
