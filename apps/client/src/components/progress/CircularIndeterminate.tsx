import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type CircularIndeterminateProps = {
  className?: string;
};

const CircularIndeterminate: React.FC<CircularIndeterminateProps> = ({
  className,
}) => {
  return (
    <Box className={className}>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default CircularIndeterminate;
