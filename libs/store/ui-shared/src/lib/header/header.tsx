import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const StyledTypography = styled(Typography)({
  '&': {
    flexGrow: 1,
  },
});

export interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <StyledTypography variant="h6">{title}</StyledTypography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
