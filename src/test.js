const { main } = require(".");

async function testbed() {
    console.log(`Starting testbed.`);

    let registeredJobDetails;
    let eventHandlers = {};

    const mockService = {
        registerAssetJob: async (jobDetails) => {
            console.log(`A job has been registered.`);
            console.log(jobDetails);

            registeredJobDetails = jobDetails;
        },

        on: async (eventName, eventHandler) => {
            eventHandlers[eventName] = eventHandler;
        },

        start: async () => {
            console.log("Service has started.");
        },

        emit: async (eventName, eventPayload) => {
            console.log(`Emitted event: ${eventName}, with payload:`);
            console.log(eventPayload);
        },
    };

    // Start the microservice.
    await main(mockService);

    // Create a test job.
    const assetJob = {
        assetId: "asset-id",
        accountId: "account-id",
        jobId: "job-id",
        mimeType: "image/jpg",
        userId: "user-id",
        encoding: "not-important"
    };
    
    // Invoke your job handler.
    await registeredJobDetails.jobFn(mockService, assetJob);
}

testbed()
    .then(() => console.log("Done"))
    .catch(err => {
        console.error("Testbed failed:");
        console.error(err && err.stack || err);
    });