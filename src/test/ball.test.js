/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Ball from "../components/Ball.vue";

describe("Ball Component Tests", () => {
  /* Tests if the ball will render with the correct initial style */
  it("renders with correct initial style", () => {
    const wrapper = mount(Ball, {
      props: {
        id: 1,
        size: 60,
        color: "#FF0000",
        startX: 100,
        startY: 100,
        velocityX: 200,
        velocityY: 200,
      },
    });

    // Find the rendered ball after being created
    const ball = wrapper.find(".ball");

    // Check if the initial values are correct
    expect(ball.attributes().style).toContain("width: 60px;");
    expect(ball.attributes().style).toContain("height: 60px;");
    expect(ball.attributes().style).toContain("background-color: #FF0000;");
    expect(ball.attributes().style).toContain("left: 100px;");
    expect(ball.attributes().style).toContain("top: 100px;");
  });

  /* Check if the Ball is moving correctly */
  it("moves correctly", async () => {
    vi.useFakeTimers();
    const wrapper = mount(Ball, {
      props: {
        id: 1,
        size: 60,
        color: "#FF0000",
        startX: 100,
        startY: 100,
        velocityX: 200,
        velocityY: 200,
      },
    });

    // Capture the initial positions of the ball
    const initialX = wrapper.vm.x;
    const initialY = wrapper.vm.y;

    // Advance the fake timers by 100 milliseconds
    vi.advanceTimersByTime(100);

    // Check if the ball position has changed (ball moved)
    expect(wrapper.vm.x).toBeGreaterThan(initialX);
    expect(wrapper.vm.y).toBeGreaterThan(initialY);

    vi.useRealTimers();
  });
});
