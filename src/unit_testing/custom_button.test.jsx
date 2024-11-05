import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomButton from '../elements_components/custom_button';
import AddIcon from '@mui/icons-material/Add';

describe('CustomButton Component', () => {
  
  test('renders with provided text', () => {
    render(<CustomButton>Click Me</CustomButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
  
  test('calls onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies the correct variant and color', () => {
    render(<CustomButton variant="contained" color="secondary">Styled Button</CustomButton>);
    const button = screen.getByText('Styled Button');
    expect(button).toHaveClass('MuiButton-contained'); // Checks for the `contained` variant
  });

  test('renders startIcon correctly', () => {
    render(<CustomButton startIcon={<AddIcon />}>Add Item</CustomButton>);
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument(); // Verifys if the icon is rendered
  });

});
