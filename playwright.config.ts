import { defineConfig } from "@playwright/test"

export default defineConfig({
    testDir: "./tests",
    outputDir: "./tests/test-results",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        launchOptions: {
            args: ["--start-maximized"]
        }
    },
    projects: [{
        name: "webkit",
        use: {
            browserName: "webkit",
            viewport: null
        }
    }, {
        name: "gecko",
        use: {
            browserName: "firefox",
            viewport: null
        }
    }, {
        name: "chrome",
        use: {
            browserName: "chromium",
            viewport: null
        }
    }]
})
