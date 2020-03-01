import variable from "../variable";

describe("Variable", () => {
  it("gets an undefined value if variable is not set", () => {
    expect(variable("test")).toBeUndefined();
  });

  it("gets and sets variables", () => {
    expect(variable("test")).toBeUndefined();

    variable("test", "Hello, world!");
    expect(variable("test")).toBe("Hello, world!");
  });
});
