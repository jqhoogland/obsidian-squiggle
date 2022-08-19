import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { SquiggleChart } from "@quri/squiggle-components";

export const renderSquiggle = (code: string, element: HTMLElement) => ReactDOM.createRoot(element).render(<SquiggleChart code={code} />)