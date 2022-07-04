import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import Routes from './src/routes';


Amplify.configure(awsconfig);

// eslint-disable-next-line require-jsdoc
const App = () => {
  return (
    <>
      <Routes />
    </>
  );
};

export default App;
