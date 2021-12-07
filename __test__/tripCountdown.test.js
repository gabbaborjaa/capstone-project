import { tripCountdown } from "../src/client/js/tripCountdown.js";

test('passes when value is NaN', () => {
    expect(tripCountdown).toBeNaN();
    expect(1).toBeNaN();
});