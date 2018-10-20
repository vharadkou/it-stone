import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {
    start(
        onInterval,
        onComplete,
        ms,
        interval = 1000
    ) {
        const countDownDate = new Date((new Date()).getTime() + ms).getTime();

        onInterval(ms);

        const newInterval = setInterval(() => {
            const now = new Date().getTime();

            const distance = countDownDate - now;

            onInterval(distance);

            if (distance < 0) {
                onComplete();
                clearInterval(newInterval);
            }
        }, interval);

        return newInterval;
    }

    end(timer) {
        clearInterval(timer);
    }
}
