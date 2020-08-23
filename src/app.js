
import { h, Fragment } from "preact";
import { Suspense, lazy } from "preact/compat";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(t => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    minHeight: '100vh',
    flexDirection: 'column',

  },
  container: {
    flex: 1
  }

}));

const UIComponent = [{
  name: '',
  component: lazy(() => import('./component/Header'))
},{
  name: 'container',
  component: lazy(() => import('./component/MainContainer')), 
},{
  name: '',
  component: lazy(() => import('./component/Footer'))
}];

const UIWrapper = (props, classes) => ui => (
  <Grid item xs={12} className={classes[ui.name]}>
    <Suspense fallback={() => <div>...</div>}>
      {h(ui.component, props)}
    </Suspense>
  </Grid>
)

const App = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <Grid className={classes.root} container spacing={0.2}>
        {UIComponent.map(UIWrapper({name: "razif-apps" }, classes))}
      </Grid>
    </Fragment>
  );
};

export default App;