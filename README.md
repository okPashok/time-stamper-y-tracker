# Time-stamper-y-tracker

This time automatic time stamper for Yandex Tracker.

## Run

1. Run `npm i`
2. Run `npx playwright install chromium`
3. Fill in the `.env file`
4. Run `npm run track-time`

## About .env file

- `BOARD_URL` Path to your board in Yandex Tracker (replace <number>). The base URL "https://tracker.yandex.ru/" is specified in the config.
- `FEDERATION_ID` Your organization’s federation ID.
- `EMAIL/PASSWORD` Credentials for Yandex Tracker authentication.
- `STATUSES` Task statuses to track (comma-separated, no spaces). The status must be taken directly from the task itself. If the variable is not defined, then all your tasks are taken.
- `HOURS` Daily working hours (e.g., standard 8).
