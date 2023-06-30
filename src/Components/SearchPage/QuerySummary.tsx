import {FunctionComponent, useEffect, useState, useContext} from 'react';
import {
  buildQuerySummary,
  QuerySummary as HeadlessQuerySummary,
} from '@coveo/headless';
import {Box, Divider} from '@mui/material';
import EngineContext from '../../common/engineContext';

interface QuerySummaryProps {
  controller: HeadlessQuerySummary;
}

const QuerySummaryRenderer: FunctionComponent<QuerySummaryProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const renderNoResults = () => {
    return <Box mt={5}>brak wynikóws</Box>;
  };

  const renderBold = (input: string) => {
    return (
      <Box component="span">
        <strong>{input}</strong>
      </Box>
    );
  };

  const renderRange = () => {
    return renderBold(` ${state.firstResult}-${state.lastResult}`);
  };

  const renderTotal = () => {
    return <Box component="span"> z {renderBold(state.total.toString())}</Box>;
  };

  const renderQuery = () => {
    if (state.hasQuery) {
      return <Box component="span"> dla {renderBold(state.query)}</Box>;
    }
  };

  const renderDuration = () => {
    return ` w ${state.durationInSeconds} sekundy`;
  };

  const renderHasResults = () => {
    return (
      <Box>
        <Box fontWeight="fontWeightBold">
          wyniki{renderRange()}
          {renderTotal()}
          {renderQuery()}
          {renderDuration()}
        </Box>
        <Divider />
      </Box>
    );
  };

  return !state.hasResults && state.firstSearchExecuted ? renderNoResults() : renderHasResults();
};

const QuerySummary = () => {
  const engine = useContext(EngineContext)!;
  const controller = buildQuerySummary(engine);
  return <QuerySummaryRenderer controller={controller} />;
};

export default QuerySummary;
