import { analyzePath } from "../utils/analyzePath";
import { getAdvancedSummary } from "../utils/getAdvancedSummary";
import AdvancedSummary from "../components/AdvancedSummary";

function ResultPage({ location }) {
  const { answers } = location.state;
  const analysis = analyzePath(answers);
  const summary = getAdvancedSummary(analysis);

  return <AdvancedSummary analysis={summary} />;
}
