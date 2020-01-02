import { createStackNavigator } from "react-navigation-stack";

import Evaluations from "./screens/Evaluations";
import CreateEvaluation from "./screens/CreateEvaluation";

const EvaluationsStack = createStackNavigator(
    {
        Evaluations: {
            screen: Evaluations
        },
        CreateEvaluation: {
            screen: CreateEvaluation
        }
    },
    {
        headerMode: 'none'
    }
);

export default EvaluationsStack;