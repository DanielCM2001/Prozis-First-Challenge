/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Playground from "../components/Playground.vue";

describe("Playground Page Tests", () => {
  /* Tests if the Page (Background) renders */
  it("should render", () => {
    const wrapper = mount(Playground);
    expect(wrapper.exists()).toBe(true);
  });

  /* Tests if the initial message (Tap to start) is displayed */
  it("displays the initial message", () => {
    const wrapper = mount(Playground);
    const tapToStart = wrapper.get("#initialMessage");
    expect(tapToStart.text()).toBe("TAP TO START");
  });

  /* Tests if the explanation of "How it works" is displayed when clicked */
  it("toggles the explanation when the 'How it works' button is clicked", async () => {
    const wrapper = mount(Playground);
    const button = wrapper.find("#howItWorks_button");

    // Initially, the explanation text should not be visible
    expect(wrapper.find("#explanation_section").exists()).toBe(false);

    // Click the button to show the explanation
    await button.trigger("click");
    expect(wrapper.find("#explanation_section").exists()).toBe(true);

    // Click the button again to hide the explanation
    await button.trigger("click");
    expect(wrapper.find("#explanation_section").exists()).toBe(false);
  });

  it("creates a ball on button click", async () => {
    const wrapper = mount(Playground);

    // Initially, there should be no balls
    expect(wrapper.findAllComponents({ name: "Ball" }).length).toBe(0);

    // Playground div listen for the creation ball event
    const playground_div = wrapper.find("#playground_div");

    // Click the playground div to create a ball
    await playground_div.trigger("click");

    // Await for Vue to update after the click event
    await wrapper.vm.$nextTick();

    // Now there should be one ball
    expect(wrapper.findAllComponents({ name: "Ball" }).length).toBe(1);
  });
});
