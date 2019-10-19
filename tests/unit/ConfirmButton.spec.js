import ConfirmButton from "../../src/components/ConfirmButton";
import { shallowMount } from "@vue/test-utils";

describe("ConfirmButton", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ConfirmButton);
  });

  it("renders without errors", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
