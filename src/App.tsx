import { Classroom } from "./features/classroom/Classroom";
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const App = () => {
  return (
    <div >
      <ThemeProvider theme={theme}>
        <Classroom />
      </ThemeProvider>

    </div>
  )
}

export default App
