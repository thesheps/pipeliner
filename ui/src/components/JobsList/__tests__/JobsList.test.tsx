import React from "react";
import { render } from "@testing-library/react";

import { JobsList, Job } from "../JobsList";

describe("JobsList", () => {
  it("renders the specified Jobs", () => {
    const jobs: Job[] = [];

    const { container } = render(<JobsList jobs={jobs} />);
    expect(container).toMatchSnapshot();
  });
});
